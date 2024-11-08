import React from 'react';
import Navigation from './_components/Navigation';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <Navigation />
      <div>{children}</div>
    </main>
  );
};

export default LandingLayout;
