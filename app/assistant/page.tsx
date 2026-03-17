"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const suggestedPrompts = [
  "Plan my study schedule for this week",
  "Show upcoming assignments for my courses",
  "Summarize my notes for Data Structures",
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! I’m your CampusFlow AI. I can help you plan study sessions, prioritize tasks, and break down complex topics. What would you like to work on today?",
  },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  function handleSend(message?: string) {
    const text = message ?? input.trim();
    if (!text) return;

    const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1;
    const updated: Message[] = [
      ...messages,
      { id: nextId, role: "user", content: text },
      {
        id: nextId + 1,
        role: "assistant",
        content:
          "Here’s a mock AI response. In a real app, this would come from your backend or an LLM API. For now, imagine I’ve generated a structured plan tailored to your current classes and deadlines.",
      },
    ];
    setMessages(updated);
    setInput("");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:to-slate-900 lg:pl-64">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-4 pb-8 pt-4 lg:px-8">
          <div className="mb-4 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Chat with CampusFlow AI to plan, prioritize, and stay on track.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1.2fr)]">
            <Card className="flex min-h-[480px] flex-col shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Chat</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    This is a frontend-only mock chat. Messages don&apos;t persist.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="flex-1 space-y-3 overflow-y-auto rounded-xl bg-muted/40 px-3 py-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={
                        message.role === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div
                        className={
                          message.role === "user"
                            ? "max-w-[80%] rounded-2xl bg-indigo-600 px-3 py-2 text-xs text-indigo-50 shadow-sm"
                            : "max-w-[80%] rounded-2xl bg-card px-3 py-2 text-xs text-foreground shadow-sm"
                        }
                      >
                        {message.role === "assistant" && (
                          <div className="mb-1 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                            <Sparkles className="h-3 w-3 text-indigo-500" />
                            CampusFlow AI
                          </div>
                        )}
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 rounded-2xl border bg-background/80 p-3">
                  <Textarea
                    placeholder="Ask CampusFlow anything about your schedule, tasks, or study plan..."
                    rows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] text-muted-foreground">
                      CampusFlow may generate inaccurate information. For demo only.
                    </p>
                    <Button
                      size="sm"
                      className="rounded-full px-4"
                      onClick={() => handleSend()}
                    >
                      <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <MessageCircle className="h-4 w-4 text-indigo-500" />
                    Suggested prompts
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      className="justify-start rounded-2xl border-dashed text-xs"
                      onClick={() => handleSend(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

