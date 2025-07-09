import BreadCrumb from "@/components/common/BreadCrumb";
import { CustomSelect } from "@/components/common/CustomSelect";
import { Input } from "@/components/common/Input";
import PhotoUpload from "@/components/common/PhotoUpload";
import { Button } from "@/components/ui/button";
import { DockIcon, DollarSign, Map, X } from "lucide-react";
import React, { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define validation schema with Zod
const sellerSchema = z.object({
  media: z.instanceof(FileList).optional(),
  brandTitle: z.string().min(1, "Brand title is required"),
  productCategories: z
    .array(z.string())
    .nonempty("At least one category is required"),
  brandLink: z.string().min(1, "Brand title is required"),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  yearlyRevenue: z.string().min(1, "Yearly revenue is required"),
  itemsStock: z.string().min(1, "Items stock is required"),
  productSells: z.string().min(1, "Product sells is required"),
});

type SellerFormData = z.infer<typeof sellerSchema>;

const AddNewSellerPage = () => {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      brandTitle: "",
      productCategories: [],
      brandLink: "",
      location: "",
      email: "",
      phoneNumber: "",
      yearlyRevenue: "",
      itemsStock: "",
      productSells: "",
    },
  });

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
    { value: "option6", label: "Option 6" },
  ];

  const handleUpload = (files: File | File[]) => {
    if (files instanceof FileList) {
      setValue("media", files);
    } else if (Array.isArray(files)) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));
      setValue("media", dataTransfer.files);
    }
  };

  const handleCancel = () => {
    // Reset all form values to their defaults
    reset();
    // Clear the selected frameworks state
    setSelectedFrameworks([]);
    // If you need to clear file uploads specifically, you might need additional logic
    // For example, if using a ref to the file input, you could clear it here
  };

  const onSubmit: SubmitHandler<SellerFormData> = async (data) => {
    try {
      console.log("Form data:", data);
      // Prepare form data for API submission
      const formData = new FormData();

      // Append all fields to formData
      Object.entries(data).forEach(([key, value]) => {
        if (key === "media" && value) {
          Array.from(value as FileList).forEach((file) => {
            formData.append("media", file);
          });
        } else if (key === "productCategories") {
          (value as string[]).forEach((category) => {
            formData.append("categories", category);
          });
        } else {
          formData.append(key, value as string);
        }
      });

      // Example API call
      // const response = await fetch('/api/sellers', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const result = await response.json();
      // console.log('API response:', result);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 sm:p-6">
      {/* HEADER SECTION */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Seller Details</h1>
          </div>
          <BreadCrumb />
        </div>
        <div className="flex gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            onClick={handleCancel}
            type="button" // Important to prevent form submission
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Cancel</span>
          </Button>

          <Button
            variant="default"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            type="submit"
          >
            <DockIcon className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">
              {isSubmitting ? "Saving..." : "Save"}
            </span>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* IMAGE UPLOAD SECTION */}
        <PhotoUpload
          title="Media"
          maxSize={2}
          buttonText="Add image"
          onUpload={handleUpload}
          className="my-uploader"
          preview
          multiple
          accept="image/*"
          error={errors.media?.message}
          // If your PhotoUpload component supports a reset functionality, you can pass a key
          // that changes when the form is reset to force a re-render
          key={`uploader-${watch("media")?.length || 0}`}
        />

        {/* SELLER INFORMATION */}
        <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-[8px] upload-shadow flex flex-col gap-4 sm:gap-[14px]">
          <p className="text-black-800 text-lg font-medium">
            Seller Information
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 sm:gap-[14px]">
            <div className="w-full">
              <Controller
                name="brandTitle"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Brand Title"
                    placeholder="Type brand title here.."
                    error={errors.brandTitle?.message}
                    required
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="productCategories"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label="Product Categories"
                    options={options}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedFrameworks(value);
                    }}
                    defaultValue={field.value}
                    placeholder="Choose a categories"
                    variant="inverted"
                    maxCount={2}
                    // single
                    error={errors.productCategories?.message}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="brandLink"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Brand link"
                    placeholder="www.****"
                    error={errors.brandLink?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 sm:gap-[14px]">
            <div className="w-full">
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Location"
                    placeholder="Add address"
                    leftIcon={<Map className="h-4 w-4" />}
                    error={errors.location?.message}
                    required
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    placeholder="Add email..."
                    error={errors.email?.message}
                    required
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Phone Number"
                    placeholder="Type phone number here..."
                    error={errors.phoneNumber?.message}
                    required
                  />
                )}
              />
            </div>
          </div>
          <div className="w-full">
            <Controller
              name="yearlyRevenue"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Yearly Revenue"
                  placeholder="Type your yearly revenue"
                  leftIcon={<DollarSign className="h-4 w-4" />}
                  error={errors.yearlyRevenue?.message}
                  required
                />
              )}
            />
          </div>
        </div>

        {/* SELLER PRODUCT INFORMATION */}
        <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-[8px] upload-shadow flex flex-col gap-4 sm:gap-[14px]">
          <p className="text-black-800 text-lg font-medium">
            Seller Product Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 sm:gap-[14px]">
            <div className="w-full">
              <Controller
                name="itemsStock"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Items Stock"
                    placeholder="000"
                    error={errors.itemsStock?.message}
                    required
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="productSells"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Product Sells"
                    placeholder="000"
                    error={errors.productSells?.message}
                    required
                  />
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewSellerPage;
