import { ReactNode } from 'react';
import EnterpriseNavigation from './_components/EnterpriseNavigation';

const EnterpriseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <EnterpriseNavigation />
      <div className="p-5 pt-[5.25rem]">{children}</div>
    </main>
  );
};

export default EnterpriseLayout;
