import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type TraitScoreCardProps = {
  title: string;
  description: string;
  score: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
};

const TraitScoreCard: React.FC<TraitScoreCardProps> = ({
  title,
  description,
  score,
  icon,
  className,
}) => {
  return (
    <Card
      className={cn('col-span-12 sm:col-span-6 lg:col-span-3 h-full transition-all ', className)}>
      <div className="flex flex-col h-full">
        <CardHeader className="pb-2">
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex flex-col justify-between h-full">
            <p className="text-muted-foreground">{description}</p>
            <div className="flex justify-between items-end pt-4">
              <div className="text-4xl font-bold text-[#8b5ccc] flex flex-row items-center gap-1">
                <span> {score}</span>
                <span className="text-neutral-800">%</span>
              </div>
              <div className="transition-transform hover:scale-105 duration-200">
                {icon && React.createElement(icon, { className: 'w-12 h-12' })}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default TraitScoreCard;
