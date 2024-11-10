'use client';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import { Loader } from 'lucide-react';

const EmailLayout = ({ children }: { children: ReactNode }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <Loader className="w-8 h-8 text-black animate-spin" />
        </div>
      )}

      <div className="absolute inset-0">
        <Image
          src="/windowsWallpaper.webp"
          alt="Background"
          layout="fill"
          className={`transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'} object-cover object-center`}
          onLoadingComplete={() => setIsImageLoaded(true)}
        />
      </div>
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-700 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}></div>
      <div
        className={`relative z-10 flex h-full w-full items-center justify-center transition-opacity duration-700 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
        {children}
      </div>
    </div>
  );
};

export default EmailLayout;
