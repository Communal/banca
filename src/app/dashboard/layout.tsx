import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileHeader } from "@/components/dashboard/MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      {/* Main Content: 
          md:ml-64 pushes content to the right on desktop to make room for fixed sidebar 
      */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        {/* Desktop Header (Hidden on Mobile) */}
        <header className="hidden md:flex justify-between items-center py-6 px-10 bg-white border-b mb-8">
          <h1 className="text-2xl font-bold text-[#343C6A]">Overview</h1>
          <div className="flex items-center gap-4">
            {/* Search Bar & Profile Pic would go here */}
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img src="/avatars/user.jpg" alt="Profile" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-10">
          {/* Mobile "Pill" Header (Visible only on Mobile) */}
          <MobileHeader />

          {children}
        </main>
      </div>
    </div>
  );
}
