'use client';

import RadialChart from '@/components/charts/RadialChart';
import { ChartConfig } from '@/components/ui/chart';
const chartData = [{ month: 'january', desktop: 1260, mobile: 570 }];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const SummaryPage = () => {
  return (
    <section className="grid grid-cols-12 gap-5">
      <h1 className="col-span-12 font-semibold text-5xl pb-5">Summary</h1>
      <RadialChart
        title="Happiness"
        description="January - June 2024"
        data={chartData}
        config={chartConfig}
        dataKeys={{ desktop: 'color-desktop', mobile: 'color-mobile' }}
        middleText="Happiness"
        middleValue={1830}
        footerDescription="How enjoyable people find their day-to-day life at work"
      />
      <RadialChart
        title="Purpose"
        description="January - June 2024"
        data={chartData}
        config={chartConfig}
        dataKeys={{ desktop: 'color-desktop', mobile: 'color-mobile' }}
        middleText="Total"
        middleValue={chartData[0].desktop + chartData[0].mobile}
        footerDescription="How meaningful people find their work"
      />
      <RadialChart
        title="Satisfaction"
        description="January - June 2024"
        data={chartData}
        config={chartConfig}
        dataKeys={{ desktop: 'color-desktop', mobile: 'color-mobile' }}
        middleText="Total"
        middleValue={chartData[0].desktop + chartData[0].mobile}
        footerDescription="How content people feel with the way things are at work"
      />
      <RadialChart
        title="Stress-free"
        description="January - June 2024"
        data={chartData}
        config={chartConfig}
        dataKeys={{ desktop: 'color-desktop', mobile: 'color-mobile' }}
        middleText="Total"
        middleValue={chartData[0].desktop + chartData[0].mobile}
        footerDescription="How manageable people find their work stress"
      />
    </section>
  );
};

export default SummaryPage;
