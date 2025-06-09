import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils"; // or your classnames utility

export type BreadCrumbItem = {
  label: string;
  path?: string;
};

type BreadCrumbProps = {
  items: BreadCrumbItem[];
  separator?: React.ReactNode;
  className?: string;
};

const BreadCrumb = ({
  items,
  separator = <ChevronRight className="w-4 h-4 mx-2" />,
  className,
}: BreadCrumbProps) => {
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
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadCrumb;
