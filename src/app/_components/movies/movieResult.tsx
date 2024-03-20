"use client";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Button } from "~/components/ui/button";
import { api, RouterOutputs } from "~/trpc/react";
import { useEffect, useState } from "react";
import { getMovieTypeFromString } from "~/lib/utils";

export const MovieResult = ({
  movie,
  vote,
  userMovieVotesRefetch,
  userId,
  groupId,
}: {
  movie: RouterOutputs["omdb"]["search"]["Search"][0];
  vote: boolean;
  userMovieVotesRefetch: () => void;
  userId: number;
  groupId?: number;
}) => {
  const [votedForMovie, setVotedForMovie] = useState(vote);

  const upsertMovieVote = api.movie.upsertMovieVote.useMutation({
    onSuccess: () => {
      userMovieVotesRefetch();
    },
  });

  return (
    <div
      key={movie.imdbID}
      className={
        "flex flex-col transition-all duration-300 ease-in-out hover:scale-[102%] hover:cursor-pointer"
      }
    >
      <div className={"relative h-[400px] w-[300px] "}>
        <Image
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "/images/empty_movie_poster.png"
          }
          alt={movie.Title}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          blurDataURL={"/images/empty_movie_poster.png"}
          fill={true}
          quality={100}
          className={"rounded-lg rounded-b-none shadow-xl"}
        />
      </div>
      <div
        className={
          "flex max-w-[300px] items-center justify-between overflow-hidden rounded-lg rounded-t-none bg-blue p-2 text-left text-teal shadow-xl"
        }
      >
        <HoverCard>
          <HoverCardTrigger>
            <p className={"max-w-[230px] truncate text-sm font-bold"}>
              {movie.Title}
            </p>
            <span>{movie.Year}</span>
          </HoverCardTrigger>
          <HoverCardContent
            className="w-80 bg-primary text-primary-foreground"
            side={"top"}
          >
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="font-bold">{movie.Title}</h4>
                <p className="text-sm">
                  <span className={"capitalize"}>{movie.Type}</span> from{" "}
                  {movie.Year}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <Button
          variant={"vote"}
          size={"sm"}
          className={`font-bold ${votedForMovie ? "bg-teal text-blue hover:bg-transparent hover:text-teal" : ""}`}
          type={"button"}
          disabled={upsertMovieVote.isPending}
          onClick={async () => {
            let vote = 0;
            if (!votedForMovie) {
              vote = 1;
            }
            upsertMovieVote.mutate({
              imdbId: movie.imdbID,
              vote,
              userId: userId,
              groupId: groupId,
              movie: {
                imdbId: movie.imdbID,
                title: movie.Title,
                year: Number(movie.Year),
                posterUrl: movie.Poster,
                type: getMovieTypeFromString(movie.Type),
              },
            });
            setVotedForMovie((prevState) => !prevState);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default MovieResult;
