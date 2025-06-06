import { Input } from "@/components/common/Input";
import { SearchInput } from "@/components/common/SearchInput";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ComCheckbox } from "@/components/common/ComCheckbox";
import { FilterButtonWithState } from "@/components/common/FilterButtonWithState";
import { DatePicker } from "@/components/common/DatePicker";
import ProfileCard from "@/components/common/ProfileCard";

const Dashboard = () => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleFilterChange = (filters) => {
    console.log("Current filters:", {
      status: filters.status, // Array of checked statuses
      categories: filters.category, // Array of checked categories
      search: filters.searchQuery, // Search term
      radio: filters.radioFilter, // Radio selection
    });
  };

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
      <div className=""></div>

      {/* CHECKBOX COMPONENT  */}
      <div className=" flex gap-5 items-center">
        <ComCheckbox
          id="terms"
          label="Accept terms and conditions"
          checked={isChecked}
          onChange={(checked) => setIsChecked(checked)}
          // disabled
        />
      </div>

      {/* FILTER BUTTON WITH STATE  */}
      <div className=" w-[20%]">
        <FilterButtonWithState onFilterChange={handleFilterChange} />
      </div>

      {/* DATE PICKER  */}
      <div className=" w-[20%]">
        <DatePicker
          className=" w-[140px]"
          value={new Date()}
          onChange={() => {
            console.log("changed");
          }}
          placeholder="Select date"
        />
      </div>

      {/* PROFILE CARD  */}
      <ProfileCard
        name="Laura Prichet"
        status="Active"
        stock={854}
        sells="+4.5k"
        phone="050 414 8778"
        email="lindablair@mail.com"
        address="1833 Bel Meadow Drive, Fontana, California 92335, USA"
      />
    </div>
  );
};

export default Dashboard;
