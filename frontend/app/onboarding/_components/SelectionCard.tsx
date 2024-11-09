import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { OnboardingType } from '../page';

interface Feature {
  icon: LucideIcon;
  text: string;
}

interface SelectionCardProps {
  type: OnboardingType;
  selected: OnboardingType | null;
  icon: LucideIcon;
  title: string;
  features: Feature[];
  tagline: string;
  accentColor: string;
  onSelect: (type: OnboardingType) => void;
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
      className={`w-full md:w-1/2 ${isSelected ? 'border-2 border-purple-500 rounded-md' : ''}`}>
      <Button
        variant="outline"
        className="w-full h-full text-left flex flex-col items-start justify-between p-6"
        onClick={() => onSelect(type)}>
        <div>
          <Icon className={`w-12 h-12 mb-4 text-${accentColor}`} />
          <div className="text-2xl font-semibold mb-2">{title}</div>
          <div className="text-sm text-muted-foreground space-y-2">
            {features.map((feature, index) => (
              <p key={index}>
                <feature.icon className="inline mr-2 w-4 h-4" />
                {feature.text}
              </p>
            ))}
          </div>
        </div>
        <div className={`text-sm font-medium text-${accentColor} mt-4`}>{tagline}</div>
      </Button>
    </motion.div>
  );
}
