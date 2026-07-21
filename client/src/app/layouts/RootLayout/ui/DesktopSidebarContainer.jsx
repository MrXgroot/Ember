import { cn } from "@/shared/integrations/cn";

export function DesktopSidebarContainer({ children, className }) {
  return <aside className={cn("w-72 shrink-0", className)}>{children}</aside>;
}
