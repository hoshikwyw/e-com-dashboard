import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  BadgeDollarSign,
  CarTaxiFront,
  Lock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

interface ProfileDetailCardProps {
  id?: number;
  name: string;
  status: string;
  phone: string;
  email: string;
  address: string;
  avatarUrl?: string;
  verified: boolean;
}

const ProfileDetailCard: React.FC<ProfileDetailCardProps> = ({
  id,
  name,
  status,
  email,
  phone,
  address,
  avatarUrl,
  verified,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto border border-gray-100 shadow-sm p-2">
      <CardContent className="flex justify-center items-center p-0 rounded-[4px]">
        <div className="w-full flex flex-col justify-center items-center">
          {/* Top colored section */}
          <div className="w-full h-36 bg-primary-500 rounded-t-[4px]"></div>

          {/* Avatar and profile info */}
          <div className="w-40 -mt-20 relative z-10">
            <div className="flex flex-col justify-center items-center gap-2">
              <Avatar className="w-full h-40 border-4 border-white">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-wrap justify-center items-center gap-2">
                <div className="text-lg font-semibold text-center">{name}</div>
                <Badge
                  variant={status === "active" ? "success" : "primary"}
                  className="capitalize"
                >
                  {status}
                </Badge>
              </div>
              <Badge variant="success" className="capitalize">
                <BadgeDollarSign className="w-4 h-4" /> Verified Seller
              </Badge>
              <span className="text-gray-500 text-xs text-center">{email}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[90%] h-px bg-gray-100 my-4"></div>

          {/* Details section */}
          <div className="w-full flex flex-col gap-4 px-4 pb-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                <Lock size={16} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">User ID</span>
                <span className="text-sm text-gray-800">{id}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                <Phone size={16} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Phone Number</span>
                <span className="text-sm text-gray-800">{phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                <Mail size={16} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Email</span>
                <span className="text-sm text-gray-800">{email}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Address</span>
                <span className="text-sm text-gray-800 line-clamp-2">
                  {address}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 border-[3.2px] border-gray-50 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                <CarTaxiFront size={16} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">
                  Latest Transaction
                </span>
                <span className="text-sm text-gray-800">12 December 2025</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailCard;
