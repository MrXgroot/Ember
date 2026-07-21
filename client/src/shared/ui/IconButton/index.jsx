import { cn } from "@/shared/integrations";

function IconButton({
  children,
  className,
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn("", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
