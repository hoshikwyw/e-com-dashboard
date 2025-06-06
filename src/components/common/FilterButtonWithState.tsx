// FilterButtonWithState.tsx
import React from "react";
import { FilterButton } from "./FilterButton";
import FilterGroup from "./FilterGroup";

interface FilterState {
  status: string[];
  category: string[];
  searchQuery: string;
  radioFilter: string;
}

interface FilterButtonWithStateProps {
  onFilterChange?: (filters: FilterState) => void;
}

export const FilterButtonWithState: React.FC<FilterButtonWithStateProps> = ({
  onFilterChange,
}) => {
  const [appliedFilters, setAppliedFilters] = React.useState<FilterState>({
    status: ["all"],
    category: [],
    searchQuery: "",
    radioFilter: "all",
  });

  const [draftFilters, setDraftFilters] =
    React.useState<FilterState>(appliedFilters);

  const filterOptions = [
    {
      id: "status",
      label: "Status",
      options: [
        { value: "all", label: "All Statuses" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "inactive", label: "Inactive" },
        { value: "inactive", label: "Inactive" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      id: "category",
      label: "Category",
      options: [
        { value: "tech", label: "Technology" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
        { value: "marketing", label: "Marketing" },
        { value: "marketing", label: "Marketing" },
        { value: "marketing", label: "Marketing" },
        { value: "marketing", label: "Marketing" },
      ],
    },
  ];

  const calculateSelectedCount = (filters: FilterState) => {
    let count = 0;

    // Count status filters (excluding "all")
    if (filters.status.length > 0 && !filters.status.includes("all")) {
      count += filters.status.length;
    }

    // Count category filters
    count += filters.category.length;

    // Count radio filter if not "all"
    if (filters.radioFilter !== "all") {
      count += 1;
    }

    // Count search query if not empty
    if (filters.searchQuery.trim() !== "") {
      count += 1;
    }

    return count;
  };

  const hasActiveFilters = calculateSelectedCount(appliedFilters) > 0;
  const selectedCount = calculateSelectedCount(draftFilters);

  const handleApplyFilters = () => {
    const newFilters = {
      ...draftFilters,
      status:
        draftFilters.status.includes("all") && draftFilters.status.length > 1
          ? draftFilters.status.filter((val) => val !== "all")
          : draftFilters.status,
    };

    setAppliedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleCancelFilters = () => {
    setDraftFilters({ ...appliedFilters });
  };

  const handleResetFilters = () => {
    setDraftFilters({
      status: ["all"],
      category: [],
      searchQuery: "",
      radioFilter: "all",
    });
  };

  const handleFilterChange =
    (filterType: keyof FilterState) => (value: string) => {
      setDraftFilters((prev) => {
        const currentValues = [...prev[filterType]];

        if (value === "all") {
          return { ...prev, [filterType]: ["all"] };
        }

        const newValues = currentValues.includes("all")
          ? currentValues.filter((v) => v !== "all")
          : [...currentValues];

        if (newValues.includes(value)) {
          return {
            ...prev,
            [filterType]: newValues.filter((v) => v !== value),
          };
        } else {
          return {
            ...prev,
            [filterType]: [...newValues, value],
          };
        }
      });
    };

  return (
    <FilterButton
      selectedCount={selectedCount}
      popoverClassName="w-80"
      isActive={hasActiveFilters}
      onApply={handleApplyFilters}
      onCancel={handleCancelFilters}
      onReset={handleResetFilters}
    >
      <div className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar">
        {filterOptions.map((group) => (
          <FilterGroup
            key={group.id}
            label={group.label}
            options={group.options}
            selectedValues={
              draftFilters[group.id as keyof FilterState] as string[]
            }
            onChange={handleFilterChange(group.id as keyof FilterState)}
          />
        ))}
      </div>
    </FilterButton>
  );
};
