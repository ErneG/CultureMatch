'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Job } from '@/types/job';

const AcceptedJobsPage: React.FC = () => {
  const router = useRouter();
  const [acceptedJobs, setAcceptedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem('acceptedJobs');

    if (storedJobs) {
      const parsedJobs = JSON.parse(storedJobs);
      if (parsedJobs.length > 0) {
        setAcceptedJobs(parsedJobs);
      } else {
        router.push('/swiper');
      }
    } else {
      router.push('/swiper');
    }
  }, [router]);

  const jobsWithMatchStatus = useMemo(
    () =>
      acceptedJobs.map((job) => ({
        ...job,
        isMatch: Math.random() >= 0.5,
      })),
    [acceptedJobs],
  );

  const handleRemoveJob = (jobId: string) => {
    const updatedJobs = acceptedJobs.filter((job) => job.id.toString() !== jobId);
    setAcceptedJobs(updatedJobs);
    localStorage.setItem('acceptedJobs', JSON.stringify(updatedJobs));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-center">Your Accepted Jobs</h1>
      {jobsWithMatchStatus.length === 0 ? (
        <p className="text-center text-muted-foreground">You have no accepted jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {jobsWithMatchStatus.map((job) => (
            <Card key={job.id} className="p-6 flex items-center">
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{job.position}</h2>
                <p className="text-muted-foreground mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary">{job.location}</Badge>
                  <Badge variant="secondary">{job.salary}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{job.details}</p>
              </div>
              <div className="ml-4 flex flex-col items-center">
                {job.isMatch ? (
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <p>It&apos;s a Match!</p>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                ) : (
                  <XCircle className="h-8 w-8 text-red-500" />
                )}
                <button
                  onClick={() => handleRemoveJob(String(job.id))}
                  className="mt-2 text-red-500 hover:text-red-700">
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptedJobsPage;

const Navbar: React.FC = () => (
  <nav className="mb-4">
    <ArrowLeft className="h-6 w-6 inline-block -mt-1 mr-2" />
    <Link href="/swiper" className="hover:underline">
      Back to Swiper
    </Link>
  </nav>
);
