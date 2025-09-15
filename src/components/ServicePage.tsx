'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ServiceProviderCard } from './ServiceProviderCard';

interface ServiceProviderType {
  id: string;
  name: string;
  experience: number;
  rating: number | null;
  location: string;
  city: string;
  phone?: string;
  bio?: string;
  isVerified?: boolean;
}

interface ServicePageProps {
  serviceType: 'plumber' | 'electrician' | 'carpenter';
  title: string;
  description: string;
}

export function ServicePage({ serviceType, title, description }: ServicePageProps) {
  const { data: session } = useSession();
  const [city, setCity] = useState('');
  const [providers, setProviders] = useState<ServiceProviderType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/providers/search?type=${serviceType}&city=${encodeURIComponent(city)}`);
      if (response.ok) {
        const data = await response.json();
        setProviders(data);
      }
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8">Please sign in to find and connect with {serviceType}s in your area.</p>
        <Link 
          href={`/auth?callbackUrl=${encodeURIComponent(`/${serviceType}`)}`}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all"
        >
          Sign In to Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8">{description}</p>
        
        <div className="form-control w-full max-w-md mx-auto mb-8">
          <label className="label">
            <span className="label-text">Enter your city</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter city name"
              className="input input-bordered flex-1"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button 
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading || !city}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <ServiceProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            {city && !loading ? (
              <p>No {serviceType}s found in {city}. Try another city or check back later.</p>
            ) : (
              <p>Enter your city to find {serviceType}s in your area.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}