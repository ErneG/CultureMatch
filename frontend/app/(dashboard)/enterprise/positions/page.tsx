'use client';

import { useState, useEffect } from 'react';

import { fetchCompany } from '@/actions/companyActions';
import { fetchJobListings } from '@/actions/jobActions';

import { JobList } from '@/components/job-listing/JobList';
import { JobDetails } from '@/components/job-listing/JobDetails';
import { Entity, JobListing } from '@/types/entities';
import { CreateJobListingDialog } from '@/components/job-listing/CreateJobListingDialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function JobListingsPage() {
  const [company, setCompany] = useState<Entity | null>(null);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showJobDetails, setShowJobDetails] = useState<boolean>(false);

  useEffect(() => {
    loadCompanyAndJobs();
  }, []);

  const loadCompanyAndJobs = async () => {
    const companyData = await fetchCompany();
    setCompany(companyData);

    if (companyData) {
      const jobs = await fetchJobListings();
      setJobListings(jobs);
      setSelectedJob(jobs[0] || null);
    }
  };

  const handleJobCreated = async () => {
    if (company) {
      const jobs = await fetchJobListings();
      setJobListings(jobs);
      setSelectedJob(jobs[0] || null);
    }
  };

  const handleJobSelect = (job: JobListing) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleBackToList = () => {
    setShowJobDetails(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div
        className={`${
          showJobDetails ? 'hidden md:flex' : 'flex'
        } flex-col w-full md:w-1/3 border-r p-4 space-y-4 min-h-0`}>
        {company && (
          <CreateJobListingDialog companyId={company.id} onJobCreated={handleJobCreated} />
        )}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <JobList
            jobs={jobListings}
            onSelectJob={handleJobSelect}
            activeJobId={selectedJob?.id || null}
          />
        </div>
      </div>
      {/* Main Content */}
      <div
        className={`${
          showJobDetails ? 'flex' : 'hidden md:flex'
        } flex-col w-full md:w-2/3 min-h-0`}>
        {/* Back Button for Mobile */}
        <div className="md:hidden p-4">
          <Button variant="outline" onClick={handleBackToList}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          <JobDetails job={selectedJob} />
        </div>
      </div>
    </div>
  );
}
