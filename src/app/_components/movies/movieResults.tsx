import { type MovieSearchType } from "~/forms/movieSearchForm";
import { RouterOutputs, api } from "~/trpc/react";
import { Loading } from "~/app/loading";
import MovieResult from "~/app/_components/movies/movieResult";

export const MovieResults = ({
  userId,
  search,
  type,
  userMovieVotes,
  groupId,
}: {
  userId: number;
  search: string;
  type: MovieSearchType;
  userMovieVotes: RouterOutputs["movie"]["getUserVotes"];
  groupId?: number;
}) => {
  const { data: movieSearchResultsData, isLoading } = api.omdb.search.useQuery(
    {
      search: search,
      type: type,
    },
    {
      enabled: search?.length > 1 && !!type,
    },
  );

  const movieVotesMap = movieSearchResultsData?.Search?.map((movie) => {
    const userVote = userMovieVotes?.find(
      (vote) =>
        vote.movie.imdbId === movie.imdbID &&
        (groupId ? vote.groupId === groupId : true),
    );
    return {
      movie: movie,
      vote: (userVote?.vote ?? 0) > 0,
    };
  });

  return (
    <>
      {isLoading ? (
        <div className={"flex items-center justify-center px-3 py-16"}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={"flex items-center justify-between px-3 py-3"}>
            <span></span>
            <span className={"text-sm font-bold italic"}>
              {movieSearchResultsData?.Search?.length ?? 0} of{" "}
              {movieSearchResultsData?.totalResults ?? 0} Results
            </span>
          </div>
          <div
            className={"relative flex flex-grow flex-wrap justify-center gap-3"}
          >
            {movieVotesMap?.map((movieAndVote) => {
              return (
                <MovieResult
                  key={movieAndVote.movie.imdbID}
                  movie={movieAndVote.movie}
                  vote={movieAndVote.vote}
                  userId={userId}
                  groupId={groupId}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
