"use server";
import { CreateGroup } from "~/app/_components/groups/create";

export default async function Page() {
  return (
    <div className={"min-h-screen bg-white/80 py-3"}>
      <div className={"mt-24"}>
        <CreateGroup />
      </div>
    </div>
  );
}
