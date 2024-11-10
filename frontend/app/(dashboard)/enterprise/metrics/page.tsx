'use client';

import RadialChart from '@/components/charts/RadialChart';
import TraitScoreCard from '@/components/TraitScoreCard';
import { ChartConfig } from '@/components/ui/chart';
import { SmileIcon, TargetIcon, StressIcon, ThumbsUpIcon } from '@/components/icons/TraitIcon';

const chartData = {
  lastSurveyResponseCount: 50,
  lastSurveyResponsePercentage: 99,
  matchesMade: 41,
  matchesMadePercentage: 65,
  matchesOutperforming: 30,
  matchesOutperformingPercentage: 27,
  traitScores: {
    happiness: 72,
    purpose: 70,
    satisfaction: 50,
    stressFree: 70,
  },
};

const chartConfig = {
  red: {
    label: 'Desktop',
    color: '#dddddd',
  },
  green: {
    label: 'Mobile',
    color: '#8b5ccc',
  },
} satisfies ChartConfig;
const dataKeys = { red: 'color-red', green: 'color-green' } satisfies { [key: string]: string };

const normalizedChartData = (value: number) => {
  return [
    {
      green: value,
      red: 100 - value,
    },
  ];
};

const SummaryPage = () => {
  return (
    <>
      <section className="grid grid-cols-12 gap-5 mb-5 p-4 lg:px-8">
        <h1 className="col-span-12 font-semibold text-5xl pb-5">Overview</h1>
        <RadialChart
          title="Employee Activity"
          description="Last survey response count"
          data={normalizedChartData(chartData.lastSurveyResponsePercentage)}
          config={chartConfig}
          dataKeys={dataKeys}
          middleText={`${chartData.lastSurveyResponsePercentage}% of employees`}
          middleValue={chartData.lastSurveyResponseCount}
          footerDescription="How enjoyable people find their day-to-day life at work"
        />
        <RadialChart
          title="Match Score"
          description="Jobseekers had a match"
          data={normalizedChartData(chartData.matchesMadePercentage)}
          config={chartConfig}
          dataKeys={dataKeys}
          middleText={`${chartData.matchesMadePercentage}% of reached users`}
          middleValue={chartData.matchesMade}
          footerDescription="How meaningful people find their work"
        />
        <RadialChart
          title="Growth Potential"
          description="Matches that outperform your value scores"
          data={normalizedChartData(chartData.matchesOutperformingPercentage)}
          config={chartConfig}
          dataKeys={dataKeys}
          middleText={`${chartData.matchesOutperformingPercentage}% of matches`}
          middleValue={chartData.matchesOutperforming}
          footerDescription="How content people feel with the way things are at work"
        />{' '}
      </section>
      <section className="grid grid-cols-12 gap-5 mb-5 p-4 lg:px-8">
        <h1 className="col-span-12 font-semibold text-5xl mt-10 pb-5">Employee Well-Being</h1>
        <TraitScoreCard
          title="Happiness"
          description="Overall employee well-being"
          score={chartData.traitScores.happiness}
          icon={SmileIcon}
        />
        <TraitScoreCard
          title="Purpose"
          description="Sense of meaningful work"
          score={chartData.traitScores.purpose}
          icon={TargetIcon}
        />
        <TraitScoreCard
          title="Satisfaction"
          description="Contentment with work environment"
          score={chartData.traitScores.satisfaction}
          icon={ThumbsUpIcon}
        />
        <TraitScoreCard
          title="Stress-free"
          description="Freedom from work-related stress"
          score={chartData.traitScores.stressFree}
          icon={StressIcon}
        />
      </section>
    </>
  );
};

export default SummaryPage;
