'use client';
import { useState } from 'react';
import { Building2, Search, Briefcase, Users, FileText, ThumbsUp, TestTube2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SelectionCard } from './_components/SelectionCard';
import { useRole } from '@/lib/hooks/useRole';
import { useRouter } from 'next/navigation';
import { OnboardingType, OnboardingTypeKey, onboardingRedirects } from './types';

const companyFeatures = [
  { icon: FileText, text: 'Post detailed job offers' },
  { icon: Search, text: 'Find the perfect candidates' },
  { icon: Users, text: 'Build your dream team' },
];

const jobSeekerFeatures = [
  { icon: ThumbsUp, text: 'Swipe through curated job offers' },
  { icon: Search, text: 'Match opportunities to your skills' },
  { icon: Building2, text: 'Connect with top companies' },
];

const employeeFeatures = [
  { icon: FileText, text: 'Experience our employee form demo' },
  { icon: Users, text: 'See how employees submit information' },
  { icon: ThumbsUp, text: 'Preview the email invitation flow' },
];

export default function Component() {
  const [selected, setSelected] = useState<OnboardingTypeKey | null>(null);
  const { setRole } = useRole();
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;

    setRole(selected);
    router.push(onboardingRedirects[selected]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <Card className="w-full max-w-7xl mx-auto bg-white shadow-xl rounded-xl animate-in fade-in zoom-in-50">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-2xl md:text-3xl text-center">
            Welcome to CultureMatch
          </CardTitle>
          <CardDescription className="text-center text-base md:text-lg">
            Choose how you want to use our platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 place-items-center">
            <SelectionCard
              type="COMPANY"
              selected={selected}
              icon={Building2}
              title="Company"
              features={companyFeatures}
              tagline="Streamline your hiring process"
              accentColor="purple-600"
              onSelect={setSelected}
            />
            <SelectionCard
              type="JOBSEEKER"
              selected={selected}
              icon={Briefcase}
              title="Job Seeker"
              features={jobSeekerFeatures}
              tagline="Find your dream job with ease"
              accentColor="indigo-600"
              onSelect={setSelected}
            />
            <SelectionCard
              type="EMPLOYEE"
              selected={selected}
              icon={TestTube2}
              title="Demo: Employee Form"
              features={employeeFeatures}
              tagline="Preview the employee experience"
              accentColor="blue-600"
              onSelect={setSelected}
            />
          </div>
        </CardContent>
        <div className="p-4 md:p-6 flex justify-center">
          <Button
            className="w-full md:w-auto px-6 md:px-8 py-2 text-base"
            disabled={!selected}
            onClick={handleContinue}>
            Continue as {selected ? OnboardingType[selected] : '...'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
