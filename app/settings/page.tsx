"use client";

import { useTheme } from "next-themes";
import { Mail, MoonStar, Phone, User, CalendarPlus } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:to-slate-900 lg:pl-64">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-4 pb-8 pt-4 lg:px-8">
          <div className="mb-4 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your profile, integrations, and notification preferences.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,1.1fr)]">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-indigo-500" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Full name
                    </label>
                    <Input defaultValue="Surendra" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Program
                    </label>
                    <Input defaultValue="B.Tech · Computer Science" />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Email
                    </label>
                    <Input defaultValue="you@example.com" type="email" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      University
                    </label>
                    <Input defaultValue="Your University" />
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  This is static demo data. Saving is not wired to any backend.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <CalendarPlus className="h-4 w-4 text-indigo-500" />
                    Google Calendar
                  </CardTitle>
                  <Badge variant="outline" className="text-[11px]">
                    UI only
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <p>
                    Connect your Google Calendar so CampusFlow can sync your classes,
                    exams, and events automatically.
                  </p>
                  <Button className="w-full rounded-full text-xs" variant="outline">
                    <Mail className="mr-1.5 h-3.5 w-3.5" />
                    Connect Google Calendar
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-medium text-foreground">
                        WhatsApp reminders
                      </div>
                      <div className="mt-0.5 text-[11px]">
                        Get a ping for upcoming classes & deadlines.
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div>
                      <div className="text-xs font-medium text-foreground">
                        Email weekly digest
                      </div>
                      <div className="mt-0.5 text-[11px]">
                        Summary of focus time, tasks, and streaks.
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <MoonStar className="h-4 w-4 text-indigo-500" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <div>
                    <div className="text-xs font-medium text-foreground">
                      Dark mode
                    </div>
                    <div className="mt-0.5 text-[11px]">
                      Switch between light and dark themes.
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) =>
                        setTheme(checked ? "dark" : "light")
                      }
                    />
                    <span className="text-[11px] capitalize">
                      {theme === "dark" ? "Dark" : "Light"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

