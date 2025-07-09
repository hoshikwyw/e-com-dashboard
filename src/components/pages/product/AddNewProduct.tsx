import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { ComCheckbox } from "@/components/common/ComCheckbox";
import { Input } from "@/components/common/Input";
import PhotoUpload from "@/components/common/PhotoUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DockIcon, DollarSign, Plus, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/common/BreadCrumb";
import { CustomTextArea } from "@/components/common/CustomTextArea";
import { CustomSelect } from "@/components/common/CustomSelect";
import toast from "react-hot-toast";

export type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  discountType: string;
  discountPercentage: string;
  taxClass: string;
  vatAmount: string;
  sku: string;
  barcode: string;
  quantity: string;
  variations: Array<{
    type: string;
    value: string;
  }>;
  shipping: {
    requiresShipping: boolean;
    weight?: string;
    height?: string;
    length?: string;
    width?: string;
  };
  category: string;
  tags: string[];
  status: string;
  images: File[] | string[];
};

export type ProductFormProps = {
  mode?: "create" | "edit";
  product?: ProductFormValues;
  onCancel?: () => void;
  onSubmit?: SubmitHandler<ProductFormValues>;
  onCreate?: (data: ProductFormValues) => Promise<void>;
  onUpdate?: (data: ProductFormValues) => Promise<void>;
  header?: ReactNode;
  isLoading?: boolean;
};

// Fake data for categories
const categoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home-garden", label: "Home & Garden" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "toys", label: "Toys & Games" },
  { value: "books", label: "Books & Media" },
  { value: "food", label: "Food & Grocery" },
];

// Fake data for tags
const tagOptions = [
  { value: "new-arrival", label: "New Arrival" },
  { value: "best-seller", label: "Best Seller" },
  { value: "sale", label: "Sale" },
  { value: "limited-edition", label: "Limited Edition" },
  { value: "eco-friendly", label: "Eco Friendly" },
  { value: "premium", label: "Premium" },
  { value: "gift-idea", label: "Gift Idea" },
  { value: "trending", label: "Trending" },
];

// Fake data for status
const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "archived", label: "Archived" },
];

// Fake data for discount types
const discountTypeOptions = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
  { value: "none", label: "No Discount" },
];

// Fake data for tax classes
const taxClassOptions = [
  { value: "standard", label: "Standard Rate" },
  { value: "reduced", label: "Reduced Rate" },
  { value: "zero", label: "Zero Rate" },
  { value: "exempt", label: "Exempt" },
];

// Fake data for variation types
const variationTypeOptions = [
  { value: "color", label: "Color" },
  { value: "size", label: "Size" },
  { value: "material", label: "Material" },
  { value: "style", label: "Style" },
  { value: "weight", label: "Weight" },
];

// Color options for color variations
const colorOptions = [
  { value: "red", label: "Red", color: "#FF0000" },
  { value: "blue", label: "Blue", color: "#0000FF" },
  { value: "green", label: "Green", color: "#00FF00" },
  { value: "yellow", label: "Yellow", color: "#FFFF00" },
  { value: "black", label: "Black", color: "#000000" },
  { value: "white", label: "White", color: "#FFFFFF" },
  { value: "purple", label: "Purple", color: "#800080" },
  { value: "orange", label: "Orange", color: "#FFA500" },
  { value: "pink", label: "Pink", color: "#FFC0CB" },
  { value: "brown", label: "Brown", color: "#A52A2A" },
];

