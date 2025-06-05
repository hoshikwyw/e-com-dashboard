import { FilterButton } from "@/components/common/FilterButton";
import { Input } from "@/components/common/Input";
import { SearchInput } from "@/components/common/SearchInput";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FilterGroup from "@/components/common/FilterGroup";

const Dashboard = () => {
  // FilterButton state
  const [appliedStatusFilter, setAppliedStatusFilter] = React.useState("all");
  const [appliedSearchQuery, setAppliedSearchQuery] = React.useState("");
  const [draftStatusFilter, setDraftStatusFilter] = React.useState("all");
  const [draftSearchQuery, setDraftSearchQuery] = React.useState("");

  // FilterGroup state
  const [appliedFilters, setAppliedFilters] = React.useState({
    status: "all",
    category: "",
    dateRange: "",
  });
  const [draftFilters, setDraftFilters] = React.useState({
    status: "all",
    category: "",
    dateRange: "",
  });

  const hasActiveFilters =
    appliedStatusFilter !== "all" ||
    !!appliedSearchQuery ||
    Object.values(appliedFilters).some((val) => val !== "" && val !== "all");

  const handleApplyFilters = () => {
    setAppliedStatusFilter(draftStatusFilter);
    setAppliedSearchQuery(draftSearchQuery);
    setAppliedFilters(draftFilters);
  };

  const handleCancelFilters = () => {
    setDraftStatusFilter(appliedStatusFilter);
    setDraftSearchQuery(appliedSearchQuery);
    setDraftFilters(appliedFilters);
  };

  const handleResetFilters = () => {
    setDraftStatusFilter("all");
    setDraftSearchQuery("");
    setDraftFilters({
      status: "all",
      category: "",
      dateRange: "",
    });
  };

  const handleFilterGroupChange = (id: string, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [id]: value }));
  };

  const selectedCount = [
    appliedStatusFilter !== "all",
    !!appliedSearchQuery,
    ...Object.values(appliedFilters).filter(
      (val) => val !== "" && val !== "all"
    ),
  ].filter(Boolean).length;

  const filterOptions = [
    {
      id: "status",
      label: "Status",
      options: [
        { value: "all", label: "All Statuses" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      id: "category",
      label: "Category",
      options: [
        { value: "all", label: "All Categories" },
        { value: "tech", label: "Technology" },
        { value: "design", label: "Design" },
      ],
    },
  ];

  return (
    <div className=" flex flex-col gap-5">
      {/* BADGES  */}
      <div className="flex gap-2">
        {/* orange  */}
        <Badge variant="secondary">Low Stock</Badge>
        <Badge variant="secondary">Processing</Badge>
        <Badge variant="secondary">Inactive</Badge>
        <Badge variant="secondary">Pending</Badge>

        {/* green */}
        <Badge variant="success">Published</Badge>
        <Badge variant="success">Delivered</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="success">Completed</Badge>
        <Badge variant="success">Paid</Badge>

        {/* blue */}
        <Badge variant="info">Shipped</Badge>
        <Badge variant="info">Partial</Badge>

        {/* red */}
        <Badge variant="primary">Cancelled</Badge>
        <Badge variant="primary">Blocked</Badge>
        <Badge variant="primary">Draft</Badge>
        <Badge variant="primary">Out Of Stock</Badge>
        <Badge variant="primary">Expired</Badge>
        <Badge variant="primary">Failed</Badge>

        {/* gray  */}
        <Badge variant="default">Pending</Badge>
        <Badge variant="default">Draft</Badge>
      </div>

      {/* BUTTONS  */}
      <div className=" flex flex-col gap-5">
        <div className=" flex gap-5">
          <Button variant={"default"} disabled>
            Default disable
          </Button>
          <Button variant={"default"}>Default</Button>
          <Button variant={"default"}>
            {" "}
            <Plus /> Default
          </Button>
        </div>
        <div className=" flex gap-5">
          <Button variant={"outline"} disabled>
            Outline Disable
          </Button>
          <Button variant={"outline"}>Outline</Button>
          <Button variant={"outline"}>
            <Plus />
            Outline
          </Button>
        </div>
        <div className=" flex gap-5">
          <Button variant={"secondary"} disabled>
            secondary Disable
          </Button>
          <Button variant={"secondary"}>Secondary</Button>
          <Button variant={"secondary"}>
            <Plus />
            Secondary
          </Button>
        </div>
        <div className=" flex gap-5">
          <Button variant={"ghost"}>Ghost</Button>
          <Button variant={"link"}>Link</Button>
        </div>
      </div>

      {/* INPUTS  */}
      <div className=" flex gap-5 w-full">
        <Input />
        <SearchInput />
      </div>

      {/* FILTERS BUTTON  */}
      <div className="">
        <FilterButton
          selectedCount={selectedCount}
          popoverClassName="w-80"
          isActive={hasActiveFilters}
          onApply={handleApplyFilters}
          onCancel={handleCancelFilters}
          onReset={handleResetFilters}
        >
          <div className="space-y-4">
            <Input
              placeholder="Search users..."
              value={draftSearchQuery}
              onChange={(e) => setDraftSearchQuery(e.target.value)}
            />

            <RadioGroup
              value={draftStatusFilter}
              onValueChange={setDraftStatusFilter}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="status-all" />
                <Label htmlFor="status-all">All Users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="status-active" />
                <Label htmlFor="status-active">Active Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inactive" id="status-inactive" />
                <Label htmlFor="status-inactive">Inactive Only</Label>
              </div>
            </RadioGroup>

            <FilterGroup
              filters={filterOptions}
              selectedValues={draftFilters}
              onFilterChange={handleFilterGroupChange}
              align="start"
            />
          </div>
        </FilterButton>
      </div>

      {/* FILTER GROUP  */}
    </div>
  );
};

export default Dashboard;
