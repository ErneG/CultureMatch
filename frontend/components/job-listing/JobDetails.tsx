import { JobListing } from '@/types/entities';

interface JobDetailsProps {
  job: JobListing | null;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  if (!job) return <div className="p-4">Select a job listing to see the details.</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-lg">{job.location}</p>
      {job.description && <p>{job.description}</p>}
      {job.salaryMin && job.salaryMax && (
        <p>
          Salary: ${job.salaryMin} - ${job.salaryMax}
        </p>
      )}
      {job.salaryType && <p>Salary Type: {job.salaryType}</p>}
      {job.hoursRequirement && <p>Hours Requirement: {job.hoursRequirement}</p>}
      {job.contactInfo && <p>Contact Info: {job.contactInfo}</p>}
      {job.jobForm && <p>Job Form: {job.jobForm}</p>}
      {job.jobType !== undefined && <p>Job Type: {job.jobType}</p>}
      {job.skills && job.skills.length > 0 && (
        <div>
          <h3 className="font-semibold">Skills:</h3>
          <ul className="list-disc list-inside">
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
      {job.benefits && job.benefits.length > 0 && (
        <div>
          <h3 className="font-semibold">Benefits:</h3>
          <ul className="list-disc list-inside">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      {job.closingDate && <p>Closing Date: {new Date(job.closingDate).toLocaleDateString()}</p>}
    </div>
  );
};
