import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAcceptedJobs } from '@/components/providers/AcceptedJobsContext';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { RefreshCcw, ClipboardList, ThumbsUp, Building2 } from 'lucide-react';

interface EndCardProps {
  onRestart: () => void;
  onNextPage: () => void;
}

export const EndCard: React.FC<EndCardProps> = ({ onRestart, onNextPage }) => {
  const { acceptedJobs } = useAcceptedJobs();
  const totalJobs = 20; // Example total jobs shown
  const acceptRate = (acceptedJobs.length / totalJobs) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center space-y-4 pb-2">
        <CardTitle className="text-3xl font-bold">You&apos;ve Completed the Job Search!</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <StatCard
            icon={<Building2 className="h-8 w-8" />}
            value={totalJobs}
            label="Jobs Reviewed"
          />
          <StatCard
            icon={<ThumbsUp className="h-8 w-8" />}
            value={acceptedJobs.length}
            label="Jobs Accepted"
          />
        </div>

        {/* Acceptance Rate */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Acceptance Rate</span>
            <span className="font-medium">{acceptRate.toFixed(1)}%</span>
          </div>
          <Progress value={acceptRate} className="h-2" />
        </div>

        <Separator />

        {/* Next Steps */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Next Steps</h3>
          {acceptedJobs.length > 0 ? (
            <p className="text-muted-foreground">
              Great job! You&apos;ve selected {acceptedJobs.length} potential opportunities. Would
              you like to proceed to the Application Manager to review your selections?
            </p>
          ) : (
            <p className="text-muted-foreground">
              You haven&apos;t accepted any jobs yet. Would you like to try again with a new set of
              opportunities?
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-6">
        {acceptedJobs.length > 0 && (
          <Button onClick={onNextPage} className="w-full gap-2" size="lg">
            <ClipboardList className="h-4 w-4" />
            View Application Manager
          </Button>
        )}
        <Button onClick={onRestart} variant="outline" className="w-full gap-2" size="lg">
          <RefreshCcw className="h-4 w-4" />
          Restart (Demo)
        </Button>
      </CardFooter>
    </Card>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <div className="bg-muted/50 rounded-lg p-4 text-center space-y-2">
    <div className="flex justify-center text-primary">{icon}</div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  </div>
);
