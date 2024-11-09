import { OnboardingTypeKey } from '@/app/onboarding/types';
import { useRole } from '@/lib/hooks/useRole';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { FC, ComponentType } from 'react';
import React from 'react';
export function checkRole(
  requiredRole: OnboardingTypeKey,
  currentRole: OnboardingTypeKey | null,
): boolean {
  if (!currentRole) return false;
  return currentRole === requiredRole;
}

export function requireRole<P extends object>(requiredRole: OnboardingTypeKey) {
  return function withRole(Component: ComponentType<P>): FC<P> {
    const WithRoleComponent: FC<P> = (props: P) => {
      const { getRole } = useRole();
      const router = useRouter();
      const role = getRole();

      useEffect(() => {
        if (!checkRole(requiredRole, role)) {
          router.push('/onboarding');
        }
      }, [role, router]);

      if (!checkRole(requiredRole, role)) {
        return null;
      }

      return React.createElement(Component, props);
    };

    WithRoleComponent.displayName = `WithRole(${Component.displayName || Component.name || 'Component'})`;

    return WithRoleComponent;
  };
}
