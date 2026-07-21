import { cn } from "@/shared/integrations";

function Input({ className, ...props }) {
  return <input className={cn("", className)} {...props} />;
}

export default Input;
