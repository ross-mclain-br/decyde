import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserByInternalId: privateProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input.userId },
      });
    }),
  getUserByExternalId: privateProcedure
    .input(z.object({ externalUserId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userReturn = await ctx.db.user.findUnique({
        where: { externalId: input.externalUserId },
      });
      return userReturn;
    }),

  upsertUser: privateProcedure
    .input(
      z.object({
        externalId: z.string(),
        emailAddress: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        avatar: z.string(),
        userIdentities: z.array(
          z.object({
            provider: z.string(),
            providerId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const upsertUserReturn = await ctx.db.user.upsert({
          where: { externalId: input.externalId },
          create: {
            firstName: input.firstName,
            lastName: input.lastName,
            emailAddress: input.emailAddress,
            avatar: input.avatar,
            externalId: input.externalId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          update: {
            firstName: input.firstName,
            lastName: input.lastName,
            emailAddress: input.emailAddress,
            avatar: input.avatar,
            updatedAt: new Date().toISOString(),
          },
        });

        if (upsertUserReturn?.id) {
          for (const userIdentity of input.userIdentities) {
            await ctx.db.userIdentities.upsert({
              where: {
                provider_userId: {
                  provider: userIdentity.provider,
                  userId: upsertUserReturn.id,
                },
              },
              create: {
                provider: userIdentity.provider,
                providerId: userIdentity.providerId,
                userId: upsertUserReturn.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              update: {
                provider: userIdentity.provider,
                providerId: userIdentity.providerId,
                userId: upsertUserReturn.id,
                updatedAt: new Date().toISOString(),
              },
            });
          }
        }
        return upsertUserReturn;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error upserting user.",
        });
      }
    }),
});
