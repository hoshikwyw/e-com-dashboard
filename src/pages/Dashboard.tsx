import { Input } from "@/components/common/Input";
import { SearchInput } from "@/components/common/SearchInput";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ComCheckbox } from "@/components/common/ComCheckbox";
import { FilterButtonWithState } from "@/components/common/FilterButtonWithState";
import { DatePicker } from "@/components/common/DatePicker";
import ProfileCard from "@/components/common/ProfileCard";
import PhotoUpload from "@/components/common/PhotoUpload";
import TimeFilterTab, {
  type TimeFilterOption,
} from "@/components/common/TimeFilterTab";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import BreadCrumb from "@/components/common/BreadCrumb";

const Dashboard = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleFilterChange = (filters) => {
    console.log("Current filters:", {
      status: filters.status, // Array of checked statuses
      categories: filters.category, // Array of checked categories
      search: filters.searchQuery, // Search term
      radio: filters.radioFilter, // Radio selection
    });
  };

  const handleUpload = (files: File | File[]) => {
    console.log("Uploaded files:", files);
    // Your upload logic here
  };

  const handleTimeFilterChange = (filter: TimeFilterOption) => {
    console.log("Active tab:", filter);
    // You can use this to filter your data based on the selected time period
  };

  const handleDelete = async () => {
    console.log("Delete button clicked");
  };

  const handleEditSeller = (sellerId: string) => {
    // Your edit logic here
    console.log("Editing seller:", sellerId);
  };

  const handleDeleteSeller = async (sellerId: string) => {
    // Your delete API call here
    console.log("Deleting seller:", sellerId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className=" flex flex-col gap-5 px-4 w-full h-full py-5">
      {/* BREAD CRUMB  */}
      <BreadCrumb
        pathMap={{
          "/products": "Products",
          "/products/electronics": "Electronics",
        }}
      />
      {/* BADGES  */}
      <div className="flex gap-2 flex-wrap">
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
      <div className=" flex flex-col gap-5 flex-wrap">
        <div className=" flex gap-5 flex-wrap">
          <Button variant={"default"} disabled>
            Default disable
          </Button>
          <Button variant={"default"}>Default</Button>
          <Button variant={"default"}>
            {" "}
            <Plus /> Default
          </Button>
        </div>
        <div className=" flex gap-5 flex-wrap">
          <Button variant={"outline"} disabled>
            Outline Disable
          </Button>
          <Button variant={"outline"}>Outline</Button>
          <Button variant={"outline"}>
            <Plus />
            Outline
          </Button>
        </div>
        <div className=" flex gap-5 flex-wrap">
          <Button variant={"secondary"} disabled>
            secondary Disable
          </Button>
          <Button variant={"secondary"}>Secondary</Button>
          <Button variant={"secondary"}>
            <Plus />
            Secondary
          </Button>
        </div>
        <div className=" flex gap-5 flex-wrap">
          <Button variant={"ghost"}>Ghost</Button>
          <Button variant={"link"}>Link</Button>
        </div>
      </div>

      {/* INPUTS  */}
      <div className=" flex gap-5 w-full">
        <Input />
        <SearchInput />
      </div>

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
        onEdit={() => handleEditSeller("123")}
        onDelete={() => handleDeleteSeller("123")}
        itemType="seller"
      />

      {/* IMAGE UPLOAD  */}
      <PhotoUpload
        title="Media"
        maxSize={2}
        buttonText="Add image"
        onUpload={handleUpload}
        className="my-uploader"
        preview
        multiple
        accept="image/*"
      />

      {/* TABS  */}
      <div className=" w-full lg:w-[35%]">
        <TimeFilterTab
          defaultValue="all"
          onTabChange={handleTimeFilterChange}
        />
      </div>

      {/* DELETE CONFIRM MODAL  */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemType="Product"
      />
    </div>
  );
};

export default Dashboard;
