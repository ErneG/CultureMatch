'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job } from '@/types/job';

interface AcceptedJobsContextType {
  acceptedJobs: Job[];
  setAcceptedJobs: (jobs: Job[]) => void;
  clearAcceptedJobs: () => void;
  removeAcceptedJob: (jobId: number) => void;
  addAcceptedJob: (job: Job) => void;
}

const AcceptedJobsContext = createContext<AcceptedJobsContextType | undefined>(undefined);

export const AcceptedJobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [acceptedJobs, setAcceptedJobsState] = useState<Job[]>([]);

  // Initialize state from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedJobs = localStorage.getItem('acceptedJobs');
      if (storedJobs) {
        setAcceptedJobsState(JSON.parse(storedJobs));
      }
    }
  }, []);

  // Function to update both state and localStorage
  const updateLocalStorage = (jobs: Job[]) => {
    setAcceptedJobsState(jobs);
    localStorage.setItem('acceptedJobs', JSON.stringify(jobs));
  };

  const setAcceptedJobs = (jobs: Job[]) => {
    updateLocalStorage(jobs);
  };

  const clearAcceptedJobs = () => {
    updateLocalStorage([]);
  };

  const removeAcceptedJob = (jobId: number) => {
    const updatedJobs = acceptedJobs.filter((job) => job.id !== jobId);
    updateLocalStorage(updatedJobs);
  };

  const addAcceptedJob = (job: Job) => {
    const updatedJobs = [...acceptedJobs, job];
    updateLocalStorage(updatedJobs);
  };

  return (
    <AcceptedJobsContext.Provider
      value={{
        acceptedJobs,
        setAcceptedJobs,
        clearAcceptedJobs,
        removeAcceptedJob,
        addAcceptedJob,
      }}>
      {children}
    </AcceptedJobsContext.Provider>
  );
};

export const useAcceptedJobs = () => {
  const context = useContext(AcceptedJobsContext);
  if (!context) {
    throw new Error('useAcceptedJobs must be used within an AcceptedJobsProvider');
  }
  return context;
};
