import { cn } from "@/shared/integrations";

function Badge({ children, className }) {
  return <span className={cn("", className)}>{children}</span>;
}

export default Badge;
