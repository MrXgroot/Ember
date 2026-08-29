import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, BarChart2, Users } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export const NavigationItem = ({
  to,
  icon: Icon,
  children,
  className,
  end,
}) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 px-3 py-2 rounded-app-md text-sm font-medium transition-all duration-150",
          "text-content-secondary hover:text-content-primary hover:bg-app-surface",
          isActive && "bg-brand-light text-brand-hover font-semibold",
          className,
        )
      }
    >
      {({ isActive }) => (
        <>
          {Icon && (
            <Icon
              className={cn(
                "w-5 h-5 transition-colors duration-150 shrink-0",
                "text-content-muted group-hover:text-content-primary",
                isActive && "text-brand-primary group-hover:text-brand-hover",
              )}
            />
          )}
          <span className="truncate">{children}</span>
        </>
      )}
    </NavLink>
  );
};

export const NavigationList = ({ className }) => {
  const navItems = [
    { label: "Home", to: "/", icon: Home, end: true },
    { label: "Popular", to: "/popular", icon: Compass },
    { label: "All", to: "/all", icon: BarChart2 },
    { label: "Explore Users", to: "/explore/users", icon: Users },
  ];

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {navItems.map((item) => (
        <NavigationItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          end={item.end}
        >
          {item.label}
        </NavigationItem>
      ))}
    </nav>
  );
};
