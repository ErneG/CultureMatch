import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination';

interface DetailStep {
  title: string;
  component: React.ReactNode;
  isComplete: boolean;
}

interface ProfessionalDetailsCardProps {
  onBack: () => void;
  onNext: () => void;
  detailSteps: DetailStep[];
  currentDetailPage: number;
  setCurrentDetailPage: (page: number) => void;
}

export function ProfessionalDetailsCard({
  onBack,
  onNext,
  detailSteps,
  currentDetailPage,
  setCurrentDetailPage,
}: ProfessionalDetailsCardProps) {
  const canProceedToQuestions = detailSteps.every((step) => step.isComplete);
  const currentStepComplete = detailSteps[currentDetailPage - 1]?.isComplete;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{detailSteps[currentDetailPage - 1].title}</CardTitle>
      </CardHeader>
      <CardContent>{detailSteps[currentDetailPage - 1].component}</CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                onClick={() => setCurrentDetailPage(Math.max(1, currentDetailPage - 1))}
                disabled={currentDetailPage === 1}
                className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </PaginationItem>

            {detailSteps.map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => setCurrentDetailPage(index + 1)}
                  isActive={currentDetailPage === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentDetailPage(Math.min(detailSteps.length, currentDetailPage + 1))
                }
                isActive={currentDetailPage === detailSteps.length || !currentStepComplete}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="w-full flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Instructions
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceedToQuestions}
            className="flex items-center gap-2">
            Continue to Survey <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
