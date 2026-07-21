import { cn } from "@/shared/integrations";

function Card({ children, className }) {
  return <div className={cn("", className)}>{children}</div>;
}

export default Card;
