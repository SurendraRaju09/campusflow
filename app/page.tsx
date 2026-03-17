import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import DashboardPage from "@/app/dashboard/page";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:to-slate-900">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <TopNav />
        <main className="flex-1 px-4 pb-8 pt-4 lg:px-8">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}

