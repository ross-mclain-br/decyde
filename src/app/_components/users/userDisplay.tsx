import Image from "next/image";
import { type User, type UserGroup } from "@prisma/client";

export const UserDisplay = (props: { user: User; userGroup?: UserGroup }) => {
  if (!props.user) return <></>;
  return (
    <div className={"flex items-center rounded-lg border-2 border-blue p-2"}>
      <Image
        width={48}
        height={48}
        src={props.user.avatar ?? ""}
        alt={`${props.user.firstName} ${props.user.lastName}`}
        className={"rounded-full"}
      />
      <div className={"ml-2 flex-grow"}>
        <div
          className={
            "flex flex-grow items-center justify-between text-lg font-bold"
          }
        >
          <span>
            {props.user.firstName} {props.user.lastName}
          </span>
          {props.userGroup && (
            <div className={"text-xs  uppercase text-blue/80"}>
              {props.userGroup.type}
            </div>
          )}
        </div>
        {props.user.emailAddress && (
          <div className={"text-muted-foreground text-sm"}>
            {props.user.emailAddress}
          </div>
        )}
      </div>
    </div>
  );
};
