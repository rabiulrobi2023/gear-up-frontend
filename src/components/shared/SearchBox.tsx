import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface ISearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
  placeHolder?: string;
  className?: string;
}

const SearchBox = ({
  value,
  onChange,
  delay = 500,
  placeHolder = "Search...",
  className,
}: ISearchBoxProps) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(search);
    }, delay);
    return () => clearTimeout(timer);
  }, [search, delay, onChange]);


  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeHolder}
        className="pl-10"
      />
      {search && (
        <Button
          onClick={() => setSearch("")}
          aria-label="Clear search"
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1"
        >
          <X />
        </Button>
      )}
    </div>
  );
};

export default SearchBox;
