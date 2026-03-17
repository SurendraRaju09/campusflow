"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Circle, Filter, Plus } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Task = {
  id: number;
  title: string;
  course: string;
  due: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
};

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Finish linked list assignment",
    course: "Data Structures",
    due: "Today · 8:00 PM",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    title: "Prepare slides for AI lab",
    course: "Artificial Intelligence",
    due: "Tomorrow · 10:00 AM",
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    title: "Revise OS deadlock chapter",
    course: "Operating Systems",
    due: "Wed · 6:00 PM",
    status: "completed",
    priority: "low",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  function handleAdd() {
    const title = newTask.trim();
    if (!title) return;
    const nextId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks([
      {
        id: nextId,
        title,
        course: "Personal",
        due: "No due date",
        status: "pending",
        priority: "medium",
      },
      ...tasks,
    ]);
    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task,
      ),
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:to-slate-900 lg:pl-64">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-4 pb-8 pt-4 lg:px-8">
          <div className="mb-4 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
            <p className="text-sm text-muted-foreground">
              Capture and complete everything from assignments to quick study todos.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,2.3fr)_minmax(260px,1.2fr)]">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle>Task list</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Click a task to mark it complete.
                  </p>
                </div>
                <Tabs
                  defaultValue="all"
                  value={filter}
                  onValueChange={(v) =>
                    setFilter(v as "all" | "pending" | "completed")
                  }
                >
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new task, e.g. “Review graph algorithms”"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAdd();
                    }}
                  />
                  <Button
                    size="icon"
                    className="shrink-0 rounded-xl"
                    onClick={handleAdd}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Tabs value={filter}>
                  <TabsContent value={filter} className="mt-0 space-y-2">
                    {filtered.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        No tasks in this view yet.
                      </p>
                    )}
                    {filtered.map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className="flex w-full items-center gap-3 rounded-2xl border bg-card px-3 py-2 text-left text-sm shadow-sm transition hover:bg-accent"
                      >
                        {task.status === "completed" ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <div
                            className={
                              task.status === "completed"
                                ? "text-xs text-muted-foreground line-through"
                                : "text-xs"
                            }
                          >
                            {task.title}
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span>{task.course}</span>
                            <span>•</span>
                            <span>{task.due}</span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-none bg-muted px-2 py-0.5 text-[10px]"
                        >
                          {task.priority === "high"
                            ? "High"
                            : task.priority === "medium"
                            ? "Medium"
                            : "Low"}
                        </Badge>
                      </button>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Filter className="h-4 w-4 text-indigo-500" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Pending</span>
                  <span className="font-medium text-foreground">
                    {tasks.filter((t) => t.status === "pending").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span className="font-medium text-foreground">
                    {tasks.filter((t) => t.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>High priority today</span>
                  <span className="font-medium text-foreground">
                    {tasks.filter((t) => t.priority === "high").length}
                  </span>
                </div>
                <p className="pt-2 text-[11px]">
                  Tip: Use CampusFlow&apos;s Focus Mode to knock out 2–3 high-priority
                  tasks in one deep work block.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

