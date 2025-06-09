import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconSize?: number;
  iconColor?: string;
  className?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      iconSize = 16,
      iconColor = "rgba(183, 24, 24, 1)",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          border-[4px] border-primary-50 bg-primary-100 
          rounded-full w-[44px] h-[44px] 
          flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-primary-200
          ${className}
        `}
        {...props}
      >
        <Icon size={iconSize} color={iconColor} />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
