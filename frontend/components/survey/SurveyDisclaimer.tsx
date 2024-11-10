import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, MessageSquareText, Target, Lightbulb, ThumbsUp } from 'lucide-react';

interface SurveyDisclaimerProps {
  title: string;
  subtitle: string;
  onStart: () => void;
}

export function SurveyDisclaimer({ title, subtitle, onStart }: SurveyDisclaimerProps) {
  return (
    <div className="container mx-auto py-8 px-3 md:px-4 max-w-3xl space-y-8">
      <div className="space-y-2 p-2 md:p-0">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-lg">{subtitle}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How This Survey Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Explanation Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <ExplanationCard
              icon={<MessageSquareText className="h-5 w-5" />}
              title="Detailed Responses Matter"
              description="Your elaborated answers help us better understand your preferences. Complete sentences and specific examples are more valuable than brief responses."
            />

            <ExplanationCard
              icon={<Target className="h-5 w-5" />}
              title="Scoring System"
              description="We analyze your responses to create a comprehensive profile. The more detailed your answers, the more accurate your matches will be."
            />

            <ExplanationCard
              icon={<Lightbulb className="h-5 w-5" />}
              title="Smart Matching"
              description="Your responses help us calculate compatibility scores with potential workplaces, ensuring better matches for your career preferences."
            />

            <ExplanationCard
              icon={<ThumbsUp className="h-5 w-5" />}
              title="Best Practices"
              description="Take your time to reflect on each question. Quality responses lead to better workplace matches and career opportunities."
            />
          </div>

          {/* Example Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Response Examples</h3>

            <Alert variant="destructive" className="bg-red-50">
              <AlertDescription className="space-y-2">
                <p className="font-medium">Low-Quality Response:</p>
                <p className="text-sm">&quot;It was good&quot; or &quot;I agree with this&quot;</p>
                <p className="text-sm text-muted-foreground">
                  These responses don&apos;t provide enough context for meaningful matching.
                </p>
              </AlertDescription>
            </Alert>

            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="space-y-2">
                <p className="font-medium text-green-800">High-Quality Response:</p>
                <p className="text-sm">
                  &quot;I value work-life balance because it allows me to pursue professional
                  development while maintaining personal commitments. In my experience, this leads
                  to better productivity and job satisfaction.&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  This response provides context, personal experience, and reasoning.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-6">
          <Button onClick={onStart} className="flex items-center gap-2" size="lg">
            Start Survey <ArrowRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Helper component for explanation cards
interface ExplanationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ExplanationCard({ icon, title, description }: ExplanationCardProps) {
  return (
    <Card className="border-2">
      <CardContent className="pt-6 space-y-2">
        <div className="flex items-center gap-2 text-primary">
          {icon}
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
