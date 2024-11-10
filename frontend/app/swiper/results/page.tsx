'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Banknote,
  CheckCircle,
  XCircle,
  Trash2,
  PartyPopper,
  Loader,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Job } from '@/types/job';

const AcceptedJobsPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [acceptedJobs, setAcceptedJobs] = useState<Job[]>([]);

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Navbar />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Application manager</h1>
          <p className="text-muted-foreground mt-2">Track your job applications and matches here</p>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader className="w-8 h-8 animate-spin" />
            </div>
          ) : jobsWithMatchStatus.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4 pr-4">
              {jobsWithMatchStatus.map((job) => (
                <JobCard key={job.id} job={job} onRemove={() => handleRemoveJob(String(job.id))} />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

const JobCard = ({ job, onRemove }: { job: Job & { isMatch: boolean }; onRemove: () => void }) => (
  <Card className={job.isMatch ? 'border-green-500/50' : ''}>
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl">{job.position}</CardTitle>
          <CardDescription className="flex items-center mt-1">
            <Building2 className="h-4 w-4 mr-1" />
            {job.company}
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={onRemove}>
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          {job.location}
        </Badge>
        <Badge variant="secondary" className="flex items-center">
          <Banknote className="h-3 w-3 mr-1" />
          {job.salary}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">{job.details}</p>

      <Separator />

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          {job.isMatch ? (
            <>
              <Badge variant="default" className="bg-green-500">
                <PartyPopper className="h-3 w-3 mr-1" />
                It&apos;s a Match!
              </Badge>
              <p className="text-sm text-muted-foreground">
                The company is interested in your profile
              </p>
            </>
          ) : (
            <Badge variant="secondary">Pending Response</Badge>
          )}
        </div>
        {job.isMatch ? (
          <CheckCircle className="h-6 w-6 text-green-500" />
        ) : (
          <XCircle className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
    </CardContent>
  </Card>
);

const EmptyState = () => (
  <Card className="border-dashed">
    <CardContent className="flex flex-col items-center justify-center py-8 text-center">
      <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="font-semibold text-lg">No Accepted Jobs</h3>
      <p className="text-muted-foreground mt-2">
        Start swiping to find and save jobs that interest you
      </p>
      <Button asChild className="mt-4">
        <Link href="/swiper">Start Swiping</Link>
      </Button>
    </CardContent>
  </Card>
);

const Navbar = () => (
  <nav className="mb-8">
    <Button variant="ghost" asChild className="gap-2">
      <Link href="/swiper">
        <ArrowLeft className="h-4 w-4" />
        Back to Swiper
      </Link>
    </Button>
  </nav>
);

export default AcceptedJobsPage;
