import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: string;
  description: string;
  value: number | null;
  elaboration: string;
  onValueChange: (value: number) => void;
  onElaborationChange: (text: string) => void;
}

export function QuestionCard({
  question,
  description,
  value,
  elaboration,
  onValueChange,
  onElaborationChange,
}: QuestionCardProps) {
  const ratingOptions = [1, 2, 3, 4, 5];
  const isElaborationEmpty = elaboration.length === 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Buttons */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Strongly disagree</span>
            <span>Strongly agree</span>
          </div>
          <div className="flex gap-2">
            {ratingOptions.map((option) => (
              <Button
                key={option}
                variant={value === option ? 'default' : 'outline'}
                className={cn(
                  'flex-1 h-12 text-lg',
                  value === option && 'ring-2 ring-primary ring-offset-2',
                )}
                onClick={() => onValueChange(option)}>
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Elaboration Section */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="elaboration" className="text-sm font-medium flex items-center gap-1">
                Please elaborate
                <span className="text-destructive">*</span>
              </Label>
              <span className="text-xs text-muted-foreground">
                {elaboration.length}/200 characters
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="space-y-2">
            <Textarea
              id="elaboration"
              placeholder="Your answer is required..."
              value={elaboration}
              onChange={(e) => onElaborationChange(e.target.value)}
              maxLength={200}
              className={cn('min-h-[100px] resize-none')}
              required
            />
            {isElaborationEmpty && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>This field is required</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
