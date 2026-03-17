"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RefreshCcw, Timer } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const INITIAL_MINUTES = 25;

export default function FocusPage() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_MINUTES * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const minutes = useMemo(() => Math.floor(secondsLeft / 60), [secondsLeft]);
  const seconds = useMemo(() => secondsLeft % 60, [secondsLeft]);

  function reset() {
    setSecondsLeft(INITIAL_MINUTES * 60);
    setRunning(false);
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:to-slate-900 lg:pl-64">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-4 pb-8 pt-4 lg:px-8">
          <div className="mb-4 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">Focus Mode</h1>
            <p className="text-sm text-muted-foreground">
              Run distraction-free study sessions with a simple timer.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1.2fr)]">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Timer className="h-4 w-4 text-indigo-500" />
                  Study timer
                </CardTitle>
                <Badge variant="outline" className="text-[11px]">
                  {INITIAL_MINUTES} min session
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6 pb-8 pt-2">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-sky-500 text-white shadow-lg">
                  <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-background/95 text-4xl font-semibold text-foreground">
                    {minutes.toString().padStart(2, "0")}:
                    {seconds.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="lg"
                    className="rounded-full px-6"
                    onClick={() => setRunning((prev) => !prev)}
                  >
                    {running ? (
                      <>
                        <Pause className="mr-1.5 h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-1.5 h-4 w-4" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    onClick={reset}
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Focus tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Avoid distractions</li>
                  <li>Use Pomodoro technique</li>
                  <li>Take short breaks</li>
                </ul>
                <p className="pt-1 text-[11px]">
                  Tip: Put your phone on Do Not Disturb and keep only one tab open.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

