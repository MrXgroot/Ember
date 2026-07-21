import { cn } from "@/shared/integrations";

function Textarea({ className, ...props }) {
  return <textarea className={cn("", className)} {...props} />;
}

export default Textarea;
