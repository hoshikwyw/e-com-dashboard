import BreadCrumb from "@/components/common/BreadCrumb";
import { CustomSelect } from "@/components/common/CustomSelect";
import { Input } from "@/components/common/Input";
import PhotoUpload from "@/components/common/PhotoUpload";
import { Button } from "@/components/ui/button";
import { DockIcon, X } from "lucide-react";
import React, { useState } from "react";

const AddNewSellerPage = () => {
  const handleUpload = (files: File | File[]) => {
    console.log("Uploaded files:", files);
    // Your upload logic here
  };

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
    { value: "option6", label: "Option 6" },
  ];

  return (
    <div className="w-full h-full">
      {/* HEADER SECTION  */}
      <div className="w-full flex items-end justify-between mb-6">
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
      <div className=" w-full bg-background p-6 border border-gray-100 rounded-[8px] upload-shadow">
        <p className=" text-black-800 text-lg">Seller Information</p>
        <div className=" grid grid-cols-3">
          <div className=" col-span-1">
            <Input label="Name" placeholder="Enter name" />
          </div>
          <div className=" col-span-1 ">
            <CustomSelect
              label="Select frameworks"
              options={options}
              onValueChange={setSelectedFrameworks}
              defaultValue={selectedFrameworks}
              placeholder="Select frameworks"
              variant="inverted"
              // animation={2}
              maxCount={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewSellerPage;
