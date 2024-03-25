"use client";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Button } from "~/components/ui/button";
import { api, type RouterOutputs } from "~/trpc/react";
import { useState } from "react";
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
      className={"flex flex-col transition-all duration-300 ease-in-out"}
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
            className="w-80 bg-background text-blue"
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
          className={`group font-bold ${votedForMovie ? "bg-blue text-gold hover:bg-transparent hover:text-teal" : ""}`}
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
          {votedForMovie ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className=" h-6 w-6 group-hover:hidden"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="hidden h-6 w-6 group-hover:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 group-hover:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="hidden h-6 w-6 group-hover:block"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MovieResult;