const AddNewProduct = ({
  mode = "create",
  product,
  onCancel,
  onSubmit,
  onCreate,
  onUpdate,
  isLoading = false,
}: ProductFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      discountType: "none",
      discountPercentage: "",
      taxClass: "standard",
      vatAmount: "",
      sku: "",
      barcode: "",
      quantity: "",
      variations: [],
      shipping: {
        requiresShipping: false,
        weight: "",
        height: "",
        length: "",
        width: "",
      },
      category: "",
      tags: [],
      status: "draft",
      images: [],
      ...product,
    },
  });

  // Watch form values
  const requiresShipping = watch("shipping.requiresShipping");
  const discountType = watch("discountType");
  const variations = watch("variations");

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const handleFormSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      // Prepare form data for API submission
      const formData = new FormData();

      // Append all fields to formData
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images") {
          // Handle image files
          data.images.forEach((file, index) => {
            if (file instanceof File) {
              formData.append(`images[${index}]`, file);
            } else if (typeof file === "string") {
              // If it's a string (URL), you might handle it differently
              formData.append(`existingImages[${index}]`, file);
            }
          });
        } else if (key === "shipping") {
          // Handle shipping object
          Object.entries(data.shipping).forEach(
            ([shippingKey, shippingValue]) => {
              formData.append(
                `shipping.${shippingKey}`,
                shippingValue?.toString() || ""
              );
            }
          );
        } else if (key === "variations") {
          // Handle variations array
          data.variations.forEach((variation, index) => {
            formData.append(`variations[${index}].type`, variation.type);
            formData.append(`variations[${index}].value`, variation.value);
          });
        } else if (Array.isArray(value)) {
          // Handle arrays (like tags)
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          // Handle simple fields
          formData.append(key, value?.toString() || "");
        }
      });

      // Call the appropriate API function based on mode
      if (onSubmit) {
        await onSubmit(data);
      } else if (mode === "create" && onCreate) {
        await onCreate(data);
      } else if (mode === "edit" && onUpdate) {
        await onUpdate(data);
      } else {
        // Default API call if no handlers provided
        const endpoint =
          mode === "create" ? "/api/products" : `/api/products/${product?.id}`;
        const method = mode === "create" ? "POST" : "PUT";

        const response = await fetch(endpoint, {
          method,
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to submit product");
        }

        const result = await response.json();
        toast.success(
          `Product ${mode === "create" ? "created" : "updated"} successfully!`
        );
        return result;
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error(
        `Failed to ${mode === "create" ? "create" : "update"} product`
      );
    }
  };

  return (
    <div className="w-full h-full px-4 sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">
              {mode === "create" ? "Add Product" : "Edit Product"}
            </h1>
          </div>
          <BreadCrumb />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Cancel</span>
          </Button>

          <Button
            variant="default"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isLoading}
          >
            <DockIcon className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">
              {isLoading ? "Saving..." : "Save"}
            </span>
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full h-full flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* IMAGE UPLOAD SECTION */}
            <Controller
              name="images"
              control={control}
              rules={{ required: "At least one image is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <PhotoUpload
                    title="Media"
                    maxSize={2}
                    buttonText="Add image"
                    onUpload={(files) => {
                      const uploadedFiles = Array.isArray(files)
                        ? files
                        : [files];
                      field.onChange([
                        ...(field.value || []),
                        ...uploadedFiles,
                      ]);
                    }}
                    onRemove={(index) => {
                      const newImages = [...field.value];
                      newImages.splice(index, 1);
                      field.onChange(newImages);
                    }}
                    className="my-uploader"
                    preview
                    multiple
                    accept="image/*"
                    value={field.value}
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error.message}</p>
                  )}
                </div>
              )}
            />

            {/* GENERAL INFORMATION */}
            <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-lg upload-shadow flex flex-col gap-4">
              <p className="text-black-800 text-lg font-medium">
                General Information
              </p>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Product name is required" }}
                render={({ field }) => (
                  <Input
                    label="Product Name"
                    placeholder="Type product name here. . ."
                    {...field}
                    error={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <CustomTextArea
                    label="Description"
                    placeholder="Type product description here. . ."
                    rows={4}
                    id="description"
                    {...field}
                    error={errors.description?.message}
                  />
                )}
              />
            </div>

            {/* PRICING */}
            <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-lg upload-shadow flex flex-col gap-4">
              <p className="text-black-800 text-lg font-medium">Pricing</p>
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "Price is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Invalid price format",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Base Price"
                    placeholder="Type your Base Price"
                    leftIcon={<DollarSign className="h-4 w-4" />}
                    {...field}
                    error={errors.price?.message}
                  />
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="col-span-1">
                  <Controller
                    name="discountType"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        label="Discount Type"
                        options={discountTypeOptions}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select discount type"
                        variant="inverted"
                        maxCount={1}
                        single
                      />
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <Controller
                    name="discountPercentage"
                    control={control}
                    rules={{
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Must be a number",
                      },
                      max: {
                        value: 100,
                        message: "Cannot exceed 100%",
                      },
                      validate: (value) => {
                        if (discountType !== "none" && !value) {
                          return "Discount percentage is required";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        label="Discount Percentage (%)"
                        placeholder="Type discount percentage. . "
                        {...field}
                        error={errors.discountPercentage?.message}
                        disabled={discountType === "none"}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="col-span-1">
                  <Controller
                    name="taxClass"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        label="Tax Class"
                        options={taxClassOptions}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select tax class"
                        variant="inverted"
                        maxCount={1}
                        single
                      />
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <Controller
                    name="vatAmount"
                    control={control}
                    rules={{
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Must be a number",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        label="VAT Amount (%)"
                        placeholder="Type VAT amount. . ."
                        {...field}
                        error={errors.vatAmount?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* INVENTORY */}
            <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-lg upload-shadow flex flex-col gap-4">
              <p className="text-black-800 text-lg font-medium">Inventory</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="col-span-1">
                  <Controller
                    name="sku"
                    control={control}
                    rules={{ required: "SKU is required" }}
                    render={({ field }) => (
                      <Input
                        label="SKU"
                        placeholder="Type product SKU here. . ."
                        {...field}
                        error={errors.sku?.message}
                      />
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <Controller
                    name="barcode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Barcode"
                        placeholder="Product barcode. . ."
                        {...field}
                        error={errors.barcode?.message}
                      />
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <Controller
                    name="quantity"
                    control={control}
                    rules={{
                      required: "Quantity is required",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Must be a number",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        label="Quantity"
                        placeholder="Type product quantity here. . ."
                        {...field}
                        error={errors.quantity?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* VARIATION */}
            <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-lg upload-shadow flex flex-col gap-4">
              <p className="text-black-800 text-lg font-medium">Variation</p>
              <Controller
                name="variations"
                control={control}
                render={({ field }) => (
                  <>
                    {field.value?.map((variation, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                      >
                        <div className="col-span-1">
                          <Controller
                            name={`variations.${index}.type`}
                            control={control}
                            rules={{ required: "Variation type is required" }}
                            render={({ field: variationField }) => (
                              <CustomSelect
                                label="Variation Type"
                                options={variationTypeOptions}
                                onValueChange={(value) => {
                                  variationField.onChange(value);
                                  // Reset the value when type changes
                                  if (value !== variation.type) {
                                    setValue(`variations.${index}.value`, "");
                                  }
                                }}
                                defaultValue={variationField.value}
                                placeholder="Select variation type"
                                variant="inverted"
                                maxCount={1}
                                single
                                error={
                                  errors.variations?.[index]?.type?.message
                                }
                              />
                            )}
                          />
                        </div>
                        <div className="col-span-1 flex gap-4 sm:gap-6 items-end">
                          {variation.type === "color" ? (
                            <Controller
                              name={`variations.${index}.value`}
                              control={control}
                              rules={{ required: "Color is required" }}
                              render={({ field: variationField }) => (
                                <CustomSelect
                                  label="Color"
                                  options={colorOptions}
                                  onValueChange={variationField.onChange}
                                  defaultValue={variationField.value}
                                  placeholder="Select a color"
                                  variant="inverted"
                                  maxCount={1}
                                  single
                                  renderOption={(option) => (
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                          backgroundColor: option.color,
                                        }}
                                      />
                                      {option.label}
                                    </div>
                                  )}
                                  error={
                                    errors.variations?.[index]?.value?.message
                                  }
                                />
                              )}
                            />
                          ) : (
                            <Controller
                              name={`variations.${index}.value`}
                              control={control}
                              rules={{
                                required: "Variation value is required",
                              }}
                              render={({ field: variationField }) => (
                                <Input
                                  label={
                                    variation.type
                                      ? `${variation.type
                                          .charAt(0)
                                          .toUpperCase()}${variation.type.slice(
                                          1
                                        )} Value`
                                      : "Variation Value"
                                  }
                                  placeholder={
                                    variation.type
                                      ? `Enter ${variation.type}...`
                                      : "Enter variation value..."
                                  }
                                  {...variationField}
                                  error={
                                    errors.variations?.[index]?.value?.message
                                  }
                                />
                              )}
                            />
                          )}
                          <Button
                            type="button"
                            variant={"secondary"}
                            className="h-10"
                            onClick={() => {
                              const newVariations = [...field.value];
                              newVariations.splice(index, 1);
                              field.onChange(newVariations);
                            }}
                          >
                            <Trash color="#F04438" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-2">
                      <Button
                        type="button"
                        variant={"secondary"}
                        onClick={() => {
                          field.onChange([
                            ...field.value,
                            { type: "", value: "" },
                          ]);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="ml-2">Add Variant</span>
                      </Button>
                    </div>
                  </>
                )}
              />
            </div>

            {/* Shipping */}
            <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-lg upload-shadow flex flex-col gap-4">
              <p className="text-black-800 text-lg font-medium">Shipping</p>
              <Controller
                name="shipping.requiresShipping"
                control={control}
                render={({ field }) => (
                  <ComCheckbox
                    id="shipping-required"
                    label="This product requires shipping"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {requiresShipping && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="col-span-1">
                    <Controller
                      name="shipping.weight"
                      control={control}
                      rules={{
                        required: requiresShipping
                          ? "Weight is required"
                          : false,
                      }}
                      render={({ field }) => (
                        <Input
                          label="Weight (kg)"
                          placeholder="Product weight. . ."
                          {...field}
                          error={errors.shipping?.weight?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <Controller
                      name="shipping.height"
                      control={control}
                      rules={{
                        required: requiresShipping
                          ? "Height is required"
                          : false,
                      }}
                      render={({ field }) => (
                        <Input
                          label="Height (cm)"
                          placeholder="Height (cm). . ."
                          {...field}
                          error={errors.shipping?.height?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <Controller
                      name="shipping.length"
                      control={control}
                      rules={{
                        required: requiresShipping
                          ? "Length is required"
                          : false,
                      }}
                      render={({ field }) => (
                        <Input
                          label="Length (cm)"
                          placeholder="Length (cm). . ."
                          {...field}
                          error={errors.shipping?.length?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <Controller
                      name="shipping.width"
                      control={control}
                      rules={{
                        required: requiresShipping
                          ? "Width is required"
                          : false,
                      }}
                      render={({ field }) => (
                        <Input
                          label="Width (cm)"
                          placeholder="Width (cm). . ."
                          {...field}
                          error={errors.shipping?.width?.message}
                        />
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1">
            <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-lg upload-shadow flex flex-col gap-4 mb-6">
              <p className="text-black-800 text-lg font-medium">Category</p>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Product Category"
                    options={categoryOptions}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select a category"
                    variant="inverted"
                    maxCount={1}
                    single
                    error={errors.category?.message}
                  />
                )}
              />
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label="Product Tags"
                    options={tagOptions}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select tags"
                    variant="inverted"
                    maxCount={5}
                    single={false}
                  />
                )}
              />
            </div>
            <div className="w-full bg-background p-4 sm:p-6 border border-gray-100 rounded-lg upload-shadow flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-black-800 text-lg font-medium">Status</p>
                <Badge>
                  {statusOptions.find((opt) => opt.value === watch("status"))
                    ?.label || "Draft"}
                </Badge>
              </div>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label="Product Status"
                    options={statusOptions}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Draft"
                    variant="inverted"
                    maxCount={1}
                    single
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

export default AddNewProduct;
