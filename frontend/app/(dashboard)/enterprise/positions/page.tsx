'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchCompany } from '@/actions/companyActions';
import { fetchJobListings } from '@/actions/jobActions';
import { JobList } from '@/components/job-listing/JobList';
import { JobDetails } from '@/components/job-listing/JobDetails';
import { Entity, JobListing } from '@/types/entities';
import { CreateJobListingDialog } from '@/components/job-listing/CreateJobListingDialog';
import { FileText } from 'lucide-react';

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

  const activeJobs = jobListings.filter((job) => job.isActive === true).length;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          showJobDetails ? 'hidden md:flex' : 'flex'
        } flex-col w-full md:w-[400px] bg-white border-r`}>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Job Listings</h1>
              <p className="text-sm text-gray-500">Manage your open positions</p>
            </div>
            {company && (
              <CreateJobListingDialog companyId={company.id} onJobCreated={handleJobCreated} />
            )}
          </div>

          <Card className="bg-gray-50 border-dashed">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                  <p className="text-2xl font-bold">{activeJobs}</p>
                  <p className="text-xs text-gray-500">Open positions</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Views</p>
                  <p className="text-2xl font-bold">
                    {jobListings.length > 0 ? Math.floor(Math.random() * 1000) : 0}
                  </p>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            <JobList
              jobs={jobListings}
              onSelectJob={handleJobSelect}
              activeJobId={selectedJob?.id || null}
            />
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className={`${showJobDetails ? 'flex' : 'hidden md:flex'} flex-col flex-1 bg-white`}>
        <ScrollArea className="lg:h-[calc(100vh-180px)]">
          <div className="p-6">
            {selectedJob ? (
              <JobDetails handleBackToList={handleBackToList} job={selectedJob} />
            ) : (
              <EmptyState />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500">
      <div className="p-4 rounded-full bg-gray-100">
        <FileText className="w-8 h-8" />
      </div>
      <div>
        <p className="font-medium">Select a job listing</p>
        <p className="text-sm">Choose a job listing to view its details</p>
      </div>
    </div>
  );
}
