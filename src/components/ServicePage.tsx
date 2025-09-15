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
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-base sm:text-lg opacity-80 max-w-2xl">Please sign in to find and connect with {serviceType}s in your area.</p>
        <Link 
          href={`/auth?callbackUrl=${encodeURIComponent(`/${serviceType}`)}`}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black hover:opacity-90 transition"
        >
          Sign In to Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] py-8 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-base sm:text-lg opacity-80 max-w-3xl">{description}</p>
        </div>

        <div className="w-full max-w-2xl mx-auto mb-8">
          <label className="block mb-2 text-sm font-medium opacity-80">Enter your city</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter city name"
              className="input input-bordered flex-1"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button 
              className="btn btn-primary w-full sm:w-auto"
              onClick={handleSearch}
              disabled={loading || !city}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          <p className="mt-2 text-xs opacity-70">Tip: Try your nearest major city for more results.</p>
        </div>

        {providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <ServiceProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center opacity-90">
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