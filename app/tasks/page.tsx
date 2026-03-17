"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  completed: boolean;
  course?: string;
  due?: string;
  priority?: "low" | "medium" | "high";
};

type FilterMode = "all" | "pending" | "completed";

const API_BASE = "http://127.0.0.1:8000/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) =>
      filter === "completed" ? task.completed : !task.completed,
    );
  }, [tasks, filter]);

  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/tasks/`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Tasks fetch failed (${res.status})`);
      const data = (await res.json()) as unknown;
      if (!Array.isArray(data)) throw new Error("Invalid tasks response");
      setTasks(data as Task[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  async function handleAdd() {
    const title = newTask.trim();
    if (!title) return;
    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch(`${API_BASE}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error(`Create failed (${res.status})`);
      setNewTask("");
      await fetchTasks();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add task");
    } finally {
      setSubmitting(false);
    }
  }

  async function markComplete(id: number) {
    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch(`${API_BASE}/tasks/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);
      await fetchTasks();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update task");
    } finally {
      setSubmitting(false);
    }
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
                    setFilter(v as FilterMode)
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
                      if (e.key === "Enter") void handleAdd();
                    }}
                    disabled={submitting}
                  />
                  <Button
                    size="icon"
                    className="shrink-0 rounded-xl"
                    onClick={() => void handleAdd()}
                    disabled={submitting}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {error && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                    {error}
                  </div>
                )}

                <Tabs value={filter}>
                  <TabsContent value={filter} className="mt-0 space-y-2">
                    {loading && (
                      <p className="text-xs text-muted-foreground">Loading tasks…</p>
                    )}
                    {!loading && filtered.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        No tasks in this view yet.
                      </p>
                    )}
                    {!loading &&
                      filtered.map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => {
                          if (!task.completed) void markComplete(task.id);
                        }}
                        className="flex w-full items-center gap-3 rounded-2xl border bg-card px-3 py-2 text-left text-sm shadow-sm transition hover:bg-accent"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <div
                            className={
                              task.completed
                                ? "text-xs text-muted-foreground line-through"
                                : "text-xs"
                            }
                          >
                            {task.title}
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span>{task.course ?? "General"}</span>
                            {task.due ? (
                              <>
                                <span>•</span>
                                <span>{task.due}</span>
                              </>
                            ) : null}
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
                    {tasks.filter((t) => !t.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span className="font-medium text-foreground">
                    {tasks.filter((t) => t.completed).length}
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

