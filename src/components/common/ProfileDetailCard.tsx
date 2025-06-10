import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileDetailCardProps {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  avatarUrl?: string;
  verified: boolean;
}

const ProfileDetailCard: React.FC<ProfileDetailCardProps> = ({
  id,
  name,
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
            <div>
                <Avatar>
                    <AvatarImage></AvatarImage>
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </div>
        </CardContent>
    </Card>
    </>
  );
};

export default ProfileDetailCard;
