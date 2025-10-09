"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartData = [
  { floor: 'Floor 1', requests: 18 },
  { floor: 'Floor 2', requests: 23 },
  { floor: 'Floor 3', requests: 31 },
  { floor: 'Floor 4', requests: 12 },
  { floor: 'Floor 5', requests: 27 },
];

const chartConfig = {
  requests: {
    label: "Repair Requests",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function TechnicianHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technician Heatmap</CardTitle>
        <CardDescription>Repair request density by floor for the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="floor"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                stroke="hsl(var(--foreground))"
              />
              <YAxis stroke="hsl(var(--foreground))" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="requests" fill="var(--color-requests)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
