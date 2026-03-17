"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tasksCompleted = [
  { day: "Mon", completed: 5 },
  { day: "Tue", completed: 7 },
  { day: "Wed", completed: 4 },
  { day: "Thu", completed: 6 },
  { day: "Fri", completed: 8 },
  { day: "Sat", completed: 3 },
  { day: "Sun", completed: 2 },
];

const focusSessions = [
  { label: "0–25m", count: 4 },
  { label: "25–50m", count: 7 },
  { label: "50–75m", count: 3 },
  { label: "75m+", count: 1 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:to-slate-900 lg:pl-64">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-4 pb-8 pt-4 lg:px-8">
          <div className="mb-4 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Understand your study patterns and productivity trends.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Activity className="h-4 w-4 text-indigo-500" />
                  Weekly Tasks Completed
                </CardTitle>
                <Badge variant="outline" className="text-[11px]">
                  Last 7 days
                </Badge>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tasksCompleted}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip
                      formatter={(value) =>
                        value === undefined ? "" : `${value} tasks`
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Tasks completed</CardTitle>
                </CardHeader>
                <CardContent className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tasksCompleted}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" tickLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Focus sessions</CardTitle>
                </CardHeader>
                <CardContent className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={focusSessions}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="label" tickLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

