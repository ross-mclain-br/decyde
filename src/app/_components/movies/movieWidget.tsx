"use client";
import { MovieSearch } from "~/app/_components/movies/movieSearch";
import { MovieResults } from "~/app/_components/movies/movieResults";
import { useState } from "react";
import { type MovieSearchType } from "~/forms/movieSearchForm";
import { api } from "~/trpc/react";
import { useUser } from "@clerk/nextjs";
import { MovieCarousel } from "~/app/_components/movies/movieCarousel";
import Loading from "~/app/_components/loading";

export const MovieWidget = () => {
  const { user } = useUser();
  const { data: userData } = api.user.getUserByExternalId.useQuery(
    {
      externalUserId: user?.id ?? "",
    },
    {
      enabled: !!user?.id,
    },
  );

  const [currentSearchValue, setCurrentSearchValue] = useState<string | null>(
    null,
  );
  const [currentTypeValue, setCurrentTypeValue] =
    useState<MovieSearchType | null>(null);

  //Get all user movie votes
  const {
    data: userMovieVotesData,
    refetch: userMovieVotesRefetch,
    isLoading: userMovieVotesDataLoading,
  } = api.movie.getUserVotes.useQuery(
    {
      userId: userData?.id ?? 0,
    },
    {
      enabled: !!userData?.id,
    },
  );

  return (
    <>
      {userMovieVotesDataLoading ? (
        <div className={"flex items-center justify-center px-3 py-32"}>
          <Loading />
        </div>
      ) : userMovieVotesData && userMovieVotesData.length > 0 ? (
        <MovieCarousel userMovieVotes={userMovieVotesData} />
      ) : (
        <></>
      )}
      <MovieSearch
        setCurrentSearchValue={setCurrentSearchValue}
        setCurrentTypeValue={setCurrentTypeValue}
      />
      <div className={"sm:p-6"}>
        {currentSearchValue && currentTypeValue ? (
          <MovieResults
            userId={userData?.id ?? 0}
            search={currentSearchValue}
            type={currentTypeValue}
            userMovieVotes={userMovieVotesData ?? []}
            userMovieVotesRefetch={userMovieVotesRefetch}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
