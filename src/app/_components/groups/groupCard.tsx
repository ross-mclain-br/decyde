import { Group, User, UserGroup } from "@prisma/client";
import { UserAvatar } from "~/app/_components/users/userAvatar";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { UserGroupAvatarList } from "~/app/_components/userGroups/userGroupAvatarList";

export const GroupCard = (props: {
  group: Group & { users: (UserGroup & { user: User })[] };
}) => {
  return (
    <div
      className={
        "flex flex-grow flex-col justify-between rounded-lg border-2 border-blue bg-transparent p-4 text-blue shadow-2xl"
      }
    >
      <div className={"flex flex-col"}>
        <div className={"flex items-center justify-between"}>
          <h2 className={"truncate text-lg font-bold"}>{props.group.name}</h2>
          <div className={"flex items-center"}>
            <p className={"font-bold"}>{props.group.users.length}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                clipRule="evenodd"
              />
              <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
            </svg>
          </div>
        </div>
        <p className={"line-clamp-3 max-h-[72px] "}>
          {props.group.description}
        </p>
      </div>
      <div className={"flex items-end justify-between"}>
        <UserGroupAvatarList
          userGroups={props?.group?.users?.slice(0, 8) ?? []}
        />
        <Link href={`/groups/${props.group.id}`}>
          <Button variant={"ghost"} type={"button"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
};
