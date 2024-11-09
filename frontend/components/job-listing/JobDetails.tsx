import { useWindowWidth } from '@/hooks/useWindownWidth';
import { JobListing } from '@/types/entities';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface JobDetailsProps {
  job: JobListing | null;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  const [displayedJob, setDisplayedJob] = useState<JobListing | null>(job);
  const windowWidth = useWindowWidth();

  const isDesktop = windowWidth !== undefined && windowWidth >= 765;

  useEffect(() => {
    if (isDesktop) {
      const timeout = setTimeout(() => setDisplayedJob(job), 300);
      return () => clearTimeout(timeout);
    } else {
      setDisplayedJob(job);
    }
  }, [job, isDesktop]);

  const content = displayedJob ? (
    <>
      <h2 className="text-2xl font-bold">{displayedJob.title}</h2>
      <p className="text-lg">{displayedJob.location}</p>
      {displayedJob.description && <p>{displayedJob.description}</p>}
      {displayedJob.salaryMin && displayedJob.salaryMax && (
        <p>
          Salary: ${displayedJob.salaryMin} - ${displayedJob.salaryMax}
        </p>
      )}
      {displayedJob.salaryType && <p>Salary Type: {displayedJob.salaryType}</p>}
      {displayedJob.hoursRequirement && <p>Hours Requirement: {displayedJob.hoursRequirement}</p>}
      {displayedJob.contactInfo && <p>Contact Info: {displayedJob.contactInfo}</p>}
      {displayedJob.jobForm && <p>Job Form: {displayedJob.jobForm}</p>}
      {displayedJob.jobType !== undefined && <p>Job Type: {displayedJob.jobType}</p>}
      {displayedJob.skills && displayedJob.skills.length > 0 && (
        <div>
          <h3 className="font-semibold">Skills:</h3>
          <ul className="list-disc list-inside">
            {displayedJob.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
      {displayedJob.benefits && displayedJob.benefits.length > 0 && (
        <div>
          <h3 className="font-semibold">Benefits:</h3>
          <ul className="list-disc list-inside">
            {displayedJob.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      {displayedJob.closingDate && (
        <p>Closing Date: {new Date(displayedJob.closingDate).toLocaleDateString()}</p>
      )}
    </>
  ) : (
    <div className="p-4">Select a job listing to see the details.</div>
  );

  if (isDesktop) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedJob ? displayedJob.id : 'no-job'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 space-y-4">
          {content}
        </motion.div>
      </AnimatePresence>
    );
  } else {
    return <div className="p-4 space-y-4">{content}</div>;
  }
};
