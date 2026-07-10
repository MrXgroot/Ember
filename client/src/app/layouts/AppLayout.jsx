import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    // 1. Full viewport wrapper with a flexible column layout
    <div class="flex h-screen w-screen flex-col overflow-hidden bg-slate-50 text-slate-900">
      {/* 2. Top Navigation Bar */}
      <header class="h-16 border-b border-slate-200 bg-white px-6 flex items-center shrink-0 z-10">
        <Navbar />
      </header>

      {/* 3. Main Workspace Wrapper */}
      <div class="flex flex-1 overflow-hidden">
        {/* 4. Left Sidebar */}
        <aside class="w-64 border-r border-slate-200 bg-white overflow-y-auto shrink-0 hidden md:block">
          <Sidebar />
        </aside>

        {/* 5. Scrollable Content Area */}
        <main class="flex-1 overflow-y-auto p-6 md:p-8">
          <div class="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
