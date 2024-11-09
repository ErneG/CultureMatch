import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ENTERPRISE_COMPANY_NAME } from '@/config/constants';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  MapPin,
  Building2,
  Clock,
  Banknote,
  Users,
  ArrowLeftIcon,
  PencilIcon,
} from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { JobListing } from '@/types/entities';
import { Button } from '@/components/ui/button';

interface JobDetailsProps {
  job: JobListing | null;
  handleBackToList: () => void;
}

const salaryType = {
  1: 'Yearly',
  2: 'Monthly',
  3: 'Weekly',
  4: 'Hourly',
};

export const JobDetails: React.FC<JobDetailsProps> = ({ job, handleBackToList }) => {
  if (!job) return null;

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 lg:p-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-2">
              <div className="w-fit h-fit">
                <ArrowLeftIcon
                  className="w-[1.5rem] h-[1.5rem] cursor-pointer text-neutral-800 hover:text-neutral-600 md:hidden"
                  onClick={handleBackToList}
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">{job.title}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{ENTERPRISE_COMPANY_NAME}</span>
                </div>
              </div>
              <Badge variant="default" className="text-sm">
                Open
              </Badge>
            </div>

            <Button variant="outline" size="sm" className="flex items-center gap-2" disabled>
              <PencilIcon className="h-4 w-4" />
              Edit Position
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>
            {job.closingDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Closes {new Date(job.closingDate).toLocaleDateString()}
              </div>
            )}
            {job.hoursRequirement && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {job.hoursRequirement}
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Salary Information */}
        {(job.salaryMin || job.salaryMax) && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                Compensation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {job.salaryMin && job.salaryMax && (
                  <div>
                    <p className="text-2xl font-bold">
                      ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {salaryType[job.salaryType as keyof typeof salaryType] || salaryType[1]}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Description */}
        {job.description && (
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{job.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Skills Section */}
        {job.skills && job.skills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger>
                      <Badge variant="secondary" className="cursor-help">
                        {skill}
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">{skill}</p>
                        <p className="text-sm text-muted-foreground">
                          This skill is required for the position
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefits Section */}
        {job.benefits && job.benefits.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                      ✓
                    </Badge>
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        {job.contactInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>HR</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base md:text-lg font-medium">{job.contactInfo}</p>
                <p className="text-sm text-muted-foreground">Human Resources</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};
