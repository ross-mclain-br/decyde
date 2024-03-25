import type { RouterOutputs } from "~/trpc/react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

export const UserAvatar = (props: {
  user: RouterOutputs["user"]["getUserByExternalId"];
}) => {
  if (!props.user) return <></>;
  return (
    <div className={"flex items-center rounded-lg"}>
      <HoverCard>
        <HoverCardTrigger>
          <Image
            width={48}
            height={48}
            src={props.user.avatar ?? ""}
            alt={`${props.user.firstName} ${props.user.lastName}`}
            className={
              "cursor-help rounded-full border-2 border-secondary bg-white"
            }
          />
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-background text-blue" side={"top"}>
          <div>
            <div className={"text-lg font-bold"}>
              {props.user.firstName} {props.user.lastName}
            </div>
            {props.user.emailAddress && (
              <div className={"text-muted-foreground text-sm"}>
                {props.user.emailAddress}
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
