import { MovieWidget } from "~/app/_components/movies/movieWidget";

export default async function Page() {
  return (
    <div className={"min-h-screen bg-white/80 py-3"}>
      <div className={"mt-24"}>
        <MovieWidget />
      </div>
    </div>
  );
}
