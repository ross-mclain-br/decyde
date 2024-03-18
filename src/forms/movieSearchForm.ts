import { createFormFactory } from "@tanstack/react-form";
import { z } from "zod";

export type MovieSearchType = "MOVIE" | "SERIES";
const movieSearchType = z.enum(["MOVIE", "SERIES"]);
const movieSearchForm = z.object({
  search: z.string(),
  type: movieSearchType,
});
export type MovieSearchFormType = z.infer<typeof movieSearchForm>;
export const movieSearchFormFactory = createFormFactory<MovieSearchFormType>({
  defaultValues: {
    search: "",
    type: movieSearchType.Enum.MOVIE,
  },
  onServerValidate({ value }) {
    // console.log("Server validation", value);
    // if ((value?.search?.length ?? 0) < 2) {
    //   return "Server validation: Search must be at least 2 characters long";
    // }
    // const validMovieTypes = Object.values(movieSearchType.Values);
    // if (![...validMovieTypes].includes(value.type)) {
    //   return `Server validation: Type must be within ${validMovieTypes.join(", ")} and was ${value.type}`;
    // }
    return undefined;
  },
});
