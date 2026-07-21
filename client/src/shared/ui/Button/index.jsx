import { cn } from "@/shared/integrations";

function Button({
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

export default Button;
