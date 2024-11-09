import { JobListing } from '@/types/entities';

interface JobListProps {
  jobs: JobListing[];
  onSelectJob: (job: JobListing) => void;
  activeJobId: number | null;
}

export const JobList: React.FC<JobListProps> = ({ jobs, onSelectJob, activeJobId }) => (
  <div className="h-full overflow-y-auto bg-gray-100 p-4">
    {jobs.map((job) => (
      <div
        key={job.id}
        onClick={() => onSelectJob(job)}
        className={`p-4 mb-2 rounded-md cursor-pointer bg-white ${
          job.id === activeJobId ? 'bg-blue-100 border border-blue-500' : ''
        }`}>
        <h3 className="font-bold">{job.title}</h3>
        {job.location && <p className="text-sm">Location: {job.location}</p>}
        {job.salaryMin && job.salaryMax && (
          <p className="text-sm">
            Salary: ${job.salaryMin} - ${job.salaryMax}
          </p>
        )}
        {job.postedAt && (
          <p className="text-sm">Posted on: {new Date(job.postedAt).toLocaleDateString()}</p>
        )}
      </div>
    ))}
  </div>
);
