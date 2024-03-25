"use server";
import { GroupWidget } from "~/app/_components/groups/groupWidget";
import { BackButton } from "~/app/_components/backButton";

export default async function Page({ params }: { params: { id: number } }) {
  return (
    <div className={"min-h-screen bg-white/80 py-3"}>
      <div className={"container mt-24"}>
        <div className={"flex justify-start"}>
          <BackButton href={"/groups"} />
        </div>
        <GroupWidget groupId={Number(params.id)} />
      </div>
    </div>
  );
}
