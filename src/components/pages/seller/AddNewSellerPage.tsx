import BreadCrumb from "@/components/common/BreadCrumb";
import { CustomSelect } from "@/components/common/CustomSelect";
import { Input } from "@/components/common/Input";
import PhotoUpload from "@/components/common/PhotoUpload";
import { Button } from "@/components/ui/button";
import { DockIcon, DollarSign, Map, X } from "lucide-react";
import React, { useState } from "react";

const AddNewSellerPage = () => {
  const handleUpload = (files: File | File[]) => {
    console.log("Uploaded files:", files);
    // Your upload logic here
  };

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
    { value: "option6", label: "Option 6" },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* HEADER SECTION  */}
      <div className="w-full flex items-end justify-between">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="pageTitle">Seller Details</h1>
          </div>
          <BreadCrumb />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {}}>
            <X className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Cancel</span>
          </Button>

          <Button variant="default" onClick={() => {}}>
            <DockIcon className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Save</span>
          </Button>
        </div>
      </div>

      {/* IMAGE UPLOAD SECTION  */}
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

      {/* SELLER INFORMATION  */}
      <div className=" w-full bg-background p-6 border border-gray-100 rounded-[8px] upload-shadow flex flex-col gap-[14px]">
        <p className=" text-black-800 text-lg">Seller Information</p>
        <div className=" grid grid-cols-3 items-center gap-[14px]">
          <div className=" col-span-1">
            <Input label="Brand Title" placeholder="Type brand title here.." />
          </div>
          <div className=" col-span-1 ">
            <CustomSelect
              label="Product Categories"
              options={options}
              onValueChange={setSelectedFrameworks}
              defaultValue={selectedFrameworks}
              placeholder="Choose a categories"
              variant="inverted"
              // animation={2}
              maxCount={2}
            />
          </div>
          <div className=" col-span-1">
            <Input label="Brand link" placeholder="www.****" />
          </div>
        </div>
        <div className=" grid grid-cols-3 items-center gap-[14px]">
          <div className=" col-span-1">
            <Input
              label="Location"
              placeholder="Add address"
              leftIcon={<Map className="h-4 w-4" />}
            />
          </div>
          <div className=" col-span-1">
            <Input label="Email" placeholder="Add email..." />
          </div>
          <div className=" col-span-1">
            <Input
              label="Phone Number"
              placeholder="Type phone number here..."
            />
          </div>
        </div>
        <div className=" col-span-3">
          <Input
            label="Yearly Revenue"
            placeholder="Type your yearly revenue"
            leftIcon={<DollarSign className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* SELLER PRODUCT INFORMATION  */}
      <div className=" w-full bg-background p-6 border border-gray-100 rounded-[8px] upload-shadow flex flex-col gap-[14px]">
        <p className=" text-black-800 text-lg">Seller Product Information</p>
        <div className=" grid grid-cols-2 items-center gap-[14px]">
          <div className=" col-span-1">
            <Input label="Items Stock" placeholder="000" />
          </div>

          <div className=" col-span-1">
            <Input label="Product Sells" placeholder="000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewSellerPage;
