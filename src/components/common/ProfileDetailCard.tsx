import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface ProfileDetailCardProps {
  id: number;
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
    <>
      <Card>
        <CardContent>
          <div className="">
            <div>
              <Avatar>
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
            </div>

            <div className="text-base font-semibold mt-4">{name}</div>
            <Badge
              variant={status === "active" ? "success" : "primary"}
              className=" capitalize"
            >
              {status}
            </Badge>
            <Badge
              variant={status === "active" ? "success" : "primary"}
              className=" capitalize"
            >
              {verified}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileDetailCard;
