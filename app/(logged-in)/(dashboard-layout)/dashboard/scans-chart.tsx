"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { DailyPoint } from "@/query/business/get-stats";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  scans: {
    label: "Scans",
    color: "var(--chart-1)",
  },
  clicks: {
    label: "Clics vers Google",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ScansChart({ daily }: { daily: DailyPoint[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Activité de votre QR</CardTitle>
        <CardDescription>
          Scans et clients envoyés vers votre fiche Google
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart
            accessibilityLayer
            data={daily}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={(props) => (
                <ChartTooltipContent {...props} indicator="dot" />
              )}
            />
            <Area
              dataKey="scans"
              type="monotone"
              fill="var(--color-scans)"
              fillOpacity={0.3}
              stroke="var(--color-scans)"
            />
            <Area
              dataKey="clicks"
              type="monotone"
              fill="var(--color-clicks)"
              fillOpacity={0.4}
              stroke="var(--color-clicks)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
