"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock3 } from "lucide-react";
import { addDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Event = {
  date: Date;
  title: string;
  type: "class" | "lab" | "study";
  time: string;
  location: string;
};

const today = new Date();

const events: Event[] = [
  {
    date: today,
    title: "Data Structures class",
    type: "class",
    time: "09:00 – 10:30",
    location: "Block A - 203",
  },
  {
    date: today,
    title: "AI Lab",
    type: "lab",
    time: "11:00 – 12:30",
    location: "Innovation Lab",
  },
  {
    date: addDays(today, 1),
    title: "Study session: Dynamic Programming",
    type: "study",
    time: "18:00 – 20:00",
    location: "Library",
  },
];

export default function CalendarPage() {
  const [selected, setSelected] = useState<Date | undefined>(today);

  const selectedEvents = events.filter(
    (e) => selected && e.date.toDateString() === selected.toDateString(),
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:to-slate-900 lg:pl-64">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-4 pb-8 pt-4 lg:px-8">
          <div className="mb-4 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
            <p className="text-sm text-muted-foreground">
              View your classes, labs, and study sessions in one place.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)]">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-indigo-500" />
                  Monthly view
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  showOutsideDays
                  modifiers={{
                    hasEvents: events.map((e) => e.date),
                  }}
                  modifiersClassNames={{
                    hasEvents: "relative has-event",
                  }}
                  className="rounded-2xl bg-card p-2 text-xs [--rdp-accent-color:theme(colors.indigo.500)]"
                />
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle>Schedule</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Events for{" "}
                    {selected?.toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                    .
                  </p>
                </div>
                <Badge variant="outline" className="text-[11px]">
                  {selectedEvents.length} event
                  {selectedEvents.length === 1 ? "" : "s"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedEvents.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    No events on this day. Great time for a deep focus session!
                  </p>
                )}
                {selectedEvents.map((event, index) => (
                  <div
                    key={`${event.title}-${index}`}
                    className="flex items-start gap-3 rounded-2xl border bg-card px-3 py-2 text-sm shadow-sm"
                  >
                    <Clock3 className="mt-0.5 h-4 w-4 text-indigo-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">{event.title}</span>
                        <Badge
                          variant="outline"
                          className="border-none bg-muted px-2 py-0.5 text-[10px]"
                        >
                          {event.type === "class"
                            ? "Class"
                            : event.type === "lab"
                            ? "Lab"
                            : "Study"}
                        </Badge>
                      </div>
                      <div className="mt-1 text-[11px] text-muted-foreground">
                        {event.time} • {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

