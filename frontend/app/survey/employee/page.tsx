'use client';

import { useState } from 'react';
import { SurveyDisclaimer } from '@/components/survey/SurveyDisclaimer';
import SurveyContent from '@/components/survey/SurveyContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import employee_questionnaire from './employee-template-updated.json';
import { DepartmentSelect, type Department } from './DepartmentSelect';

type SurveyStep = 'disclaimer' | 'details' | 'questions';

// Hardcoded company details
const COMPANY = {
  name: 'TechCorp International',
  description: 'Leading technology solutions provider',
  location: 'Global',
};

export default function EmployeeSurvey() {
  const [currentStep, setCurrentStep] = useState<SurveyStep>('disclaimer');
  const [department, setDepartment] = useState<Department>();
  const router = useRouter();

  const canProceedToQuestions = !!department;

  const renderStep = () => {
    switch (currentStep) {
      case 'disclaimer':
        return (
          <SurveyDisclaimer
            title="Employee Satisfaction Survey"
            subtitle="Help us understand your experience at work"
            onStart={() => setCurrentStep('details')}
          />
        );

      case 'details':
        return (
          <div className="container mx-auto py-8 px-4 max-w-3xl space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Employee Satisfaction Survey</h1>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep('disclaimer')}
                  className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Instructions
                </Button>
              </div>
              <p className="text-muted-foreground">
                Before we begin, please confirm your department
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Info Card */}
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{COMPANY.name}</h3>
                        <p className="text-sm text-muted-foreground">{COMPANY.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Location: {COMPANY.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Department Selection */}
                <div className="space-y-4">
                  <DepartmentSelect value={department} onChange={setDepartment} />
                  {!department && (
                    <p className="text-sm text-muted-foreground">
                      Please select your department to proceed
                    </p>
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
              <Button
                onClick={() => setCurrentStep('questions')}
                disabled={!canProceedToQuestions}
                className="flex items-center gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 'questions':
        return (
          <SurveyContent
            storageName="employee_survey"
            questions={employee_questionnaire.employee_questionnaire}
            title="Employee Satisfaction Survey"
            onBack={() => setCurrentStep('details')}
            onSubmit={() => {
              router.push('/swiper');
              console.log('Submit employee survey');
            }}
          />
        );
    }
  };

  return <>{renderStep()}</>;
}
