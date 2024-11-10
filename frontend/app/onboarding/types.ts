export const OnboardingType = {
  COMPANY: 'Company Representative',
  JOBSEEKER: 'Job Seeker',
  EMPLOYEE: 'Demo Employee',
} as const;

export const onboardingRedirects = {
  COMPANY: '/survey/company',
  JOBSEEKER: '/survey/jobseeker',
  EMPLOYEE: '/email',
} as const;

export type OnboardingTypeKey = keyof typeof OnboardingType;
