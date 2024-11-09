import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { OnboardingTypeKey } from '../types';

interface Feature {
  icon: LucideIcon;
  text: string;
}

interface SelectionCardProps {
  type: OnboardingTypeKey;
  selected: OnboardingTypeKey | null;
  icon: LucideIcon;
  title: string;
  features: Feature[];
  tagline: string;
  accentColor: string;
  onSelect: (type: OnboardingTypeKey) => void;
}

export function SelectionCard({
  type,
  selected,
  icon: Icon,
  title,
  features,
  tagline,
  accentColor,
  onSelect,
}: SelectionCardProps) {
  const isSelected = selected === type;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full  ${isSelected ? 'border-2 border-purple-500 rounded-md' : ''}`}>
      <Button
        variant="outline"
        className="w-full h-full text-left flex flex-col items-start justify-between p-3 sm:p-4 md:p-6"
        onClick={() => onSelect(type)}>
        <div className="w-full">
          <Icon className={`w-32 h-32 mb-3 md:mb-4 text-${accentColor}`} />
          <div className="text-base sm:text-xl xl:text-2xl font-semibold mb-2">{title}</div>
          <div className="text-xs md:text-sm text-muted-foreground space-y-2 break-words">
            {features.map((feature, index) => (
              <p key={index} className="flex flex-row gap-1 items-center">
                <feature.icon className="inline shrink-0 mr-0.5 w-4 h-4" />
                <span className="break-words">{feature.text}</span>

              </p>
            ))}
          </div>
        </div>
        <div
          className={` text-xs md:text-sm font-medium text-${accentColor} mt-3 md:mt-4 break-words`}>
          {tagline}
        </div>
      </Button>
    </motion.div>
  );
}
