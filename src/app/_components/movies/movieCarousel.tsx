import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";
import { type RouterOutputs } from "~/trpc/react";
import Image from "next/image";

export const MovieCarousel = ({
  userMovieVotes,
}: {
  userMovieVotes: RouterOutputs["movie"]["getUserVotes"];
}) => {
  return (
    <div
      className={"container flex select-none items-center justify-center px-16"}
    >
      <Carousel className="w-full ">
        <CarouselContent className="-ml-1">
          {userMovieVotes
            ?.filter((movieVote) => movieVote?.vote > 0)
            .map((movieVote, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col pl-1 md:basis-1/3 xl:basis-1/5"
              >
                <div className="flex flex-grow flex-col p-1">
                  <Card
                    className={"border-0 border-b-0 bg-transparent shadow-none"}
                  >
                    <CardContent className="flex aspect-square items-center justify-center border-0 bg-transparent p-0">
                      <div className={"relative h-[400px] w-[300px] "}>
                        <Image
                          src={
                            movieVote?.movie?.posterUrl !== "N/A"
                              ? movieVote.movie.posterUrl
                              : "/images/empty_movie_poster.png"
                          }
                          alt={movieVote?.movie?.title}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          blurDataURL={"/images/empty_movie_poster.png"}
                          fill={true}
                          quality={100}
                          className={"rounded-lg shadow-xl"}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
