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
  { icon: Search, text: 'Discover opportunities that match your skills' },
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl bg-white shadow-xl rounded-xl animate-in fade-in zoom-in-50">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Welcome to CultureMatch</CardTitle>
          <CardDescription className="text-center text-lg">
            Choose how you want to use our platform
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 items-stretch justify-center p-6">
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
            tagline="Preview the employee experience (Demo Only)"
            accentColor="blue-600"
            onSelect={setSelected}
          />
        </CardContent>
        <div className="p-6 flex justify-center">
          <Button
            className="w-full md:w-auto px-8 py-2 text-base"
            disabled={!selected}
            onClick={handleContinue}>
            Continue as {selected ? OnboardingType[selected] : '...'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
