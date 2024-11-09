import { ReactNode } from 'react';
import EnterpriseNavigation from './_components/EnterpriseNavigation';

const EnterpriseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mx-auto max-w-[1280px]">
      <EnterpriseNavigation />
      <div className="pt-[4rem]">{children}</div>
    </main>
  );
};

export default EnterpriseLayout;
