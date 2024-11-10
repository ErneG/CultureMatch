'use client';

import { useState } from 'react';
import { SurveyDisclaimer } from '@/components/survey/SurveyDisclaimer';
import SurveyContent from '@/components/survey/SurveyContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import jobseeker_questionnaire from './jobseeker-template-updated.json';
import { Profession, ProfessionSelect } from './ProfessionSelect';
import { SkillManager } from './SkillManager';
import { useRouter } from 'next/navigation';

type SurveyStep = 'disclaimer' | 'details' | 'questions';

export default function JobseekerSurvey() {
  const [currentStep, setCurrentStep] = useState<SurveyStep>('disclaimer');
  const [profession, setProfession] = useState<Profession>();
  const [skills, setSkills] = useState<string[]>([]);
  const router = useRouter();

  const canProceedToQuestions = profession && skills.length > 0;

  const renderStep = () => {
    switch (currentStep) {
      case 'disclaimer':
        return (
          <SurveyDisclaimer
            title="Career Preferences Survey"
            subtitle="Help us understand your ideal workplace"
            onStart={() => setCurrentStep('details')}
          />
        );

      case 'details':
        return (
          <div className="container mx-auto py-8 px-4 max-w-3xl space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Career Preferences Survey</h1>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep('disclaimer')}
                  className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Instructions
                </Button>
              </div>
              <p className="text-muted-foreground">
                Before we begin, please tell us about your professional background
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <ProfessionSelect value={profession} onChange={setProfession} />

                  {profession && (
                    <div className="pt-2">
                      <SkillManager skills={skills} onChange={setSkills} maxSkills={5} />
                      {skills.length === 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Please add at least one key skill to proceed
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('disclaimer')}
                className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Instructions
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={!canProceedToQuestions}
                  onClick={() => {
                    router.push('/swiper?type=skip');
                  }}
                  className="flex items-center gap-2">
                  DEMO: Skip form
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setCurrentStep('questions')}
                  disabled={!canProceedToQuestions}
                  className="flex items-center gap-2">
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 'questions':
        return (
          <SurveyContent
            questions={jobseeker_questionnaire.jobseeker_questionnaire}
            title="Career Preferences Survey"
            onBack={() => setCurrentStep('details')}
            onSubmit={() => {
              router.push('/swiper');
              console.log('Submit survey');
            }}
          />
        );
    }
  };

  return <>{renderStep()}</>;
}
