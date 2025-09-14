'use client';

interface ServiceProviderType {
  id: string;
  name: string;
  experience: number;
  rating: number | null;
  location: string;
  city: string;
}

interface ServiceProviderCardProps {
  provider: ServiceProviderType;
}

export function ServiceProviderCard({ provider }: ServiceProviderCardProps) {
  const { name, experience, rating, location, city } = provider;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
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
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">View Profile</button>
          <button className="btn btn-outline btn-sm">Book Service</button>
        </div>
      </div>
    </div>
  );
}