export interface Entity {
  id: number;
  name: string;
  type: number;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  registrationNumber?: string | null;
  isActive?: boolean | null;
}

export interface JobListing {
  id?: number;
  entityId: number;
  title: string;
  description?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryType?: number | null;
  location?: string | null;
  hoursRequirement?: string | null;
  contactInfo?: string | null;
  jobForm?: number | null;
  jobType?: number | null;
  isActive?: boolean | null;
  postedAt?: string | null;
  updatedAt?: string | null;
  closingDate?: string | null;
  skills?: string[];
  benefits?: string[];
}
