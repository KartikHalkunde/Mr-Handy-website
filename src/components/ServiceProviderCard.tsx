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
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm opacity-80 mt-0.5">{location}, {city}</p>
        </div>
        {isVerified && (
          <span className="inline-flex items-center rounded-md bg-green-600/20 text-green-300 px-2 py-1 text-xs">Verified</span>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="opacity-70">Experience</span>
          <div className="font-medium">{experience} yrs</div>
        </div>
        {typeof rating === 'number' && (
          <div>
            <span className="opacity-70">Rating</span>
            <div className="font-medium">{rating.toFixed(1)} / 5.0</div>
          </div>
        )}
      </div>

      {bio && (
        <p className="mt-3 text-sm opacity-80">{bio}</p>
      )}

      <div className="mt-5 flex items-center justify-end gap-2">
        {phone && (
          <a href={`tel:${phone}`} className="inline-flex items-center px-3 py-2 rounded-lg bg-white text-black text-sm hover:opacity-90">Call</a>
        )}
        <button className="inline-flex items-center px-3 py-2 rounded-lg border border-white/15 text-sm hover:bg-white/5">Book Service</button>
      </div>
    </div>
  );
}