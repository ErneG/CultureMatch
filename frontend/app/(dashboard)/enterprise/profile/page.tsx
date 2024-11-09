'use client';
import React from 'react';
import { Entity } from '@/types/entities';
import { Button } from '@/components/ui/button';

const entity: Entity = {
  id: 1,
  name: "Entity Name",
  type: 0,
  email: "mycompany@domain.com",
  phone: "+11234567890",
  country: "USA",
  registrationNumber: "RN123456",
  isActive: true,
}

// TODO: transfer to entities
interface EntityProfile {
  entityId: number;
  tagline: string;
  description: string;
  website: string;
  size: string;
  foundingDate: Date;
  location: string;
  industry: number;
  specialties: string;
  logoUrl: string;
  // socialMediaLinks: string;
}

const entityProfile: EntityProfile = {
  entityId: entity.id,
  tagline: "We are the best in the business.",
  description: "A description of the entity.",
  website: "https://www.example.com",
  size: "50-500 employees",
  foundingDate: new Date('2010-01-01'),
  location: "New York, USA",
  industry: 1,
  specialties: "Specialties of the entity",
  logoUrl: "https://picsum.photos/200/300",
  // socialMediaLinks: JSON.stringify({ twitter: "https://twitter.com/entity", facebook: "https://facebook.com/entity" }),
}


const EnterpriseProfilePage = () => {
  return (
    <div className="grid grid-cols-12 bg-white shadow-md rounded-lg m-4 mt-5 pb-10 space-y-4 space-x-5">
      <div className="col-span-12 md:col-span-2 flex place-content-center shrink-0">
        <img
          className="w-40 h-40 rounded-full object-cover mt-6"
          alt="company logo"
          src={entityProfile.logoUrl}
        />
      </div>
      <div className='col-span-12 md:col-span-5 flex flex-col justify-end'>
        <div className='mt-auto pr-20'>
          <h2 className="text-3xl font-semibold mb-2">{entity.name}</h2>
          <p>{entityProfile.tagline}</p>
        </div>
      </div>
      <div className="flex flex-col justify-end break-all col-span-12 sm:col-span-6 md:col-span-4">
        <div className="flex flex-wrap justify-between">
          <div className="mr-5 mt-3">
            <p className="text-primary font-bold">Email:</p>
            <p>{entity.email}</p>
          </div>
          <div className="mr-5 mt-3">
            <p className="text-primary font-bold">Phone:</p>
            <p>{entity.phone}</p>
          </div>

        </div>
      </div>

      <div className="hidden md:block">
        <Button
          variant="outline"
          className="text-left flex flex-col items-start justify-between"
          onClick={() => alert('Log out!')}>
          <div className='w-full'>
            Logout
          </div>
        </Button>
      </div>

      <h3 className="text-2xl font-semibold col-span-12 pt-2">Company Details</h3>

      <div className="col-span-12 grid grid-cols-6 space-y-2 gap-x-3 gap-y-2">
        <div className='col-span-6 sm:col-span-3 md:col-span-2'>
          <p className="text-primary font-bold">Location:</p>
          {entityProfile.location}
        </div>
        <div className='col-span-6 sm:col-span-3 md:col-span-2'>
          <p className="text-primary font-bold">Size:</p>
          {entityProfile.size}
        </div>
        <div className='col-span-6 sm:col-span-3 md:col-span-2'>
          <p className="text-primary font-bold">Founding Date:</p>
          {entityProfile.foundingDate.getFullYear()}
        </div>
        <div className='col-span-6 sm:col-span-3 md:col-span-2'>
          <p className="text-primary font-bold">Industry:</p>
          {entityProfile.industry}
        </div>
        <div className='col-span-6 sm:col-span-3 md:col-span-2'>
          <p className="text-primary font-bold">Specialties:</p>
          {entityProfile.specialties}
        </div>
        <div className='col-span-6 sm:col-span-3 md:col-span-2'>
          <p className="text-primary font-bold">Website:</p>
          <a className="text-blue-500" href={entityProfile.website} target="_blank">{entityProfile.website}</a>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseProfilePage;
