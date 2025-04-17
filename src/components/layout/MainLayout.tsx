
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MainLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(272); // Default width (w-72 = 18rem = 288px - 16px padding)
  const isMobile = useIsMobile();

  useEffect(() => {
    setSidebarWidth(isMobile ? 0 : 272);
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1" style={{ marginLeft: `${sidebarWidth}px` }}>
        <Header sidebarWidth={sidebarWidth} />
        <main className="px-4 pt-20 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
