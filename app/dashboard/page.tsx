import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const todaySchedule = [
  { time: "09:00", title: "Data Structures", type: "Classroom", location: "Block A - 203" },
  { time: "11:00", title: "AI Lab", type: "Lab", location: "Innovation Lab" },
  { time: "14:30", title: "Study: Algorithms", type: "Self-study", location: "Library 2nd floor" },
  { time: "17:00", title: "Group project sync", type: "Project", location: "Online" },
];

const aiSuggestions = [
  "You have a 2-hour focus window between 3–5 PM. Use it to revise Trees & Graphs.",
  "You’re behind by 3 tasks in Operating Systems. Schedule a 60-minute catch‑up block tonight.",
  "Based on your past week, you’re most productive between 9–11 AM. Try to block this for deep work.",
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:to-slate-900 lg:pl-64">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <main className="flex-1 space-y-6 px-4 pb-8 pt-4 lg:px-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back, Surendra
            </h1>
            <p className="text-sm text-muted-foreground">
              Here&apos;s an overview of your productivity for today.
            </p>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm font-medium text-indigo-100">
                  Productivity Score
                  <Badge variant="secondary" className="bg-white/10 text-xs text-indigo-50">
                    +8% vs last week
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4">
                  <span className="text-4xl font-semibold leading-none">82</span>
                  <span className="mb-1 text-sm text-indigo-100">/ 100</span>
                </div>
                <p className="mt-3 text-xs text-indigo-100/90">
                  Great streak — you&apos;ve stayed consistent for 5 days in a row.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Tasks Due Today</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">4</span>
                  <span className="text-xs text-muted-foreground">tasks</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  2 high-priority, 1 medium, 1 low.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">5</span>
                  <span className="text-xs text-muted-foreground">tasks</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Tasks yet to complete
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle>Today&apos;s Schedule</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Stay on top of your classes and study blocks.
                  </p>
                </div>
                <Badge variant="secondary">Mon, 16 Mar</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySchedule.map((item) => (
                  <div
                    key={`${item.time}-${item.title}`}
                    className="flex items-center gap-3 rounded-xl border bg-background/60 px-3 py-2 text-sm"
                  >
                    <div className="w-16 text-xs font-medium text-muted-foreground">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.type} • {item.location}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[11px]">
                      Focus 45m
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>AI Smart Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {aiSuggestions.map((s, index) => (
                  <div
                    key={index}
                    className="rounded-xl border bg-background/60 p-3 text-xs leading-relaxed text-muted-foreground"
                  >
                    {s}
                  </div>
                ))}
                <button className="mt-1 text-xs font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-300">
                  Ask CampusFlow AI for a custom plan →
                </button>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}

