'use client';

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

interface ServiceProviderCardProps {
  provider: ServiceProviderType;
}

export function ServiceProviderCard({ provider }: ServiceProviderCardProps) {
  const { name, experience, rating, location, city, phone, bio, isVerified } = provider;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{name}</h2>
          {isVerified && (
            <div className="badge badge-success">Verified</div>
          )}
        </div>
        
        <p className="text-sm">
          <span className="font-semibold">Experience:</span> {experience} years
        </p>
        
        {rating && (
          <p className="text-sm">
            <span className="font-semibold">Rating:</span> {rating.toFixed(1)} / 5.0
          </p>
        )}
        
        <p className="text-sm">
          <span className="font-semibold">Location:</span> {location}, {city}
        </p>
        
        {phone && (
          <p className="text-sm">
            <span className="font-semibold">Phone:</span> 
            <a href={`tel:${phone}`} className="text-blue-600 hover:text-blue-800 ml-1">
              {phone}
            </a>
          </p>
        )}
        
        {bio && (
          <p className="text-sm text-gray-600 mt-2">
            {bio}
          </p>
        )}
        
        <div className="card-actions justify-end mt-4">
          {phone && (
            <a 
              href={`tel:${phone}`}
              className="btn btn-primary btn-sm"
            >
              Call Now
            </a>
          )}
          <button className="btn btn-outline btn-sm">Book Service</button>
        </div>
      </div>
    </div>
  );
}