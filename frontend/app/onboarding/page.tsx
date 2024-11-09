'use client';
import { useState } from 'react';
import { Building2, Search, Briefcase, Users, FileText, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SelectionCard } from './_components/SelectionCard';
export enum OnboardingType {
  COMPANY = 'company',
  JOBSEEKER = 'jobseeker',
}

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

export default function Component() {
  const [selected, setSelected] = useState<OnboardingType | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white shadow-xl rounded-xl animate-in fade-in zoom-in-50">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Welcome to JobSwipe</CardTitle>
          <CardDescription className="text-center text-lg">
            Choose how you want to use our platform
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 items-stretch justify-center p-6">
          <SelectionCard
            type={OnboardingType.COMPANY}
            selected={selected}
            icon={Building2}
            title="Company"
            features={companyFeatures}
            tagline="Streamline your hiring process"
            accentColor="purple-600"
            onSelect={setSelected}
          />
          <SelectionCard
            type={OnboardingType.JOBSEEKER}
            selected={selected}
            icon={Briefcase}
            title="Job Seeker"
            features={jobSeekerFeatures}
            tagline="Find your dream job with ease"
            accentColor="indigo-600"
            onSelect={setSelected}
          />
        </CardContent>
        <div className="p-6 flex justify-center">
          <Button
            className="w-full md:w-auto px-8 py-2 text-base"
            disabled={!selected}
            onClick={() => console.log(`Signed up as: ${selected}`)}>
            Continue as {selected || '...'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
