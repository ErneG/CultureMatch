'use client';

import { useState } from 'react';
import { ChevronsUpDown, Check } from 'lucide-react';

import { Entity } from '@/types/entities';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from '@/components/ui/command';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CreateCompanyDialog } from '@/components/CreateCompanyDialog';

interface CompanyComboboxProps {
  companies: Entity[];
  selectedCompanyId: number | null;
  onSelectCompany: (companyId: number) => void;
  onCompanyCreated: () => void;
}

export const CompanyCombobox: React.FC<CompanyComboboxProps> = ({
  companies,
  selectedCompanyId,
  onSelectCompany,
  onCompanyCreated,
}) => {
  const [open, setOpen] = useState(false);

  const selectedCompany = companies.find((company) => company.id === selectedCompanyId);

  return (
    <div className="flex items-center space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-[300px] justify-between">
            {selectedCompany ? selectedCompany.name : 'Select a Company'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search companies..." />
            <CommandList>
              <CommandEmpty>No company found.</CommandEmpty>
              <CommandGroup>
                {companies.map((company) => (
                  <CommandItem
                    key={company.id}
                    onSelect={() => {
                      onSelectCompany(company.id);
                      setOpen(false);
                    }}>
                    {company.name}
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        company.id === selectedCompanyId ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <CreateCompanyDialog onCompanyCreated={onCompanyCreated} />
    </div>
  );
};
