'use client';

import React from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';

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
  innerRadius = 100,
  outerRadius = 150,
  middleText,
  middleValue,
}) => {
  return (
    <Card className="flex flex-col col-span-12 md:col-span-4">
      <CardHeader className="flex flex-col items-center pb-0">
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
        <CardDescription className="text-center text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col mt-3 pb-0 grow justify-end">
        <ChartContainer config={config} className="mx-auto aspect-square w-full max-h-[160px] grow">
          <RadialBarChart
            data={data}
            endAngle={endAngle}
            innerRadius={innerRadius}
            cy={120}
            outerRadius={outerRadius}>
            <ChartTooltip active={false} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-4xl font-bold"
                          dy="-10">
                          {middleValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground text-base">
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
    </Card>
  );
};

export default RadialChart;
