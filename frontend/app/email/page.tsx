import { Card } from '@/components/ui/card';
import EmailContent from './_components.tsx/EmailContent';
import { EmailHeader } from './_components.tsx/EmailHeader';
import EmailNavBar from './_components.tsx/EmailNavBar';
import EmailSidebar from './_components.tsx/EmailSidebar';
import EmailSmallSidebar from './_components.tsx/EmailSmallSidebar';

const EmailTemplatePage = () => {
  return (
    <div className="flex h-screen items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
      <Card className="flex h-full w-full flex-col border 2xl:max-w-[1400px] max-h-[700px]">
        <EmailHeader />
        <div className="flex flex-1">
          <EmailSmallSidebar />

          <EmailSidebar />
          <div className="flex flex-1 flex-col">
            <EmailNavBar />
            <EmailContent />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmailTemplatePage;
