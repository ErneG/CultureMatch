import { JobListing } from '@/types/entities';

interface JobListProps {
  jobs: JobListing[];
  onSelectJob: (job: JobListing) => void;
  activeJobId: number | null;
}

export const JobList: React.FC<JobListProps> = ({ jobs, onSelectJob, activeJobId }) => (
  <div className="h-full w-full overflow-y-auto  rounded-md lg:pr-3">
    {jobs.map((job) => (
      <div
        key={job.id}
        onClick={() => onSelectJob(job)}
        className={`p-4 mb-2  rounded-md cursor-pointer bg-white border-2 border-stone-200  shadow-sm ${
          job.id === activeJobId ? ' border-violet-300' : 'border-stone-200'
        }`}>
        <h3 className="font-bold text-lg">{job.title}</h3>
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
