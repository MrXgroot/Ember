import React from "react";
import { Home, Compass, BarChart2, Users } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export const NavigationItem = ({
  href,
  icon: Icon,
  children,
  isActive,
  className,
}) => {
  return (
    <a
      href={href}
      className={cn(
        "group flex items-center gap-3 px-3 py-2 rounded-app-md text-sm font-medium transition-all duration-150",
        "text-content-secondary hover:text-content-primary hover:bg-app-bg",
        isActive && "bg-brand-light text-brand-hover font-semibold",
        className,
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "w-5 h-5 transition-colors duration-150",
            "text-content-muted group-hover:text-content-primary",
            isActive && "text-brand-primary group-hover:text-brand-hover",
          )}
        />
      )}

      <span>{children}</span>
    </a>
  );
};

export const NavigationList = ({ className }) => {
  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: true,
    },
    {
      label: "Popular",
      href: "/popular",
      icon: Compass,
    },
    {
      label: "All",
      href: "/all",
      icon: BarChart2,
    },
    {
      label: "Explore Users",
      href: "/explore/users",
      icon: Users,
    },
  ];

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {navItems.map((item) => (
        <NavigationItem
          key={item.label}
          href={item.href}
          icon={item.icon}
          isActive={item.isActive}
        >
          {item.label}
        </NavigationItem>
      ))}
    </nav>
  );
};
