import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./Input";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  isLoading?: boolean;
  debounce?: number;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { className, onSearch, isLoading = false, debounce = 300, ...props },
    ref
  ) => {
    const [searchValue, setSearchValue] = React.useState("");
    const timerRef = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
      if (onSearch) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          onSearch(searchValue);
        }, debounce);
      }
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [searchValue, debounce, onSearch]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearch) {
        onSearch(searchValue);
      }
    };

    return (
      <div className="relative w-full max-w-md">
        <Input
          type="search"
          placeholder="Search..."
          leftIcon={<Search className="h-4 w-4" />}
          value={searchValue}
          onChange={(e: any) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn("pr-5", className)}
          ref={ref}
          {...props}
        />
        {/* {isLoading && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          </div>
        )} */}
        {/* <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-2"
          onClick={() => onSearch?.(searchValue)}
          disabled={isLoading}
        >
          Search
        </Button> */}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
