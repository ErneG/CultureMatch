export const OnboardingType = {
  COMPANY: 'Company Representative',
  JOBSEEKER: 'Job Seeker',
  EMPLOYEE: 'Demo Employee',
} as const;

export const onboardingRedirects = {
  COMPANY: '/company',
  JOBSEEKER: '/jobseeker',
  EMPLOYEE: '/employee',
} as const;

export type OnboardingTypeKey = keyof typeof OnboardingType;
