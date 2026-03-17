"use client";

import { Bell, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-xl lg:px-8">
      <button
        type="button"
        className="inline-flex items-center rounded-xl border bg-background px-2 py-1 text-sm shadow-sm lg:hidden"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Menu className="mr-1 h-4 w-4" />
        Menu
      </button>
      <div
        className={cn(
          "flex flex-1 items-center gap-3 transition-all",
          expanded ? "absolute left-0 right-0 top-16 z-20 bg-background p-4" : "",
          "lg:static lg:z-auto lg:bg-transparent lg:p-0",
        )}
      >
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span className="text-xs font-medium">
              {theme === "dark" ? "☀" : "🌙"}
            </span>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 rounded-full border bg-background px-2 py-1">
            <Avatar className="h-8 w-8">
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
            <div className="hidden text-xs leading-tight sm:block">
              <div className="font-medium">Surendra</div>
              <div className="text-muted-foreground">Computer Science</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

