'use client';

import { useState, useEffect } from 'react';

import { fetchCompanies } from '@/actions/companyActions';
import { fetchJobListings } from '@/actions/jobActions';

import { JobList } from '@/components/job-listing/JobList';
import { JobDetails } from '@/components/job-listing/JobDetails';
import { Entity, JobListing } from '@/types/entities';
import { CompanyCombobox } from '@/components/CompanyCombobox';
import { CreateJobListingDialog } from '@/components/job-listing/CreateJobListingDialog';

export default function JobListingsPage() {
  const [companies, setCompanies] = useState<Entity[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const data = await fetchCompanies();
    setCompanies(data);

    if (data.length > 0) {
      setSelectedCompanyId(data[0].id);
    }
  };

  useEffect(() => {
    if (selectedCompanyId !== null) {
      loadJobListings(selectedCompanyId);
    }
  }, [selectedCompanyId]);

  const loadJobListings = async (companyId: number) => {
    const jobs = await fetchJobListings(companyId);
    setJobListings(jobs);
    setSelectedJob(jobs[0] || null);
  };

  const handleCompanySelect = (companyId: number) => {
    setSelectedCompanyId(companyId);
  };

  const handleCompanyCreated = async () => {
    await loadCompanies();
  };

  const handleJobCreated = async () => {
    if (selectedCompanyId !== null) {
      await loadJobListings(selectedCompanyId);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <div className="w-1/3 border-r p-4 space-y-4 flex flex-col">
        <CompanyCombobox
          companies={companies}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={handleCompanySelect}
          onCompanyCreated={handleCompanyCreated}
        />
        {selectedCompanyId && (
          <CreateJobListingDialog companyId={selectedCompanyId} onJobCreated={handleJobCreated} />
        )}
        <div className="flex-grow overflow-y-auto">
          {selectedCompanyId && (
            <JobList
              jobs={jobListings}
              onSelectJob={setSelectedJob}
              activeJobId={selectedJob?.id || null}
            />
          )}
        </div>
      </div>
      <div className="w-2/3">
        <JobDetails job={selectedJob} />
      </div>
    </div>
  );
}
