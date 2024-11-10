import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillManagerProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  maxSkills?: number;
}

export function SkillManager({ skills, onChange, maxSkills = 5 }: SkillManagerProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();

      // Don't add if skill already exists or max skills reached
      if (!skills.includes(inputValue.trim()) && skills.length < maxSkills) {
        onChange([...skills, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>
          Key skills
          <span className="text-sm text-muted-foreground ml-2">
            (Press Enter to add, maximum {maxSkills})
          </span>
        </Label>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          disabled={skills.length >= maxSkills}
        />
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className={cn(
                'inline-flex items-center gap-1 pl-3 pr-2 py-1 rounded-full',
                'bg-primary/10 text-primary text-sm',
                ' transition-colors',
              )}>
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:bg-primary/20 rounded-full p-0.5"
                aria-label={`Remove ${skill}`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
