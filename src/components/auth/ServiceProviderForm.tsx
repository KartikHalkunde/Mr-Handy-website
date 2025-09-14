'use client';

import { useState } from 'react';
import { FormInput } from './FormInput';
import { PasswordInput } from './PasswordInput';

type ServiceType = 'plumber' | 'electrician' | 'carpenter';

export const ServiceProviderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    experience: '',
    serviceType: 'plumber' as ServiceType,
    location: '',
    city: '',
    address: '',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/provider-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful registration
        window.location.href = '/dashboard';
      } else {
        // Handle errors
        const data = await response.json();
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <FormInput
        label="Full Name"
        name="name"
        type="text"
        required
        value={formData.name}
        onChange={handleChange}
        className="bg-gray-800 text-white"
      />
      
      <FormInput
        label="Email"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      
      <PasswordInput
        label="Password"
        name="password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      
      <FormInput
        label="Phone Number"
        name="phone"
        type="tel"
        required
        value={formData.phone}
        onChange={handleChange}
      />
      
      <FormInput
        label="Age"
        name="age"
        type="number"
        required
        min="18"
        value={formData.age}
        onChange={handleChange}
      />
      
      <FormInput
        label="Years of Experience"
        name="experience"
        type="number"
        required
        min="0"
        value={formData.experience}
        onChange={handleChange}
      />
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">Service Type</span>
        </label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="plumber">Plumber</option>
          <option value="electrician">Electrician</option>
          <option value="carpenter">Carpenter</option>
        </select>
      </div>
      
      <FormInput
        label="City"
        name="city"
        type="text"
        required
        value={formData.city}
        onChange={handleChange}
      />
      
      <FormInput
        label="Location"
        name="location"
        type="text"
        required
        value={formData.location}
        onChange={handleChange}
        placeholder="Area/Neighborhood"
      />
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">Full Address</span>
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="textarea textarea-bordered h-24"
          required
          placeholder="Enter your complete address"
        />
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">Bio</span>
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="textarea textarea-bordered h-24"
          placeholder="Tell us about your work experience and expertise"
        />
      </div>
      
      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        Register as Service Provider
      </button>
    </form>
  );
};