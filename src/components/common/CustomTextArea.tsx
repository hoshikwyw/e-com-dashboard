import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  disabled?: boolean;
}

const CustomTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      disabled,
      ...props
    },
    ref
  ) => {
    const textareaClass = cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-gray-25 px-3 py-2 text-sm placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 outline-none",
      disabled && "bg-gray-100",
      className
    );

    return (
      <div className="grid w-full items-center gap-1.5">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "text-sm text-black-600 leading-none",
              disabled && "text-muted-foreground"
            )}
          >
            {label}
          </label>
        )}
        <textarea
          className={textareaClass}
          ref={ref}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);

CustomTextArea.displayName = "CustomTextArea";

export { CustomTextArea };