import {
  type Group,
  GroupInviteStatus,
  type User,
  type UserGroup,
} from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { groupFormInputType } from "~/forms/groupForm";

export const groupRouter = createTRPCRouter({
  upsertGroup: privateProcedure
    .input(groupFormInputType)
    .mutation(async ({ ctx, input }) => {
      const upsertGroupResult = await ctx.db.group.upsert({
        where: {
          id: input.id,
        },
        update: {
          name: input.name,
          description: input.description,
          image: input.image,
          color: input.color,
        },
        create: {
          name: input.name,
          description: input.description,
          image: input.image,
          color: input.color,
          ownerId: input.ownerId,
        },
      });
      return upsertGroupResult;
    }),
  upsertGroupInvite: privateProcedure
    .input(
      z.object({
        groupId: z.number(),
        userId: z.number().optional(),
        emailAddress: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.userId && !input.emailAddress) {
        throw new Error("userId or email is required");
      }

      const existingUser = input.userId
        ? await ctx.db.user.findFirst({
            where: { id: input.userId },
          })
        : await ctx.db.user.findFirst({
            where: { emailAddress: input.emailAddress },
          });

      const existingUserGroup = existingUser?.id
        ? await ctx.db.userGroup.findFirst({
            where: {
              groupId: input.groupId,
              userId: existingUser?.id,
            },
          })
        : null;

      if (existingUserGroup) {
        throw new Error("User is already in group");
      }

      const existingGroupInvite = await ctx.db.groupInvite.findFirst({
        where: {
          groupId: input.groupId,
          user: {
            OR: [
              {
                id: existingUser?.id ?? undefined,
              },
              {
                emailAddress: input.emailAddress,
              },
            ],
          },
        },
      });

      switch (existingGroupInvite?.status) {
        case GroupInviteStatus.ACCEPTED:
          throw new Error("Invite already accepted");
        case GroupInviteStatus.REJECTED:
          console.log("Retrying invite");
          break;
        case GroupInviteStatus.PENDING:
          throw new Error("Invite already pending");
        case GroupInviteStatus.CANCELLED:
          console.log("Retrying invite");
          break;
        default:
          throw new Error("Invite already exists");
      }

      const emailAddress =
        existingUser?.emailAddress ?? input?.emailAddress ?? null;

      if (emailAddress) {
        return ctx.db.groupInvite.create({
          data: {
            groupId: input.groupId,
            userId: input.userId,
            emailAddress: emailAddress,
            status: GroupInviteStatus.PENDING,
            sentAt: new Date()?.toISOString(),
          },
        });
      }
      return null;
    }),
  getGroupId: privateProcedure
    .input(z.object({ id: z.number() }))
    .query<
      (Group & { users: (UserGroup & { user: User })[] }) | null
    >(async ({ ctx, input }) => {
      return ctx.db.group.findUnique({
        where: {
          id: input.id,
        },
        include: {
          users: {
            include: {
              user: true,
            },
          },
        },
      });
    }),
  getUserGroups: privateProcedure.input(z.object({ userId: z.number() })).query<
    (UserGroup & {
      group: Group & { users: (UserGroup & { user: User })[] };
    })[]
  >(async ({ ctx, input }) => {
    return ctx.db.userGroup.findMany({
      where: {
        userId: input.userId,
      },
      include: {
        group: {
          include: {
            users: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        group: {
          name: "asc",
        },
      },
    });
  }),
});
