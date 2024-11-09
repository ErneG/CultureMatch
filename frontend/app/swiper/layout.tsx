import { AcceptedJobsProvider } from '@/components/providers/AcceptedJobsContext';
import React, { ReactNode } from 'react';

const SwiperLayout = ({ children }: { children: ReactNode }) => {
  return <AcceptedJobsProvider>{children}</AcceptedJobsProvider>;
};

export default SwiperLayout;
