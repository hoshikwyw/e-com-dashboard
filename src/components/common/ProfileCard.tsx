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

interface ProfileCardProps {
  name: string;
  status: "Active" | "Inactive";
  stock: number;
  sells: string;
  phone: string;
  email: string;
  address: string;
  avatarUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  status,
  stock,
  sells,
  phone,
  email,
  address,
  avatarUrl,
}) => {
  return (
    <Card className=" w-[290px] py-4 relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-black focus:outline-none">
            <MoreVertical size={20} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CardContent className="w-full h-full flex flex-col items-center text-center px-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>

        <div className=" text-base font-semibold mt-4">{name}</div>
        <Badge variant="success" className="bg-green-100 text-green-600">
          {status}
        </Badge>

        <div className=" grid grid-cols-2 w-full text-sm text-gray-500 border-b border-dashed mt-4 pb-4">
          <div className=" flex justify-center flex-col items-center">
            <div>Item Stock</div>
            <div className="font-medium text-black">{stock}</div>
          </div>
          <div>
            <div>Sells</div>
            <div className="font-medium text-black">{sells}</div>
          </div>
        </div>

        <div className=" mt-4 flex flex-col gap-4 items-start justify-start w-full">
          <span className="flex items-start gap-2">
            <div className=" border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
              <Phone size={16} />
            </div>
            <div className=" flex flex-col gap-1 items-start justify-start">
              <span className=" text-sm text-black-600">Phone Number</span>
              <span className=" text-sm text-black-800">{phone}</span>
            </div>
          </span>
          <div className="flex items-center gap-2">
            <div className=" border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
              <Mail size={16} />
            </div>
            <div className=" flex flex-col gap-1 items-start justify-start">
              <span className=" text-sm text-black-600">Email</span>
              <span className=" text-sm text-black-800">{email}</span>
            </div>
          </div>
          <div className=" w-full flex items-start justify-start gap-2 text-start">
            <div className="flex-shrink-0 border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
              <MapPin size={16} />
            </div>
            <div className=" flex flex-col gap-1 items-start justify-start">
              <span className=" text-sm text-black-600">Address</span>
              <span className=" text-sm text-black-800">{address}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
