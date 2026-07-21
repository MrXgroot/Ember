import { cn } from "@/shared/integrations";

function Avatar({ src, alt, className }) {
  return <img src={src} alt={alt} className={cn("", className)} />;
}

export default Avatar;
