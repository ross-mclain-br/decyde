import { MovieType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMovieTypeFromString = (type: string) => {
  switch (type) {
    case "MOVIE":
      return MovieType.MOVIE;
    case "SERIES":
      return MovieType.SERIES;
    default:
      return MovieType.MOVIE;
  }
};
