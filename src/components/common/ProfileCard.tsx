import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, MoreVertical, Phone } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProfileCardProps {
  id?: number;
  name: string;
  status: string;
  stock: number;
  sells: string;
  phone: string;
  email: string;
  address: string;
  avatarUrl?: string;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  itemType: string; // 'seller', 'customer', 'product', etc.
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  name,
  status,
  stock,
  sells,
  phone,
  email,
  address,
  avatarUrl,
  onEdit,
  onDelete,
  itemType,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      setIsDeleteModalOpen(false);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("This didn't work.", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="w-[290px] py-4 relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-black focus:outline-none">
              <MoreVertical size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CardContent className="w-full h-full flex flex-col items-center text-center px-4">
          {/* Rest of your card content remains the same */}
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>

          <div className="text-base font-semibold mt-4">{name}</div>
          <Badge
            variant={status === "active" ? "success" : "primary"}
            className=" capitalize"
          >
            {status}
          </Badge>

          <div className="grid grid-cols-2 w-full text-sm text-gray-500 border-b border-dashed mt-4 pb-4">
            <div className="flex justify-center flex-col items-center">
              <div>Item Stock</div>
              <div className="font-medium text-black">{stock}</div>
            </div>
            <div>
              <div>Sells</div>
              <div className="font-medium text-black">{sells}</div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 items-start justify-start w-full">
            <span className="flex items-start gap-2">
              <div className="border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                <Phone size={16} />
              </div>
              <div className="flex flex-col gap-1 items-start justify-start">
                <span className="text-sm text-black-600">Phone Number</span>
                <span className="text-sm text-black-800">{phone}</span>
              </div>
            </span>
            <div className="flex items-center gap-2">
              <div className="border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                <Mail size={16} />
              </div>
              <div className="flex flex-col gap-1 items-start justify-start">
                <span className="text-sm text-black-600">Email</span>
                <span className="text-sm text-black-800">{email}</span>
              </div>
            </div>
            <div className="w-full flex items-start justify-start gap-2 text-start">
              <div className="flex-shrink-0 border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <div className="flex flex-col gap-1 items-start justify-start">
                <span className="text-sm text-black-600">Address</span>
                <span className="text-sm text-black-800 line-clamp-1">
                  {address}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemType={itemType}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ProfileCard;
