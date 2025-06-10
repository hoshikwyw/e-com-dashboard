import React from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export type BreadCrumbItem = {
  label: string;
  path?: string;
};

type BreadCrumbProps = {
  homeItem?: BreadCrumbItem;
  pathMap?: Record<string, string>;
  separator?: React.ReactNode;
  className?: string;
};

const BreadCrumb = ({
  homeItem = { label: "Dashboard", path: "/dashboard" },
  pathMap = {},
  separator = <ChevronRight className="w-4 h-4 mx-2" />,
  className,
}: BreadCrumbProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const items: BreadCrumbItem[] = [
    homeItem,
    ...pathnames.map((path, index) => {
      const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;
      return {
        label: pathMap[fullPath] || path.replace(/-/g, " "),
        path: index === pathnames.length - 1 ? undefined : fullPath,
      };
    }),
  ];

  return (
    <nav
      className={cn(
        "flex items-center text-sm font-medium text-muted-foreground",
        className
      )}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && separator}
          {item.path ? (
            <Link
              to={item.path}
              className={cn(
                "hover:text-primary-700/85 transition-colors",
                // Apply red color to the second-to-last item
                index === items.length - 2 && "text-primary-700",
                // Apply blue color to the last item (but it won't have a path)
                index === items.length - 1 && "text-black-500"
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-black-500">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadCrumb;
