import { Outlet } from "react-router-dom";

import { Navbar, Sidebar } from "@/app/navigation";
import { AppBody, Main, DesktopSidebarContainer } from "./ui";
import { cn } from "@/shared/integrations/cn";
import { Drawer } from "@/shared/ui";
import { useDrawer } from "@/shared/ui/Drawer";
import { AnimatePresence } from "framer-motion";
function RootLayout({ className }) {
  const drawer = useDrawer();
  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col overflow-hidden",
        "bg-app-bg text-content-primary",
        className,
      )}
    >
      <Navbar onToggle={drawer.toggle} />

      <AppBody>
        <DesktopSidebarContainer className="hidden xl:block">
          <Sidebar />
        </DesktopSidebarContainer>

        <Main>
          <Outlet />
        </Main>
      </AppBody>

      <AnimatePresence>
        {drawer.isOpen && (
          <Drawer className="block xl:hidden" onClose={drawer.close}>
            <Sidebar className="pt-8" />
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RootLayout;
