import { CalendarDays, Globe, Mail, Plus, Users } from 'lucide-react';

const EmailSmallSidebar = () => {
  return (
    <div className="w-12 h-full pt-2 hidden lg:flex flex-col items-center border-r border-border ">
      <div className="space-y-2 pb-4">
        <button className="flex items-center justify-center rounded-full w-8 h-8 bg-gray-200 text-accent-foreground">
          <Globe className="w-5 h-5" />
        </button>
        <button className="flex items-center justify-center rounded-full w-8 h-8 bg-accent hover:bg-gray-300 transition-colors text-accent-foreground border border-border ">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2 flex flex-col items-center">
        <button className="flex items-center justify-center rounded-full w-8 h-8  hover:bg-gray-300 transition-colors text-accent-foreground">
          <Mail className="w-5 h-5" />
        </button>
        <button className="flex items-center justify-center rounded-full w-8 h-8  hover:bg-gray-300 transition-colors text-accent-foreground">
          <CalendarDays className="w-5 h-5" />
        </button>
        <button className="flex items-center justify-center rounded-full w-8 h-8  hover:bg-gray-300 transition-colors text-accent-foreground">
          <Users className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default EmailSmallSidebar;
