import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export const professions = [
  { value: 'human_resources', label: 'Human Resources Manager' },
  { value: 'accounting', label: 'Accountant' },
  { value: 'programming', label: 'Programmer' },
  { value: 'marketing', label: 'Marketing Specialist' },
  { value: 'doctor', label: 'Doctor' },
] as const;

export type Profession = (typeof professions)[number]['value'];

interface ProfessionSelectProps {
  value: Profession | undefined;
  onChange: (value: Profession) => void;
}

export function ProfessionSelect({ value, onChange }: ProfessionSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="profession">Select your profession</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="profession" className="w-full">
          <SelectValue placeholder="Choose a profession" />
        </SelectTrigger>
        <SelectContent>
          {professions.map((profession) => (
            <SelectItem key={profession.value} value={profession.value}>
              {profession.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
