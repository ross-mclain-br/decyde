"use client";
import { UserAvatar } from "~/app/_components/users/userAvatar";
import { User, UserGroup } from "@prisma/client";

export const UserGroupAvatarList = ({
  userGroups,
}: {
  userGroups: (UserGroup & { user: User })[];
}) => {
  return (
    <div
      className={
        "relative mt-2 flex h-[48px] items-center justify-start pl-[16px]"
      }
    >
      {userGroups.map((userGroup, index) => (
        <div
          key={`user-avatar-${userGroup?.user?.id}`}
          className={`-ml-[16px]`}
        >
          <UserAvatar user={userGroup?.user} userGroup={userGroup} />
        </div>
      ))}
    </div>
  );
};
