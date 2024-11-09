'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin-ext'] });

const TeamSection = () => {
  const data = [
    {
      name_surname: 'Mihails Daņilovs',
      image: {
        width: 320,
        height: 320,
        url: '/mihails.webp',
        alt: 'Mihails',
      },
    },
    {
      name_surname: 'Ernests Gustavs Dane',
      image: {
        width: 320,
        height: 320,
        url: '/ernests.jpeg',
        alt: 'Ernests',
      },
    },
    {
      name_surname: 'Mārtiņš Prokuratovs',
      image: {
        width: 320,
        height: 320,
        url: '/martins.jpeg',
        alt: 'Mārtiņš',
      },
    },
    {
      name_surname: 'Renārs Laicāns',
      image: {
        width: 320,
        height: 320,
        url: '/renars.jpeg',
        alt: 'Renārs',
      },
    },
    {
      name_surname: 'Ričards Liškovskis',
      image: {
        width: 320,
        height: 320,
        url: '/ricards.jpg',
        alt: 'Ričards',
      },
    },
  ];

  // Initialize loading state for each image in an array
  const [loadingStates, setLoadingStates] = useState(new Array(data.length).fill(true));

  const handleImageLoad = (index: number) => {
    setLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <section id="team-section" className="px-5 pt-20">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center lg:text-7xl pb-20">Team</h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-10 max-w-6xl w-full">
          {data.map((item, index) => (
            <div
              key={item.name_surname}
              className="flex flex-col items-center max-w-xs flex-grow"
              style={{ flexBasis: 'calc(33.333% - 1rem)' }} // Custom basis for 3 columns
            >
              <div className="relative h-80 w-80">
                {loadingStates[index] && (
                  <div className="absolute inset-0 animate-pulse bg-gray-300" />
                )}
                <Image
                  width={320}
                  height={320}
                  src={item.image.url || ''}
                  alt={item.image.alt || ''}
                  className={`h-full w-full object-cover transition-opacity duration-300 ${
                    loadingStates[index] ? 'opacity-0' : 'opacity-100'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
              <h3 className={`text-dark-blue py-2 text-xl font-semibold ${inter.className}`}>
                {item.name_surname}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
