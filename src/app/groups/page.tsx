"use server";
import { GroupsWidget } from "~/app/_components/groups/groupsWidget";
import { BackButton } from "~/app/_components/backButton";

export default async function Page() {
  return (
    <div className={"min-h-screen bg-white/80 py-3"}>
      <div className={"mt-24"}>
        <div className={"container flex justify-start"}>
          <BackButton href={"/"} />
        </div>
        <GroupsWidget />
      </div>
    </div>
  );
}
