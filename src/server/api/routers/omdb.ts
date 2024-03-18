import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

type OmdbMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type OmdbSearchResponse = {
  Search: OmdbMovie[];
  totalResults: string;
  Response: string;
};

type OmdbTitleResponse = OmdbMovie & {
  Response: string;
};

const movieSearchType = z.enum(["MOVIE", "SERIES"]);
export const omdbRouter = createTRPCRouter({
  search: privateProcedure
    .input(z.object({ search: z.string(), type: movieSearchType }))
    .query<OmdbSearchResponse>(async ({ ctx, input }) => {
      console.log("searching", input.search, input.type);
      const omdbUrl = process.env.OMDB_URL;
      const omdbApiKey = process.env.OMDB_API_KEY;
      if (omdbUrl && omdbApiKey) {
        const searchUrl = `${omdbUrl}?s=${input.search}&type=${input.type}&apikey=${omdbApiKey}`;
        const movieSearch = await fetch(searchUrl);
        try {
          const movieResults = (await movieSearch.json()) as OmdbSearchResponse;

          if (input?.search?.length < 3 && movieResults?.Response === "False") {
            const titleSearchUrl = `${omdbUrl}?t=${input.search}&type=${input.type}&apikey=${omdbApiKey}`;
            const titleSearch = await fetch(titleSearchUrl);
            const titleSearchResult =
              (await titleSearch.json()) as OmdbTitleResponse;
            if (titleSearchResult.Response === "True") {
              movieResults.Search = [titleSearchResult];
            }
          }
          return movieResults;
        } catch (e) {
          console.error(e);
          return { Response: "False", Search: [], totalResults: "0" };
        }
      }
      return { Response: "False", Search: [], totalResults: "0" };
    }),
});
