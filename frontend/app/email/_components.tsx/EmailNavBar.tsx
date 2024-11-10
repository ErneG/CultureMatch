import { Button } from '@/components/ui/button';

import { Reply, ReplyAll, Forward, Trash2 } from 'lucide-react';

const EmailNavBar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between border-b px-4 py-2">
      <div className="flex flex-wrap items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Reply className="h-4 w-4" />
          <span className="ml-1 hidden lg:inline">Reply</span>
        </Button>
        <Button variant="ghost" size="sm">
          <ReplyAll className="h-4 w-4" />
          <span className="ml-1 hidden lg:inline">Reply All</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Forward className="h-4 w-4" />
          <span className="ml-1 hidden lg:inline">Forward</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
          <span className="ml-1 hidden lg:inline">Delete</span>
        </Button>
      </div>
    </nav>
  );
};

export default EmailNavBar;
