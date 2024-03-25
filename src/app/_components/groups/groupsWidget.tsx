"use client";

import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import Loading from "~/app/_components/loading";
import Link from "next/link";
import { GroupCard } from "~/app/_components/groups/groupCard";

export const GroupsWidget = () => {
  const { user } = useUser();
  const { data: userData } = api.user.getUserByExternalId.useQuery(
    {
      externalUserId: user?.id ?? "",
    },
    {
      enabled: !!user?.id,
    },
  );

  //Get all user groups
  const {
    data: userGroupData,
    refetch: userGroupRefetch,
    isLoading: userGroupLoading,
  } = api.group.getUserGroups.useQuery(
    {
      userId: userData?.id ?? 0,
    },
    {
      enabled: !!userData?.id,
    },
  );

  return (
    <div className={"p-8"}>
      <div className={"grid gap-3 md:grid-cols-3"}>
        <Link href={"/groups/create"} className={"flex"}>
          <Button
            variant={"group"}
            size={"group"}
            type={"button"}
            className={"flex-grow"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-16 w-16"
            >
              <path
                fillRule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                clipRule="evenodd"
              />
              <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
            </svg>

            <span>Add Group</span>
          </Button>
        </Link>
        {userGroupLoading ? (
          <div className={"flex items-center justify-center"}>
            <Loading />
          </div>
        ) : userGroupData && userGroupData.length > 0 ? (
          userGroupData.map((userGroup) => (
            <GroupCard
              key={`group-card-${userGroup?.group?.id}`}
              group={userGroup.group}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
