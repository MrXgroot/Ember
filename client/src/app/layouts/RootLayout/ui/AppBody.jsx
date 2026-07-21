import { cn } from "@/shared/integrations/cn";

export function AppBody({ children, className }) {
  return (
    <div className={cn("flex flex-1 overflow-hidden", className)}>
      {children}
    </div>
  );
}
