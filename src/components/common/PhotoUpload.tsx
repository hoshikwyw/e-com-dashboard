import React, { useState, useCallback } from "react";
import { z } from "zod";
import IconButton from "./IconButton";
import { Image, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

// Define the schema for component props
const photoUploadPropsSchema = z.object({
  title: z.string().optional(),
  label: z.string().optional(),
  accept: z.string().default("image/*"),
  multiple: z.boolean().default(false),
  maxSize: z.number().default(5), // in MB
  onUpload: z
    .function()
    .args(z.union([z.instanceof(File), z.array(z.instanceof(File))]))
    .returns(z.void()),
  preview: z.boolean().default(true),
  buttonText: z.string().default("Choose File"),
  className: z.string().optional(),
});

type PhotoUploadProps = z.infer<typeof photoUploadPropsSchema>;

const PhotoUpload: React.FC<PhotoUploadProps> = (props) => {
  // Validate props against schema
  const {
    title,
    label,
    accept,
    multiple,
    maxSize,
    onUpload,
    preview,
    buttonText,
    className,
  } = photoUploadPropsSchema.parse(props);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      if (!e.target.files) return;

      const files = Array.from(e.target.files);

      try {
        // Validate files
        const fileSchema = z
          .instanceof(File)
          .refine(
            (file) => file.size <= maxSize * 1024 * 1024,
            `File size must be less than ${maxSize}MB`
          )
          .refine(
            (file) => file.type.match("image.*"),
            "Only image files are allowed"
          );

        const validatedFiles = multiple
          ? z.array(fileSchema).parse(files)
          : [fileSchema.parse(files[0])];

        setSelectedFiles(validatedFiles);
        onUpload(multiple ? validatedFiles : validatedFiles[0]);
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError(err.errors.map((e) => e.message).join(", "));
        } else {
          setError("An unexpected error occurred");
        }
      }
    },
    [maxSize, multiple, onUpload]
  );

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onUpload(multiple ? newFiles : newFiles[0] || null);
  };

  return (
    <div className=" bg-white w-full p-6 rounded-[8px] border border-gray-100 upload-shadow">
      <span className=" text-lg text-black-800 pb-3">{title}</span>
      <div className="">
        <span className=" text-sm text-black-600">Photo</span>
        <div
          className={` w-full bg-gray-25 border border-dashed border-gray-100 rounded-[8px] px-3 py-6 flex flex-col justify-center items-center ${className}`}
        >
          <IconButton icon={Image} iconColor="#B71818" iconSize={24} />
          <span className=" text-gray-400 my-4">
            Drag and drop image here, or click add image
          </span>
          <div className="photo-upload-controls">
            <label className="photo-upload-button">
              <Button variant={"secondary"}>Add Image</Button>
              {/* {buttonText} */}
              <input
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
            {error && <div className="photo-upload-error">{error}</div>}
          </div>

          {preview && selectedFiles.length > 0 && (
            <div className="photo-preview-container">
              {selectedFiles.map((file, index) => (
                <div key={index} className="photo-preview-item">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="photo-preview-image"
                  />
                  <button
                    type="button"
                    className="photo-preview-remove"
                    onClick={() => removeFile(index)}
                  >
                    ×
                  </button>
                  <div className="photo-preview-name">{file.name}</div>
                  <div className="photo-preview-size">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
