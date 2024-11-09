'use client';

import React from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

type ChartData = {
  [key: string]: number | string;
};

interface RadialChartProps {
  title: string;
  description: string;
  data: ChartData[];
  config: ChartConfig;
  dataKeys: { [key: string]: string };
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  middleText?: string;
  middleValue?: number;
  footerDescription: string;
}

const RadialChart: React.FC<RadialChartProps> = ({
  title,
  description,
  data,
  config,
  dataKeys,
  endAngle = 180,
  innerRadius = 80,
  outerRadius = 130,
  middleText,
  middleValue,
  footerDescription,
}) => {
  return (
    <Card className="flex flex-col col-span-3">
      <CardHeader className="flex flex-col items-center pb-0">
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square w-full max-w-[250px] max-h-[200px]">
          <RadialBarChart
            data={data}
            endAngle={endAngle}
            innerRadius={innerRadius}
            outerRadius={outerRadius}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold">
                          {middleValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground">
                          {middleText}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            {Object.entries(dataKeys).map(([key, colorVar]) => (
              <RadialBar
                key={key}
                dataKey={key}
                stackId="a"
                cornerRadius={5}
                fill={`var(--${colorVar})`}
                className="stroke-transparent stroke-2"
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-center">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RadialChart;
