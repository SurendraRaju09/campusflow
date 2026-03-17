"use client";

import { BookOpen, Upload, Wand2 } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Note = {
  id: number;
  title: string;
  course: string;
  uploadedAt: string;
  size: string;
};

const mockNotes: Note[] = [
  {
    id: 1,
    title: "Trees & Graphs – lecture notes",
    course: "Data Structures",
    uploadedAt: "Today · 4:12 PM",
    size: "1.2 MB",
  },
  {
    id: 2,
    title: "Neural Networks – week 3",
    course: "Artificial Intelligence",
    uploadedAt: "Yesterday · 9:43 PM",
    size: "890 KB",
  },
  {
    id: 3,
    title: "Deadlocks & Synchronization",
    course: "Operating Systems",
    uploadedAt: "Mar 10 · 7:20 PM",
    size: "1.8 MB",
  },
];

export default function NotesPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:to-slate-900 lg:pl-64">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-4 pb-8 pt-4 lg:px-8">
          <div className="mb-4 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">Notes</h1>
            <p className="text-sm text-muted-foreground">
              Store your study material and let CampusFlow&apos;s AI help you revise.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,1.1fr)]">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  Uploaded notes
                </CardTitle>
                <Button size="sm" className="rounded-full px-3 text-xs">
                  <Upload className="mr-1.5 h-3.5 w-3.5" />
                  Upload
                </Button>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {mockNotes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border bg-card px-3 py-2 text-xs shadow-sm"
                  >
                    <div>
                      <div className="font-medium">{note.title}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                        <span>{note.course}</span>
                        <span>•</span>
                        <span>{note.uploadedAt}</span>
                        <span>•</span>
                        <span>{note.size}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-none bg-muted px-2 py-0.5 text-[10px]"
                    >
                      PDF
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Wand2 className="h-4 w-4 text-indigo-500" />
                  AI actions (UI only)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <p>
                  Select a note and apply AI actions to accelerate revision. In this
                  demo, these actions are non-functional and purely UI.
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="justify-start rounded-2xl border-dashed text-xs"
                  >
                    Summarize selected note
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start rounded-2xl border-dashed text-xs"
                  >
                    Generate quiz from key concepts
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start rounded-2xl border-dashed text-xs"
                  >
                    Explain difficult sections
                  </Button>
                </div>
                <p className="pt-1 text-[11px]">
                  When wired to a backend, these buttons could trigger AI-powered
                  summarization, quiz generation, and explanation flows.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

