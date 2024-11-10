import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Inbox, Star, Send, FileText as Drafts, Archive, Trash, Tag } from 'lucide-react';

const EmailSidebar = () => {
  const menuItems = [
    { icon: Inbox, label: 'Inbox', notifications: 5 },
    { icon: Star, label: 'Starred' },
    { icon: Send, label: 'Sent' },
    { icon: Drafts, label: 'Drafts', notifications: 2 },
    { icon: Archive, label: 'Archive' },
    { icon: Trash, label: 'Trash' },
    { icon: Tag, label: 'Categories' },
  ];

  return (
    <div className="hidden md:flex w-64 flex-shrink-0 flex-col border-r">
      <div className="p-4">
        <Button variant="default" className="w-full">
          Compose
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="px-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Button variant="ghost" className="w-full justify-start">
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                  {item.notifications && (
                    <span className="ml-auto rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                      {item.notifications}
                    </span>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default EmailSidebar;
