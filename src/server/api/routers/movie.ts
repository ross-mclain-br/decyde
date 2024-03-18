import { type Movie, type MovieVote } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { MovieCreateInputSchema } from "../../../../prisma/generated/zod";
export const movieRouter = createTRPCRouter({
  upsertMovieVote: privateProcedure
    .input(
      z.object({
        id: z.number().optional(),
        userId: z.number(),
        imdbId: z.string(),
        groupId: z.number().optional(),
        vote: z.number(),
        movie: MovieCreateInputSchema.optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingMovieVote = await ctx.db.movieVote.findFirst({
        where: {
          id: input.id,
          userId: input.userId,
          groupId: input.groupId,
          movie: {
            imdbId: input.imdbId,
          },
        },
      });

      let existingMovie = await ctx.db.movie.findFirst({
        where: {
          imdbId: input.imdbId,
        },
      });

      if (!existingMovie && input.movie) {
        existingMovie = await ctx.db.movie.create({
          data: input.movie,
        });
      }

      if (existingMovieVote) {
        return ctx.db.movieVote.update({
          where: {
            id: existingMovieVote.id,
          },
          data: {
            vote: input.vote,
          },
        });
      } else {
        if (existingMovie?.id) {
          return ctx.db.movieVote.create({
            data: {
              vote: input.vote,
              userId: input.userId,
              groupId: input.groupId,
              movieId: existingMovie?.id,
            },
          });
        }
      }
      return null;
    }),
  getUserVotes: privateProcedure
    .input(z.object({ userId: z.number() }))
    .query<(MovieVote & { movie: Movie })[]>(async ({ ctx, input }) => {
      return ctx.db.movieVote.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          movie: true,
        },
      });
    }),
});
