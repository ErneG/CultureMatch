import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { OnboardingTypeKey } from '@/app/onboarding/types';

const ROLE_COOKIE_KEY = 'user-role';

export function useRole() {
  const setRole = useCallback((role: OnboardingTypeKey) => {
    // Set cookie with 7 day expiry
    Cookies.set(ROLE_COOKIE_KEY, role, { expires: 7 });
  }, []);

  const getRole = useCallback((): OnboardingTypeKey | null => {
    const role = Cookies.get(ROLE_COOKIE_KEY) as OnboardingTypeKey | undefined;
    return role || null;
  }, []);

  const clearRole = useCallback(() => {
    Cookies.remove(ROLE_COOKIE_KEY);
  }, []);

  return {
    setRole,
    getRole,
    clearRole,
  };
}
