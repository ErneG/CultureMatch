import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export const departments = [
  { id: 'eng', name: 'Engineering' },
  { id: 'prod', name: 'Product' },
  { id: 'des', name: 'Design' },
  { id: 'mkt', name: 'Marketing' },
  { id: 'sales', name: 'Sales' },
  { id: 'hr', name: 'Human Resources' },
  { id: 'fin', name: 'Finance' },
] as const;

export type Department = (typeof departments)[number];

interface DepartmentSelectProps {
  value: Department | undefined;
  onChange: (value: Department) => void;
}

export function DepartmentSelect({ value, onChange }: DepartmentSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="department">Department</Label>
      <Select
        value={value?.id}
        onValueChange={(id) => {
          const dept = departments.find((d) => d.id === id);
          if (dept) onChange(dept);
        }}>
        <SelectTrigger id="department" className="w-full">
          <SelectValue placeholder="Select your department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept.id} value={dept.id}>
              {dept.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
