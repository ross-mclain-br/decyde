import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const omdbRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.movie.create({
        data: {
          title: input.title,
          type: "MOVIE",
          year: 2024,
          imdbId: "tt1234567",
          posterUrl: "https://example.com/poster.jpg",
        },
      });
    }),

  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx }) => {
      return ctx.db.movie.findFirst({
        orderBy: { createdAt: "desc" },
      });
    }),
});
