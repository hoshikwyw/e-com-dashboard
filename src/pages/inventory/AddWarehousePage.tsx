import BreadCrumb from "@/components/common/BreadCrumb";
import { CustomSelect } from "@/components/common/CustomSelect";
import { CustomTextArea } from "@/components/common/CustomTextArea";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { DockIcon, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const AddWarehousePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<any>({
    // resolver: zodResolver(sellerSchema),
    defaultValues: {
      location: "",
      manager: [],
      country: "",
      contactNumber: "",
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

  return (
    <div className="w-full h-full px-4 sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Edit Warehouse</h1>
          </div>
          <BreadCrumb />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {}}>
            <X className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Cancel</span>
          </Button>

          <Button
            variant="default"
            onClick={() => {}}
            // disabled={isLoading}
          >
            <DockIcon className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Save</span>
          </Button>
        </div>
      </div>

      {/* FORM SECTION  */}
      <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-lg upload-shadow flex flex-col gap-4">
        <p className="text-black-800 text-lg font-medium">
          General Information
        </p>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="Country"
              options={options}
              onValueChange={(value) => {
                field.onChange(value);
              }}
              defaultValue={field.value}
              placeholder="Choose a categories"
              variant="inverted"
              maxCount={2}
              single
              //   error={errors.productCategories?.message}
            />
          )}
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="location"
              options={options}
              onValueChange={(value) => {
                field.onChange(value);
              }}
              defaultValue={field.value}
              placeholder="Choose a categories"
              variant="inverted"
              maxCount={2}
              single
              //   error={errors.productCategories?.message}
            />
          )}
        />
        <Controller
          name="manager"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="Manager"
              options={options}
              onValueChange={(value) => {
                field.onChange(value);
              }}
              defaultValue={field.value}
              placeholder="Choose a categories"
              variant="inverted"
              maxCount={2}
              single
              //   error={errors.productCategories?.message}
            />
          )}
        />
        <Controller
          name="contactNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="contactNumber"
              placeholder="www.****"
              // error={errors.brandLink?.message}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AddWarehousePage;
