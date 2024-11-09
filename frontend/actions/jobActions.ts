'use server';

import { ENTERPRISE_COMPANY_ID } from '@/config/constants';
import prisma from '@/lib/db';
import { JobListing } from '@/types/entities';
import { Prisma } from '@prisma/client';

export async function fetchJobListings(): Promise<JobListing[]> {
  const jobs = await prisma.jobListing.findMany({
    where: { entityId: ENTERPRISE_COMPANY_ID },
  });

  return jobs.map((job) => ({
    ...job,
    salaryMin: job.salaryMin ? job.salaryMin.toNumber() : null,
    salaryMax: job.salaryMax ? job.salaryMax.toNumber() : null,
    postedAt: job.postedAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
    closingDate: job.closingDate ? job.closingDate.toISOString() : null,
  }));
}

export async function createJobListing(data: Omit<JobListing, 'id'>): Promise<JobListing> {
  const jobData: Prisma.JobListingCreateInput = {
    // Use the 'Entity' relation field with 'connect'
    Entity: { connect: { id: data.entityId } },
    title: data.title,
    description: data.description,
    salaryMin: data.salaryMin ? new Prisma.Decimal(data.salaryMin) : undefined,
    salaryMax: data.salaryMax ? new Prisma.Decimal(data.salaryMax) : undefined,
    salaryType: data.salaryType,
    location: data.location,
    hoursRequirement: data.hoursRequirement,
    contactInfo: data.contactInfo,
    jobForm: data.jobForm,
    jobType: data.jobType ?? 0,
    isActive: data.isActive ?? true,
    closingDate: data.closingDate ? new Date(data.closingDate) : undefined,
    skills: data.skills ?? [],
    benefits: data.benefits ?? [],
  };

  const job = await prisma.jobListing.create({
    data: jobData,
  });

  return {
    ...job,
    salaryMin: job.salaryMin ? job.salaryMin.toNumber() : null,
    salaryMax: job.salaryMax ? job.salaryMax.toNumber() : null,
    postedAt: job.postedAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
    closingDate: job.closingDate ? job.closingDate.toISOString() : null,
  };
}
