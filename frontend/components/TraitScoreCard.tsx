import React from 'react';

type TraitScoreCardProps = {
  title: string;
  description: string;
  score: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const TraitScoreCard: React.FC<TraitScoreCardProps> = ({ title, description, score, icon }) => {
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-3 h-full min-h-[160px] border border-gray-200 rounded-lg p-5 flex shadow-md">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold pb-2">{title}</h2>
        <p className="text-base pb-4 grow">{description}</p>
        <p className="text-4xl">
          <span className="font-bold">{score}</span>
          <span className="text-primary/50">%</span>
        </p>
      </div>
      <div className="flex flex-col justify-end items-end gap-2 grow hover:scale-110 duration-200 ">
        {icon && React.createElement(icon)}
      </div>
    </div>
  );
};

export default TraitScoreCard;
