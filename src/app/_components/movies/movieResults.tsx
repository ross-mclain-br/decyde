import { type MovieSearchType } from "~/forms/movieSearchForm";
import { type RouterOutputs, api } from "~/trpc/react";
import { Loading } from "~/app/_components/loading";
import MovieResult from "~/app/_components/movies/movieResult";
import { Pagination } from "antd";
import { useState } from "react";

export const MovieResults = ({
  userId,
  search,
  type,
  userMovieVotes,
  userMovieVotesRefetch,
  groupId,
}: {
  userId: number;
  search: string;
  type: MovieSearchType;
  userMovieVotes: RouterOutputs["movie"]["getUserVotes"];
  userMovieVotesRefetch: () => void;
  groupId?: number;
}) => {
  const [page, setPage] = useState(1);
  const { data: movieSearchResultsData, isLoading } = api.omdb.search.useQuery(
    {
      search: search,
      type: type,
      page: page,
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
        <>
          <div className={"mt-24 flex items-center justify-center px-3 py-16"}>
            <Loading />
          </div>
          <div className={" min-h-[1800px]"} />
        </>
      ) : (
        <>
          <div className={"flex items-center justify-between px-12 py-3"}>
            <span></span>
            <Pagination
              current={page}
              responsive={true}
              total={Number(movieSearchResultsData?.totalResults ?? 0)}
              showSizeChanger={false}
              hideOnSinglePage={true}
              size={"small"}
              pageSize={10}
              onChange={(page) => {
                setPage(page);
              }}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} results`
              }
              className={"select-none font-bold italic text-blue"}
            />
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
                  userMovieVotesRefetch={userMovieVotesRefetch}
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
