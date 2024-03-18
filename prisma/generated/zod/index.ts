import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "externalId",
  "createdAt",
  "updatedAt",
  "emailAddress",
  "firstName",
  "lastName",
  "avatar",
]);

export const UserIdentitiesScalarFieldEnumSchema = z.enum([
  "id",
  "createdAt",
  "updatedAt",
  "userId",
  "provider",
  "providerId",
]);

export const MovieScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "year",
  "imdbId",
  "type",
  "posterUrl",
  "createdAt",
  "updatedAt",
]);

export const GroupScalarFieldEnumSchema = z.enum([
  "id",
  "createdAt",
  "updatedAt",
  "name",
  "description",
  "image",
  "color",
  "ownerId",
]);

export const GroupInviteScalarFieldEnumSchema = z.enum([
  "id",
  "createdAt",
  "updatedAt",
  "sentAt",
  "respondedAt",
  "cancelledAt",
  "status",
  "groupId",
  "email",
  "userId",
]);

export const UserGroupScalarFieldEnumSchema = z.enum([
  "id",
  "createdAt",
  "updatedAt",
  "userId",
  "groupId",
]);

export const MovieVoteScalarFieldEnumSchema = z.enum([
  "id",
  "createdAt",
  "updatedAt",
  "userId",
  "movieId",
  "groupId",
  "vote",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const MovieTypeSchema = z.enum(["MOVIE", "SERIES"]);

export type MovieTypeType = `${z.infer<typeof MovieTypeSchema>}`;

export const GroupInviteStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "CANCELLED",
]);

export type GroupInviteStatusType =
  `${z.infer<typeof GroupInviteStatusSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  externalId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  emailAddress: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  avatar: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// USER IDENTITIES SCHEMA
/////////////////////////////////////////

export const UserIdentitiesSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.number().int(),
  provider: z.string(),
  providerId: z.string(),
});

export type UserIdentities = z.infer<typeof UserIdentitiesSchema>;

/////////////////////////////////////////
// MOVIE SCHEMA
/////////////////////////////////////////

export const MovieSchema = z.object({
  type: MovieTypeSchema,
  id: z.number().int(),
  title: z.string(),
  year: z.number().int(),
  imdbId: z.string(),
  posterUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Movie = z.infer<typeof MovieSchema>;

/////////////////////////////////////////
// GROUP SCHEMA
/////////////////////////////////////////

export const GroupSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  color: z.string(),
  ownerId: z.number().int(),
});

export type Group = z.infer<typeof GroupSchema>;

/////////////////////////////////////////
// GROUP INVITE SCHEMA
/////////////////////////////////////////

export const GroupInviteSchema = z.object({
  status: GroupInviteStatusSchema,
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sentAt: z.coerce.date(),
  respondedAt: z.coerce.date().nullable(),
  cancelledAt: z.coerce.date().nullable(),
  groupId: z.number().int(),
  email: z.string(),
  userId: z.number().int().nullable(),
});

export type GroupInvite = z.infer<typeof GroupInviteSchema>;

/////////////////////////////////////////
// USER GROUP SCHEMA
/////////////////////////////////////////

export const UserGroupSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.number().int(),
  groupId: z.number().int(),
});

export type UserGroup = z.infer<typeof UserGroupSchema>;

/////////////////////////////////////////
// MOVIE VOTE SCHEMA
/////////////////////////////////////////

export const MovieVoteSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.number().int(),
  movieId: z.number().int(),
  groupId: z.number().int().nullable(),
  vote: z.number().int(),
});

export type MovieVote = z.infer<typeof MovieVoteSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    identities: z
      .union([z.boolean(), z.lazy(() => UserIdentitiesFindManyArgsSchema)])
      .optional(),
    UserGroup: z
      .union([z.boolean(), z.lazy(() => UserGroupFindManyArgsSchema)])
      .optional(),
    Group: z
      .union([z.boolean(), z.lazy(() => GroupFindManyArgsSchema)])
      .optional(),
    MovieVote: z
      .union([z.boolean(), z.lazy(() => MovieVoteFindManyArgsSchema)])
      .optional(),
    GroupInvite: z
      .union([z.boolean(), z.lazy(() => GroupInviteFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      identities: z.boolean().optional(),
      UserGroup: z.boolean().optional(),
      Group: z.boolean().optional(),
      MovieVote: z.boolean().optional(),
      GroupInvite: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    emailAddress: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    avatar: z.boolean().optional(),
    identities: z
      .union([z.boolean(), z.lazy(() => UserIdentitiesFindManyArgsSchema)])
      .optional(),
    UserGroup: z
      .union([z.boolean(), z.lazy(() => UserGroupFindManyArgsSchema)])
      .optional(),
    Group: z
      .union([z.boolean(), z.lazy(() => GroupFindManyArgsSchema)])
      .optional(),
    MovieVote: z
      .union([z.boolean(), z.lazy(() => MovieVoteFindManyArgsSchema)])
      .optional(),
    GroupInvite: z
      .union([z.boolean(), z.lazy(() => GroupInviteFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// USER IDENTITIES
//------------------------------------------------------

export const UserIdentitiesIncludeSchema: z.ZodType<Prisma.UserIdentitiesInclude> =
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    })
    .strict();

export const UserIdentitiesArgsSchema: z.ZodType<Prisma.UserIdentitiesDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserIdentitiesSelectSchema).optional(),
      include: z.lazy(() => UserIdentitiesIncludeSchema).optional(),
    })
    .strict();

export const UserIdentitiesSelectSchema: z.ZodType<Prisma.UserIdentitiesSelect> =
  z
    .object({
      id: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      userId: z.boolean().optional(),
      provider: z.boolean().optional(),
      providerId: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    })
    .strict();

// MOVIE
//------------------------------------------------------

export const MovieIncludeSchema: z.ZodType<Prisma.MovieInclude> = z
  .object({
    MovieVote: z
      .union([z.boolean(), z.lazy(() => MovieVoteFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => MovieCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const MovieArgsSchema: z.ZodType<Prisma.MovieDefaultArgs> = z
  .object({
    select: z.lazy(() => MovieSelectSchema).optional(),
    include: z.lazy(() => MovieIncludeSchema).optional(),
  })
  .strict();

export const MovieCountOutputTypeArgsSchema: z.ZodType<Prisma.MovieCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => MovieCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const MovieCountOutputTypeSelectSchema: z.ZodType<Prisma.MovieCountOutputTypeSelect> =
  z
    .object({
      MovieVote: z.boolean().optional(),
    })
    .strict();

export const MovieSelectSchema: z.ZodType<Prisma.MovieSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    year: z.boolean().optional(),
    imdbId: z.boolean().optional(),
    type: z.boolean().optional(),
    posterUrl: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    MovieVote: z
      .union([z.boolean(), z.lazy(() => MovieVoteFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => MovieCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// GROUP
//------------------------------------------------------

export const GroupIncludeSchema: z.ZodType<Prisma.GroupInclude> = z
  .object({
    owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    users: z
      .union([z.boolean(), z.lazy(() => UserGroupFindManyArgsSchema)])
      .optional(),
    MovieVote: z
      .union([z.boolean(), z.lazy(() => MovieVoteFindManyArgsSchema)])
      .optional(),
    GroupInvite: z
      .union([z.boolean(), z.lazy(() => GroupInviteFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => GroupCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const GroupArgsSchema: z.ZodType<Prisma.GroupDefaultArgs> = z
  .object({
    select: z.lazy(() => GroupSelectSchema).optional(),
    include: z.lazy(() => GroupIncludeSchema).optional(),
  })
  .strict();

export const GroupCountOutputTypeArgsSchema: z.ZodType<Prisma.GroupCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => GroupCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const GroupCountOutputTypeSelectSchema: z.ZodType<Prisma.GroupCountOutputTypeSelect> =
  z
    .object({
      users: z.boolean().optional(),
      MovieVote: z.boolean().optional(),
      GroupInvite: z.boolean().optional(),
    })
    .strict();

export const GroupSelectSchema: z.ZodType<Prisma.GroupSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    image: z.boolean().optional(),
    color: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    users: z
      .union([z.boolean(), z.lazy(() => UserGroupFindManyArgsSchema)])
      .optional(),
    MovieVote: z
      .union([z.boolean(), z.lazy(() => MovieVoteFindManyArgsSchema)])
      .optional(),
    GroupInvite: z
      .union([z.boolean(), z.lazy(() => GroupInviteFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => GroupCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// GROUP INVITE
//------------------------------------------------------

export const GroupInviteIncludeSchema: z.ZodType<Prisma.GroupInviteInclude> = z
  .object({
    group: z.union([z.boolean(), z.lazy(() => GroupArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const GroupInviteArgsSchema: z.ZodType<Prisma.GroupInviteDefaultArgs> = z
  .object({
    select: z.lazy(() => GroupInviteSelectSchema).optional(),
    include: z.lazy(() => GroupInviteIncludeSchema).optional(),
  })
  .strict();

export const GroupInviteSelectSchema: z.ZodType<Prisma.GroupInviteSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    sentAt: z.boolean().optional(),
    respondedAt: z.boolean().optional(),
    cancelledAt: z.boolean().optional(),
    status: z.boolean().optional(),
    groupId: z.boolean().optional(),
    email: z.boolean().optional(),
    userId: z.boolean().optional(),
    group: z.union([z.boolean(), z.lazy(() => GroupArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// USER GROUP
//------------------------------------------------------

export const UserGroupIncludeSchema: z.ZodType<Prisma.UserGroupInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    group: z.union([z.boolean(), z.lazy(() => GroupArgsSchema)]).optional(),
  })
  .strict();

export const UserGroupArgsSchema: z.ZodType<Prisma.UserGroupDefaultArgs> = z
  .object({
    select: z.lazy(() => UserGroupSelectSchema).optional(),
    include: z.lazy(() => UserGroupIncludeSchema).optional(),
  })
  .strict();

export const UserGroupSelectSchema: z.ZodType<Prisma.UserGroupSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    groupId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    group: z.union([z.boolean(), z.lazy(() => GroupArgsSchema)]).optional(),
  })
  .strict();

// MOVIE VOTE
//------------------------------------------------------

export const MovieVoteIncludeSchema: z.ZodType<Prisma.MovieVoteInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    movie: z.union([z.boolean(), z.lazy(() => MovieArgsSchema)]).optional(),
    group: z.union([z.boolean(), z.lazy(() => GroupArgsSchema)]).optional(),
  })
  .strict();

export const MovieVoteArgsSchema: z.ZodType<Prisma.MovieVoteDefaultArgs> = z
  .object({
    select: z.lazy(() => MovieVoteSelectSchema).optional(),
    include: z.lazy(() => MovieVoteIncludeSchema).optional(),
  })
  .strict();

export const MovieVoteSelectSchema: z.ZodType<Prisma.MovieVoteSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    movieId: z.boolean().optional(),
    groupId: z.boolean().optional(),
    vote: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    movie: z.union([z.boolean(), z.lazy(() => MovieArgsSchema)]).optional(),
    group: z.union([z.boolean(), z.lazy(() => GroupArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    externalId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    emailAddress: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    firstName: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    lastName: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    avatar: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    identities: z.lazy(() => UserIdentitiesListRelationFilterSchema).optional(),
    UserGroup: z.lazy(() => UserGroupListRelationFilterSchema).optional(),
    Group: z.lazy(() => GroupListRelationFilterSchema).optional(),
    MovieVote: z.lazy(() => MovieVoteListRelationFilterSchema).optional(),
    GroupInvite: z.lazy(() => GroupInviteListRelationFilterSchema).optional(),
  })
  .strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      externalId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      emailAddress: z.lazy(() => SortOrderSchema).optional(),
      firstName: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      lastName: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      avatar: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      identities: z
        .lazy(() => UserIdentitiesOrderByRelationAggregateInputSchema)
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupOrderByRelationAggregateInputSchema)
        .optional(),
      Group: z.lazy(() => GroupOrderByRelationAggregateInputSchema).optional(),
      MovieVote: z
        .lazy(() => MovieVoteOrderByRelationAggregateInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        externalId: z.string(),
        emailAddress: z.string(),
      }),
      z.object({
        id: z.number().int(),
        externalId: z.string(),
      }),
      z.object({
        id: z.number().int(),
        emailAddress: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        externalId: z.string(),
        emailAddress: z.string(),
      }),
      z.object({
        externalId: z.string(),
      }),
      z.object({
        emailAddress: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          externalId: z.string().optional(),
          emailAddress: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          firstName: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          lastName: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          avatar: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          identities: z
            .lazy(() => UserIdentitiesListRelationFilterSchema)
            .optional(),
          UserGroup: z.lazy(() => UserGroupListRelationFilterSchema).optional(),
          Group: z.lazy(() => GroupListRelationFilterSchema).optional(),
          MovieVote: z.lazy(() => MovieVoteListRelationFilterSchema).optional(),
          GroupInvite: z
            .lazy(() => GroupInviteListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      externalId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      emailAddress: z.lazy(() => SortOrderSchema).optional(),
      firstName: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      lastName: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      avatar: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      externalId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      emailAddress: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      firstName: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserIdentitiesWhereInputSchema: z.ZodType<Prisma.UserIdentitiesWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserIdentitiesWhereInputSchema),
          z.lazy(() => UserIdentitiesWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserIdentitiesWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserIdentitiesWhereInputSchema),
          z.lazy(() => UserIdentitiesWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      provider: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      providerId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserIdentitiesOrderByWithRelationInputSchema: z.ZodType<Prisma.UserIdentitiesOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerId: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const UserIdentitiesWhereUniqueInputSchema: z.ZodType<Prisma.UserIdentitiesWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        provider_userId: z.lazy(
          () => UserIdentitiesProviderUserIdCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        provider_userId: z.lazy(
          () => UserIdentitiesProviderUserIdCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          provider_userId: z
            .lazy(() => UserIdentitiesProviderUserIdCompoundUniqueInputSchema)
            .optional(),
          AND: z
            .union([
              z.lazy(() => UserIdentitiesWhereInputSchema),
              z.lazy(() => UserIdentitiesWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserIdentitiesWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserIdentitiesWhereInputSchema),
              z.lazy(() => UserIdentitiesWhereInputSchema).array(),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          userId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          provider: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          providerId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const UserIdentitiesOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserIdentitiesOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => UserIdentitiesCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => UserIdentitiesAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => UserIdentitiesMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => UserIdentitiesMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => UserIdentitiesSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const UserIdentitiesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserIdentitiesScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserIdentitiesScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => UserIdentitiesScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserIdentitiesScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserIdentitiesScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => UserIdentitiesScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      provider: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      providerId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const MovieWhereInputSchema: z.ZodType<Prisma.MovieWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MovieWhereInputSchema),
        z.lazy(() => MovieWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MovieWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MovieWhereInputSchema),
        z.lazy(() => MovieWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    year: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    imdbId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    type: z
      .union([
        z.lazy(() => EnumMovieTypeFilterSchema),
        z.lazy(() => MovieTypeSchema),
      ])
      .optional(),
    posterUrl: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    MovieVote: z.lazy(() => MovieVoteListRelationFilterSchema).optional(),
  })
  .strict();

export const MovieOrderByWithRelationInputSchema: z.ZodType<Prisma.MovieOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      year: z.lazy(() => SortOrderSchema).optional(),
      imdbId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      posterUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      MovieVote: z
        .lazy(() => MovieVoteOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const MovieWhereUniqueInputSchema: z.ZodType<Prisma.MovieWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        imdbId: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        imdbId: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          imdbId: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => MovieWhereInputSchema),
              z.lazy(() => MovieWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MovieWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MovieWhereInputSchema),
              z.lazy(() => MovieWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          year: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          type: z
            .union([
              z.lazy(() => EnumMovieTypeFilterSchema),
              z.lazy(() => MovieTypeSchema),
            ])
            .optional(),
          posterUrl: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          MovieVote: z.lazy(() => MovieVoteListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const MovieOrderByWithAggregationInputSchema: z.ZodType<Prisma.MovieOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      year: z.lazy(() => SortOrderSchema).optional(),
      imdbId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      posterUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => MovieCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => MovieAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => MovieMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => MovieMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => MovieSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const MovieScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MovieScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MovieScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MovieScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MovieScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MovieScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MovieScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      year: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      imdbId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      type: z
        .union([
          z.lazy(() => EnumMovieTypeWithAggregatesFilterSchema),
          z.lazy(() => MovieTypeSchema),
        ])
        .optional(),
      posterUrl: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const GroupWhereInputSchema: z.ZodType<Prisma.GroupWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => GroupWhereInputSchema),
        z.lazy(() => GroupWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => GroupWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => GroupWhereInputSchema),
        z.lazy(() => GroupWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    color: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ownerId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    owner: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    users: z.lazy(() => UserGroupListRelationFilterSchema).optional(),
    MovieVote: z.lazy(() => MovieVoteListRelationFilterSchema).optional(),
    GroupInvite: z.lazy(() => GroupInviteListRelationFilterSchema).optional(),
  })
  .strict();

export const GroupOrderByWithRelationInputSchema: z.ZodType<Prisma.GroupOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      color: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      users: z
        .lazy(() => UserGroupOrderByRelationAggregateInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteOrderByRelationAggregateInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const GroupWhereUniqueInputSchema: z.ZodType<Prisma.GroupWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => GroupWhereInputSchema),
              z.lazy(() => GroupWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => GroupWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => GroupWhereInputSchema),
              z.lazy(() => GroupWhereInputSchema).array(),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          image: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          color: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          ownerId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          owner: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          users: z.lazy(() => UserGroupListRelationFilterSchema).optional(),
          MovieVote: z.lazy(() => MovieVoteListRelationFilterSchema).optional(),
          GroupInvite: z
            .lazy(() => GroupInviteListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const GroupOrderByWithAggregationInputSchema: z.ZodType<Prisma.GroupOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      color: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => GroupCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => GroupAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => GroupMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => GroupMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => GroupSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const GroupScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GroupScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GroupScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GroupScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GroupScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GroupScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      color: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      ownerId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const GroupInviteWhereInputSchema: z.ZodType<Prisma.GroupInviteWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GroupInviteWhereInputSchema),
          z.lazy(() => GroupInviteWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GroupInviteWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GroupInviteWhereInputSchema),
          z.lazy(() => GroupInviteWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      sentAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      respondedAt: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => EnumGroupInviteStatusFilterSchema),
          z.lazy(() => GroupInviteStatusSchema),
        ])
        .optional(),
      groupId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      group: z
        .union([
          z.lazy(() => GroupRelationFilterSchema),
          z.lazy(() => GroupWhereInputSchema),
        ])
        .optional(),
      user: z
        .union([
          z.lazy(() => UserNullableRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const GroupInviteOrderByWithRelationInputSchema: z.ZodType<Prisma.GroupInviteOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      sentAt: z.lazy(() => SortOrderSchema).optional(),
      respondedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      cancelledAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      userId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      group: z.lazy(() => GroupOrderByWithRelationInputSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const GroupInviteWhereUniqueInputSchema: z.ZodType<Prisma.GroupInviteWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => GroupInviteWhereInputSchema),
              z.lazy(() => GroupInviteWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => GroupInviteWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => GroupInviteWhereInputSchema),
              z.lazy(() => GroupInviteWhereInputSchema).array(),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          sentAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          respondedAt: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          cancelledAt: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          status: z
            .union([
              z.lazy(() => EnumGroupInviteStatusFilterSchema),
              z.lazy(() => GroupInviteStatusSchema),
            ])
            .optional(),
          groupId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          email: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          userId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          group: z
            .union([
              z.lazy(() => GroupRelationFilterSchema),
              z.lazy(() => GroupWhereInputSchema),
            ])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserNullableRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const GroupInviteOrderByWithAggregationInputSchema: z.ZodType<Prisma.GroupInviteOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      sentAt: z.lazy(() => SortOrderSchema).optional(),
      respondedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      cancelledAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      userId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => GroupInviteCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => GroupInviteAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => GroupInviteMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => GroupInviteMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => GroupInviteSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const GroupInviteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GroupInviteScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GroupInviteScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GroupInviteScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GroupInviteScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GroupInviteScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GroupInviteScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      sentAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => EnumGroupInviteStatusWithAggregatesFilterSchema),
          z.lazy(() => GroupInviteStatusSchema),
        ])
        .optional(),
      groupId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      email: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserGroupWhereInputSchema: z.ZodType<Prisma.UserGroupWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserGroupWhereInputSchema),
          z.lazy(() => UserGroupWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserGroupWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserGroupWhereInputSchema),
          z.lazy(() => UserGroupWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      groupId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.lazy(() => GroupRelationFilterSchema),
          z.lazy(() => GroupWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserGroupOrderByWithRelationInputSchema: z.ZodType<Prisma.UserGroupOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      group: z.lazy(() => GroupOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const UserGroupWhereUniqueInputSchema: z.ZodType<Prisma.UserGroupWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => UserGroupWhereInputSchema),
              z.lazy(() => UserGroupWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserGroupWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserGroupWhereInputSchema),
              z.lazy(() => UserGroupWhereInputSchema).array(),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          userId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          groupId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          group: z
            .union([
              z.lazy(() => GroupRelationFilterSchema),
              z.lazy(() => GroupWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const UserGroupOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserGroupOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => UserGroupCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => UserGroupAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserGroupMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserGroupMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => UserGroupSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserGroupScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserGroupScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserGroupScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserGroupScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserGroupScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserGroupScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserGroupScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      groupId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const MovieVoteWhereInputSchema: z.ZodType<Prisma.MovieVoteWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MovieVoteWhereInputSchema),
          z.lazy(() => MovieVoteWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MovieVoteWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MovieVoteWhereInputSchema),
          z.lazy(() => MovieVoteWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      movieId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      groupId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      vote: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional(),
      movie: z
        .union([
          z.lazy(() => MovieRelationFilterSchema),
          z.lazy(() => MovieWhereInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.lazy(() => GroupNullableRelationFilterSchema),
          z.lazy(() => GroupWhereInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MovieVoteOrderByWithRelationInputSchema: z.ZodType<Prisma.MovieVoteOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      movieId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      vote: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      movie: z.lazy(() => MovieOrderByWithRelationInputSchema).optional(),
      group: z.lazy(() => GroupOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const MovieVoteWhereUniqueInputSchema: z.ZodType<Prisma.MovieVoteWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        userId_movieId_groupId: z.lazy(
          () => MovieVoteUserIdMovieIdGroupIdCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        userId_movieId_groupId: z.lazy(
          () => MovieVoteUserIdMovieIdGroupIdCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          userId_movieId_groupId: z
            .lazy(() => MovieVoteUserIdMovieIdGroupIdCompoundUniqueInputSchema)
            .optional(),
          AND: z
            .union([
              z.lazy(() => MovieVoteWhereInputSchema),
              z.lazy(() => MovieVoteWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MovieVoteWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MovieVoteWhereInputSchema),
              z.lazy(() => MovieVoteWhereInputSchema).array(),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          userId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          movieId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          groupId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          vote: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          movie: z
            .union([
              z.lazy(() => MovieRelationFilterSchema),
              z.lazy(() => MovieWhereInputSchema),
            ])
            .optional(),
          group: z
            .union([
              z.lazy(() => GroupNullableRelationFilterSchema),
              z.lazy(() => GroupWhereInputSchema),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const MovieVoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.MovieVoteOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      movieId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      vote: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => MovieVoteCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => MovieVoteAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => MovieVoteMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => MovieVoteMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => MovieVoteSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const MovieVoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MovieVoteScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MovieVoteScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MovieVoteScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MovieVoteScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MovieVoteScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MovieVoteScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      movieId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      groupId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      vote: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    externalId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    emailAddress: z.string(),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    avatar: z.string().optional().nullable(),
    identities: z
      .lazy(() => UserIdentitiesCreateNestedManyWithoutUserInputSchema)
      .optional(),
    UserGroup: z
      .lazy(() => UserGroupCreateNestedManyWithoutUserInputSchema)
      .optional(),
    Group: z
      .lazy(() => GroupCreateNestedManyWithoutOwnerInputSchema)
      .optional(),
    MovieVote: z
      .lazy(() => MovieVoteCreateNestedManyWithoutUserInputSchema)
      .optional(),
    GroupInvite: z
      .lazy(() => GroupInviteCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedCreateNestedManyWithoutUserInputSchema,
        )
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    externalId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    emailAddress: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    firstName: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    lastName: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    avatar: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    identities: z
      .lazy(() => UserIdentitiesUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    UserGroup: z
      .lazy(() => UserGroupUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    Group: z
      .lazy(() => GroupUpdateManyWithoutOwnerNestedInputSchema)
      .optional(),
    MovieVote: z
      .lazy(() => MovieVoteUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    GroupInvite: z
      .lazy(() => GroupInviteUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedUpdateManyWithoutUserNestedInputSchema,
        )
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
    })
    .strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserIdentitiesCreateInputSchema: z.ZodType<Prisma.UserIdentitiesCreateInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      provider: z.string(),
      providerId: z.string(),
      user: z.lazy(() => UserCreateNestedOneWithoutIdentitiesInputSchema),
    })
    .strict();

export const UserIdentitiesUncheckedCreateInputSchema: z.ZodType<Prisma.UserIdentitiesUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      provider: z.string(),
      providerId: z.string(),
    })
    .strict();

export const UserIdentitiesUpdateInputSchema: z.ZodType<Prisma.UserIdentitiesUpdateInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutIdentitiesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserIdentitiesUncheckedUpdateInputSchema: z.ZodType<Prisma.UserIdentitiesUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserIdentitiesCreateManyInputSchema: z.ZodType<Prisma.UserIdentitiesCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      provider: z.string(),
      providerId: z.string(),
    })
    .strict();

export const UserIdentitiesUpdateManyMutationInputSchema: z.ZodType<Prisma.UserIdentitiesUpdateManyMutationInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserIdentitiesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserIdentitiesUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieCreateInputSchema: z.ZodType<Prisma.MovieCreateInput> = z
  .object({
    title: z.string(),
    year: z.number().int(),
    imdbId: z.string(),
    type: z.lazy(() => MovieTypeSchema),
    posterUrl: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    MovieVote: z
      .lazy(() => MovieVoteCreateNestedManyWithoutMovieInputSchema)
      .optional(),
  })
  .strict();

export const MovieUncheckedCreateInputSchema: z.ZodType<Prisma.MovieUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string(),
      year: z.number().int(),
      imdbId: z.string(),
      type: z.lazy(() => MovieTypeSchema),
      posterUrl: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutMovieInputSchema)
        .optional(),
    })
    .strict();

export const MovieUpdateInputSchema: z.ZodType<Prisma.MovieUpdateInput> = z
  .object({
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    year: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    imdbId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    type: z
      .union([
        z.lazy(() => MovieTypeSchema),
        z.lazy(() => EnumMovieTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    posterUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    MovieVote: z
      .lazy(() => MovieVoteUpdateManyWithoutMovieNestedInputSchema)
      .optional(),
  })
  .strict();

export const MovieUncheckedUpdateInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      year: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imdbId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MovieTypeSchema),
          z.lazy(() => EnumMovieTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      posterUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutMovieNestedInputSchema)
        .optional(),
    })
    .strict();

export const MovieCreateManyInputSchema: z.ZodType<Prisma.MovieCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string(),
      year: z.number().int(),
      imdbId: z.string(),
      type: z.lazy(() => MovieTypeSchema),
      posterUrl: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const MovieUpdateManyMutationInputSchema: z.ZodType<Prisma.MovieUpdateManyMutationInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      year: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imdbId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MovieTypeSchema),
          z.lazy(() => EnumMovieTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      posterUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      year: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imdbId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MovieTypeSchema),
          z.lazy(() => EnumMovieTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      posterUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupCreateInputSchema: z.ZodType<Prisma.GroupCreateInput> = z
  .object({
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    color: z.string(),
    owner: z.lazy(() => UserCreateNestedOneWithoutGroupInputSchema),
    users: z
      .lazy(() => UserGroupCreateNestedManyWithoutGroupInputSchema)
      .optional(),
    MovieVote: z
      .lazy(() => MovieVoteCreateNestedManyWithoutGroupInputSchema)
      .optional(),
    GroupInvite: z
      .lazy(() => GroupInviteCreateNestedManyWithoutGroupInputSchema)
      .optional(),
  })
  .strict();

export const GroupUncheckedCreateInputSchema: z.ZodType<Prisma.GroupUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      ownerId: z.number().int(),
      users: z
        .lazy(() => UserGroupUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
    })
    .strict();

export const GroupUpdateInputSchema: z.ZodType<Prisma.GroupUpdateInput> = z
  .object({
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    description: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    color: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    owner: z
      .lazy(() => UserUpdateOneRequiredWithoutGroupNestedInputSchema)
      .optional(),
    users: z
      .lazy(() => UserGroupUpdateManyWithoutGroupNestedInputSchema)
      .optional(),
    MovieVote: z
      .lazy(() => MovieVoteUpdateManyWithoutGroupNestedInputSchema)
      .optional(),
    GroupInvite: z
      .lazy(() => GroupInviteUpdateManyWithoutGroupNestedInputSchema)
      .optional(),
  })
  .strict();

export const GroupUncheckedUpdateInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      users: z
        .lazy(() => UserGroupUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupCreateManyInputSchema: z.ZodType<Prisma.GroupCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      ownerId: z.number().int(),
    })
    .strict();

export const GroupUpdateManyMutationInputSchema: z.ZodType<Prisma.GroupUpdateManyMutationInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteCreateInputSchema: z.ZodType<Prisma.GroupInviteCreateInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sentAt: z.coerce.date(),
      respondedAt: z.coerce.date().optional().nullable(),
      cancelledAt: z.coerce.date().optional().nullable(),
      status: z.lazy(() => GroupInviteStatusSchema),
      email: z.string(),
      group: z.lazy(() => GroupCreateNestedOneWithoutGroupInviteInputSchema),
      user: z
        .lazy(() => UserCreateNestedOneWithoutGroupInviteInputSchema)
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedCreateInputSchema: z.ZodType<Prisma.GroupInviteUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sentAt: z.coerce.date(),
      respondedAt: z.coerce.date().optional().nullable(),
      cancelledAt: z.coerce.date().optional().nullable(),
      status: z.lazy(() => GroupInviteStatusSchema),
      groupId: z.number().int(),
      email: z.string(),
      userId: z.number().int().optional().nullable(),
    })
    .strict();

export const GroupInviteUpdateInputSchema: z.ZodType<Prisma.GroupInviteUpdateInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .lazy(() => GroupUpdateOneRequiredWithoutGroupInviteNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutGroupInviteNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedUpdateInputSchema: z.ZodType<Prisma.GroupInviteUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const GroupInviteCreateManyInputSchema: z.ZodType<Prisma.GroupInviteCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sentAt: z.coerce.date(),
      respondedAt: z.coerce.date().optional().nullable(),
      cancelledAt: z.coerce.date().optional().nullable(),
      status: z.lazy(() => GroupInviteStatusSchema),
      groupId: z.number().int(),
      email: z.string(),
      userId: z.number().int().optional().nullable(),
    })
    .strict();

export const GroupInviteUpdateManyMutationInputSchema: z.ZodType<Prisma.GroupInviteUpdateManyMutationInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GroupInviteUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserGroupCreateInputSchema: z.ZodType<Prisma.UserGroupCreateInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutUserGroupInputSchema),
      group: z.lazy(() => GroupCreateNestedOneWithoutUsersInputSchema),
    })
    .strict();

export const UserGroupUncheckedCreateInputSchema: z.ZodType<Prisma.UserGroupUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      groupId: z.number().int(),
    })
    .strict();

export const UserGroupUpdateInputSchema: z.ZodType<Prisma.UserGroupUpdateInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutUserGroupNestedInputSchema)
        .optional(),
      group: z
        .lazy(() => GroupUpdateOneRequiredWithoutUsersNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserGroupUncheckedUpdateInputSchema: z.ZodType<Prisma.UserGroupUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserGroupCreateManyInputSchema: z.ZodType<Prisma.UserGroupCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      groupId: z.number().int(),
    })
    .strict();

export const UserGroupUpdateManyMutationInputSchema: z.ZodType<Prisma.UserGroupUpdateManyMutationInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserGroupUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteCreateInputSchema: z.ZodType<Prisma.MovieVoteCreateInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      vote: z.number().int(),
      user: z.lazy(() => UserCreateNestedOneWithoutMovieVoteInputSchema),
      movie: z.lazy(() => MovieCreateNestedOneWithoutMovieVoteInputSchema),
      group: z
        .lazy(() => GroupCreateNestedOneWithoutMovieVoteInputSchema)
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedCreateInputSchema: z.ZodType<Prisma.MovieVoteUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      movieId: z.number().int(),
      groupId: z.number().int().optional().nullable(),
      vote: z.number().int(),
    })
    .strict();

export const MovieVoteUpdateInputSchema: z.ZodType<Prisma.MovieVoteUpdateInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutMovieVoteNestedInputSchema)
        .optional(),
      movie: z
        .lazy(() => MovieUpdateOneRequiredWithoutMovieVoteNestedInputSchema)
        .optional(),
      group: z
        .lazy(() => GroupUpdateOneWithoutMovieVoteNestedInputSchema)
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      movieId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteCreateManyInputSchema: z.ZodType<Prisma.MovieVoteCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      movieId: z.number().int(),
      groupId: z.number().int().optional().nullable(),
      vote: z.number().int(),
    })
    .strict();

export const MovieVoteUpdateManyMutationInputSchema: z.ZodType<Prisma.MovieVoteUpdateManyMutationInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      movieId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const UserIdentitiesListRelationFilterSchema: z.ZodType<Prisma.UserIdentitiesListRelationFilter> =
  z
    .object({
      every: z.lazy(() => UserIdentitiesWhereInputSchema).optional(),
      some: z.lazy(() => UserIdentitiesWhereInputSchema).optional(),
      none: z.lazy(() => UserIdentitiesWhereInputSchema).optional(),
    })
    .strict();

export const UserGroupListRelationFilterSchema: z.ZodType<Prisma.UserGroupListRelationFilter> =
  z
    .object({
      every: z.lazy(() => UserGroupWhereInputSchema).optional(),
      some: z.lazy(() => UserGroupWhereInputSchema).optional(),
      none: z.lazy(() => UserGroupWhereInputSchema).optional(),
    })
    .strict();

export const GroupListRelationFilterSchema: z.ZodType<Prisma.GroupListRelationFilter> =
  z
    .object({
      every: z.lazy(() => GroupWhereInputSchema).optional(),
      some: z.lazy(() => GroupWhereInputSchema).optional(),
      none: z.lazy(() => GroupWhereInputSchema).optional(),
    })
    .strict();

export const MovieVoteListRelationFilterSchema: z.ZodType<Prisma.MovieVoteListRelationFilter> =
  z
    .object({
      every: z.lazy(() => MovieVoteWhereInputSchema).optional(),
      some: z.lazy(() => MovieVoteWhereInputSchema).optional(),
      none: z.lazy(() => MovieVoteWhereInputSchema).optional(),
    })
    .strict();

export const GroupInviteListRelationFilterSchema: z.ZodType<Prisma.GroupInviteListRelationFilter> =
  z
    .object({
      every: z.lazy(() => GroupInviteWhereInputSchema).optional(),
      some: z.lazy(() => GroupInviteWhereInputSchema).optional(),
      none: z.lazy(() => GroupInviteWhereInputSchema).optional(),
    })
    .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const UserIdentitiesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserIdentitiesOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserGroupOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserGroupOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GroupOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieVoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MovieVoteOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupInviteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GroupInviteOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      externalId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      emailAddress: z.lazy(() => SortOrderSchema).optional(),
      firstName: z.lazy(() => SortOrderSchema).optional(),
      lastName: z.lazy(() => SortOrderSchema).optional(),
      avatar: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      externalId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      emailAddress: z.lazy(() => SortOrderSchema).optional(),
      firstName: z.lazy(() => SortOrderSchema).optional(),
      lastName: z.lazy(() => SortOrderSchema).optional(),
      avatar: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      externalId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      emailAddress: z.lazy(() => SortOrderSchema).optional(),
      firstName: z.lazy(() => SortOrderSchema).optional(),
      lastName: z.lazy(() => SortOrderSchema).optional(),
      avatar: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict();

export const UserIdentitiesProviderUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserIdentitiesProviderUserIdCompoundUniqueInput> =
  z
    .object({
      provider: z.string(),
      userId: z.number(),
    })
    .strict();

export const UserIdentitiesCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserIdentitiesCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserIdentitiesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserIdentitiesAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserIdentitiesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserIdentitiesMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserIdentitiesMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserIdentitiesMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserIdentitiesSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserIdentitiesSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumMovieTypeFilterSchema: z.ZodType<Prisma.EnumMovieTypeFilter> =
  z
    .object({
      equals: z.lazy(() => MovieTypeSchema).optional(),
      in: z
        .lazy(() => MovieTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MovieTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MovieTypeSchema),
          z.lazy(() => NestedEnumMovieTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieCountOrderByAggregateInputSchema: z.ZodType<Prisma.MovieCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      year: z.lazy(() => SortOrderSchema).optional(),
      imdbId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      posterUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MovieAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      year: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MovieMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      year: z.lazy(() => SortOrderSchema).optional(),
      imdbId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      posterUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieMinOrderByAggregateInputSchema: z.ZodType<Prisma.MovieMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      year: z.lazy(() => SortOrderSchema).optional(),
      imdbId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      posterUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieSumOrderByAggregateInputSchema: z.ZodType<Prisma.MovieSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      year: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumMovieTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMovieTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MovieTypeSchema).optional(),
      in: z
        .lazy(() => MovieTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MovieTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MovieTypeSchema),
          z.lazy(() => NestedEnumMovieTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMovieTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMovieTypeFilterSchema).optional(),
    })
    .strict();

export const GroupCountOrderByAggregateInputSchema: z.ZodType<Prisma.GroupCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      color: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GroupAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GroupMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      color: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupMinOrderByAggregateInputSchema: z.ZodType<Prisma.GroupMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      color: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupSumOrderByAggregateInputSchema: z.ZodType<Prisma.GroupSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const EnumGroupInviteStatusFilterSchema: z.ZodType<Prisma.EnumGroupInviteStatusFilter> =
  z
    .object({
      equals: z.lazy(() => GroupInviteStatusSchema).optional(),
      in: z
        .lazy(() => GroupInviteStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => GroupInviteStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => NestedEnumGroupInviteStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const GroupRelationFilterSchema: z.ZodType<Prisma.GroupRelationFilter> =
  z
    .object({
      is: z.lazy(() => GroupWhereInputSchema).optional(),
      isNot: z.lazy(() => GroupWhereInputSchema).optional(),
    })
    .strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => UserWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => UserWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const GroupInviteCountOrderByAggregateInputSchema: z.ZodType<Prisma.GroupInviteCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      sentAt: z.lazy(() => SortOrderSchema).optional(),
      respondedAt: z.lazy(() => SortOrderSchema).optional(),
      cancelledAt: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupInviteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GroupInviteAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupInviteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GroupInviteMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      sentAt: z.lazy(() => SortOrderSchema).optional(),
      respondedAt: z.lazy(() => SortOrderSchema).optional(),
      cancelledAt: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupInviteMinOrderByAggregateInputSchema: z.ZodType<Prisma.GroupInviteMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      sentAt: z.lazy(() => SortOrderSchema).optional(),
      respondedAt: z.lazy(() => SortOrderSchema).optional(),
      cancelledAt: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GroupInviteSumOrderByAggregateInputSchema: z.ZodType<Prisma.GroupInviteSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const EnumGroupInviteStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGroupInviteStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => GroupInviteStatusSchema).optional(),
      in: z
        .lazy(() => GroupInviteStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => GroupInviteStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => NestedEnumGroupInviteStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumGroupInviteStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumGroupInviteStatusFilterSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const UserGroupCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserGroupCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserGroupAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserGroupAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserGroupMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserGroupMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserGroupMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserGroupMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserGroupSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserGroupSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieRelationFilterSchema: z.ZodType<Prisma.MovieRelationFilter> =
  z
    .object({
      is: z.lazy(() => MovieWhereInputSchema).optional(),
      isNot: z.lazy(() => MovieWhereInputSchema).optional(),
    })
    .strict();

export const GroupNullableRelationFilterSchema: z.ZodType<Prisma.GroupNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => GroupWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => GroupWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const MovieVoteUserIdMovieIdGroupIdCompoundUniqueInputSchema: z.ZodType<Prisma.MovieVoteUserIdMovieIdGroupIdCompoundUniqueInput> =
  z
    .object({
      userId: z.number(),
      movieId: z.number(),
      groupId: z.number(),
    })
    .strict();

export const MovieVoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.MovieVoteCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      movieId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      vote: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieVoteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MovieVoteAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      movieId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      vote: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieVoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MovieVoteMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      movieId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      vote: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieVoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.MovieVoteMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      movieId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      vote: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MovieVoteSumOrderByAggregateInputSchema: z.ZodType<Prisma.MovieVoteSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      movieId: z.lazy(() => SortOrderSchema).optional(),
      groupId: z.lazy(() => SortOrderSchema).optional(),
      vote: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserIdentitiesCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema),
          z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema).array(),
          z.lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserIdentitiesCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserIdentitiesCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserGroupCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserGroupCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserGroupCreateWithoutUserInputSchema),
          z.lazy(() => UserGroupCreateWithoutUserInputSchema).array(),
          z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserGroupCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => UserGroupCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserGroupCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.GroupCreateNestedManyWithoutOwnerInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutOwnerInputSchema),
          z.lazy(() => GroupCreateWithoutOwnerInputSchema).array(),
          z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupCreateOrConnectWithoutOwnerInputSchema),
          z.lazy(() => GroupCreateOrConnectWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupCreateManyOwnerInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutUserInputSchema),
          z.lazy(() => MovieVoteCreateWithoutUserInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupInviteCreateWithoutUserInputSchema),
          z.lazy(() => GroupInviteCreateWithoutUserInputSchema).array(),
          z.lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupInviteCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupInviteCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserIdentitiesUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema),
          z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema).array(),
          z.lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserIdentitiesCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserIdentitiesCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserGroupUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserGroupCreateWithoutUserInputSchema),
          z.lazy(() => UserGroupCreateWithoutUserInputSchema).array(),
          z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserGroupCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => UserGroupCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserGroupCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.GroupUncheckedCreateNestedManyWithoutOwnerInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutOwnerInputSchema),
          z.lazy(() => GroupCreateWithoutOwnerInputSchema).array(),
          z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupCreateOrConnectWithoutOwnerInputSchema),
          z.lazy(() => GroupCreateOrConnectWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupCreateManyOwnerInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutUserInputSchema),
          z.lazy(() => MovieVoteCreateWithoutUserInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupInviteCreateWithoutUserInputSchema),
          z.lazy(() => GroupInviteCreateWithoutUserInputSchema).array(),
          z.lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupInviteCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupInviteCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const UserIdentitiesUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserIdentitiesUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema),
          z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema).array(),
          z.lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserIdentitiesCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => UserIdentitiesUpsertWithWhereUniqueWithoutUserInputSchema,
          ),
          z
            .lazy(
              () => UserIdentitiesUpsertWithWhereUniqueWithoutUserInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserIdentitiesCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => UserIdentitiesUpdateWithWhereUniqueWithoutUserInputSchema,
          ),
          z
            .lazy(
              () => UserIdentitiesUpdateWithWhereUniqueWithoutUserInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserIdentitiesUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserIdentitiesScalarWhereInputSchema),
          z.lazy(() => UserIdentitiesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserGroupUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserGroupCreateWithoutUserInputSchema),
          z.lazy(() => UserGroupCreateWithoutUserInputSchema).array(),
          z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserGroupCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => UserGroupCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserGroupUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => UserGroupUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserGroupCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserGroupUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => UserGroupUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserGroupUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => UserGroupUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserGroupScalarWhereInputSchema),
          z.lazy(() => UserGroupScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.GroupUpdateManyWithoutOwnerNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutOwnerInputSchema),
          z.lazy(() => GroupCreateWithoutOwnerInputSchema).array(),
          z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupCreateOrConnectWithoutOwnerInputSchema),
          z.lazy(() => GroupCreateOrConnectWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => GroupUpsertWithWhereUniqueWithoutOwnerInputSchema),
          z
            .lazy(() => GroupUpsertWithWhereUniqueWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupCreateManyOwnerInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => GroupUpdateWithWhereUniqueWithoutOwnerInputSchema),
          z
            .lazy(() => GroupUpdateWithWhereUniqueWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => GroupUpdateManyWithWhereWithoutOwnerInputSchema),
          z.lazy(() => GroupUpdateManyWithWhereWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => GroupScalarWhereInputSchema),
          z.lazy(() => GroupScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MovieVoteUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutUserInputSchema),
          z.lazy(() => MovieVoteCreateWithoutUserInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MovieVoteUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => MovieVoteUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MovieVoteUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => MovieVoteUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MovieVoteUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => MovieVoteUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MovieVoteScalarWhereInputSchema),
          z.lazy(() => MovieVoteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GroupInviteUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupInviteCreateWithoutUserInputSchema),
          z.lazy(() => GroupInviteCreateWithoutUserInputSchema).array(),
          z.lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupInviteCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => GroupInviteUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupInviteCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => GroupInviteUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => GroupInviteUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => GroupInviteScalarWhereInputSchema),
          z.lazy(() => GroupInviteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const UserIdentitiesUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserIdentitiesUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema),
          z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema).array(),
          z.lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserIdentitiesCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => UserIdentitiesUpsertWithWhereUniqueWithoutUserInputSchema,
          ),
          z
            .lazy(
              () => UserIdentitiesUpsertWithWhereUniqueWithoutUserInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserIdentitiesCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
          z.lazy(() => UserIdentitiesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => UserIdentitiesUpdateWithWhereUniqueWithoutUserInputSchema,
          ),
          z
            .lazy(
              () => UserIdentitiesUpdateWithWhereUniqueWithoutUserInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserIdentitiesUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => UserIdentitiesUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserIdentitiesScalarWhereInputSchema),
          z.lazy(() => UserIdentitiesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserGroupUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserGroupCreateWithoutUserInputSchema),
          z.lazy(() => UserGroupCreateWithoutUserInputSchema).array(),
          z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserGroupCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => UserGroupCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserGroupUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => UserGroupUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserGroupCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserGroupUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => UserGroupUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserGroupUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => UserGroupUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserGroupScalarWhereInputSchema),
          z.lazy(() => UserGroupScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateManyWithoutOwnerNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutOwnerInputSchema),
          z.lazy(() => GroupCreateWithoutOwnerInputSchema).array(),
          z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupCreateOrConnectWithoutOwnerInputSchema),
          z.lazy(() => GroupCreateOrConnectWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => GroupUpsertWithWhereUniqueWithoutOwnerInputSchema),
          z
            .lazy(() => GroupUpsertWithWhereUniqueWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupCreateManyOwnerInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupWhereUniqueInputSchema),
          z.lazy(() => GroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => GroupUpdateWithWhereUniqueWithoutOwnerInputSchema),
          z
            .lazy(() => GroupUpdateWithWhereUniqueWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => GroupUpdateManyWithWhereWithoutOwnerInputSchema),
          z.lazy(() => GroupUpdateManyWithWhereWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => GroupScalarWhereInputSchema),
          z.lazy(() => GroupScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutUserInputSchema),
          z.lazy(() => MovieVoteCreateWithoutUserInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MovieVoteUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => MovieVoteUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MovieVoteUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => MovieVoteUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MovieVoteUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => MovieVoteUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MovieVoteScalarWhereInputSchema),
          z.lazy(() => MovieVoteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GroupInviteUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupInviteCreateWithoutUserInputSchema),
          z.lazy(() => GroupInviteCreateWithoutUserInputSchema).array(),
          z.lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupInviteCreateOrConnectWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteCreateOrConnectWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => GroupInviteUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupInviteCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => GroupInviteUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => GroupInviteUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => GroupInviteUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => GroupInviteScalarWhereInputSchema),
          z.lazy(() => GroupInviteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutIdentitiesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutIdentitiesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutIdentitiesInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutIdentitiesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutIdentitiesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutIdentitiesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutIdentitiesInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutIdentitiesInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutIdentitiesInputSchema),
          z.lazy(() => UserUpdateWithoutIdentitiesInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutIdentitiesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteCreateNestedManyWithoutMovieInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutMovieInputSchema),
          z.lazy(() => MovieVoteCreateWithoutMovieInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutMovieInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutMovieInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyMovieInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedCreateNestedManyWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteUncheckedCreateNestedManyWithoutMovieInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutMovieInputSchema),
          z.lazy(() => MovieVoteCreateWithoutMovieInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutMovieInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutMovieInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyMovieInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumMovieTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMovieTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => MovieTypeSchema).optional(),
    })
    .strict();

export const MovieVoteUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.MovieVoteUpdateManyWithoutMovieNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutMovieInputSchema),
          z.lazy(() => MovieVoteCreateWithoutMovieInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutMovieInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutMovieInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MovieVoteUpsertWithWhereUniqueWithoutMovieInputSchema),
          z
            .lazy(() => MovieVoteUpsertWithWhereUniqueWithoutMovieInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyMovieInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MovieVoteUpdateWithWhereUniqueWithoutMovieInputSchema),
          z
            .lazy(() => MovieVoteUpdateWithWhereUniqueWithoutMovieInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MovieVoteUpdateManyWithWhereWithoutMovieInputSchema),
          z
            .lazy(() => MovieVoteUpdateManyWithWhereWithoutMovieInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MovieVoteScalarWhereInputSchema),
          z.lazy(() => MovieVoteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateManyWithoutMovieNestedInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateManyWithoutMovieNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutMovieInputSchema),
          z.lazy(() => MovieVoteCreateWithoutMovieInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutMovieInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutMovieInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MovieVoteUpsertWithWhereUniqueWithoutMovieInputSchema),
          z
            .lazy(() => MovieVoteUpsertWithWhereUniqueWithoutMovieInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyMovieInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MovieVoteUpdateWithWhereUniqueWithoutMovieInputSchema),
          z
            .lazy(() => MovieVoteUpdateWithWhereUniqueWithoutMovieInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MovieVoteUpdateManyWithWhereWithoutMovieInputSchema),
          z
            .lazy(() => MovieVoteUpdateManyWithWhereWithoutMovieInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MovieVoteScalarWhereInputSchema),
          z.lazy(() => MovieVoteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutGroupInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGroupInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutGroupInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutGroupInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutGroupInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserGroupCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupCreateNestedManyWithoutGroupInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserGroupCreateWithoutGroupInputSchema),
          z.lazy(() => UserGroupCreateWithoutGroupInputSchema).array(),
          z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema),
          z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserGroupCreateOrConnectWithoutGroupInputSchema),
          z.lazy(() => UserGroupCreateOrConnectWithoutGroupInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserGroupCreateManyGroupInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteCreateNestedManyWithoutGroupInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutGroupInputSchema),
          z.lazy(() => MovieVoteCreateWithoutGroupInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutGroupInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutGroupInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyGroupInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteCreateNestedManyWithoutGroupInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupInviteCreateWithoutGroupInputSchema),
          z.lazy(() => GroupInviteCreateWithoutGroupInputSchema).array(),
          z.lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupInviteCreateOrConnectWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteCreateOrConnectWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupInviteCreateManyGroupInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUncheckedCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupUncheckedCreateNestedManyWithoutGroupInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserGroupCreateWithoutGroupInputSchema),
          z.lazy(() => UserGroupCreateWithoutGroupInputSchema).array(),
          z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema),
          z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserGroupCreateOrConnectWithoutGroupInputSchema),
          z.lazy(() => UserGroupCreateOrConnectWithoutGroupInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserGroupCreateManyGroupInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteUncheckedCreateNestedManyWithoutGroupInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutGroupInputSchema),
          z.lazy(() => MovieVoteCreateWithoutGroupInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutGroupInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutGroupInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyGroupInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedCreateNestedManyWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteUncheckedCreateNestedManyWithoutGroupInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupInviteCreateWithoutGroupInputSchema),
          z.lazy(() => GroupInviteCreateWithoutGroupInputSchema).array(),
          z.lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupInviteCreateOrConnectWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteCreateOrConnectWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupInviteCreateManyGroupInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutGroupNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutGroupNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutGroupInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutGroupInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutGroupInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutGroupInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutGroupInputSchema),
          z.lazy(() => UserUpdateWithoutGroupInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutGroupInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.UserGroupUpdateManyWithoutGroupNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserGroupCreateWithoutGroupInputSchema),
          z.lazy(() => UserGroupCreateWithoutGroupInputSchema).array(),
          z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema),
          z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserGroupCreateOrConnectWithoutGroupInputSchema),
          z.lazy(() => UserGroupCreateOrConnectWithoutGroupInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserGroupUpsertWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => UserGroupUpsertWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserGroupCreateManyGroupInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserGroupUpdateWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => UserGroupUpdateWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserGroupUpdateManyWithWhereWithoutGroupInputSchema),
          z
            .lazy(() => UserGroupUpdateManyWithWhereWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserGroupScalarWhereInputSchema),
          z.lazy(() => UserGroupScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.MovieVoteUpdateManyWithoutGroupNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutGroupInputSchema),
          z.lazy(() => MovieVoteCreateWithoutGroupInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutGroupInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutGroupInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MovieVoteUpsertWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => MovieVoteUpsertWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyGroupInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MovieVoteUpdateWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => MovieVoteUpdateWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MovieVoteUpdateManyWithWhereWithoutGroupInputSchema),
          z
            .lazy(() => MovieVoteUpdateManyWithWhereWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MovieVoteScalarWhereInputSchema),
          z.lazy(() => MovieVoteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.GroupInviteUpdateManyWithoutGroupNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupInviteCreateWithoutGroupInputSchema),
          z.lazy(() => GroupInviteCreateWithoutGroupInputSchema).array(),
          z.lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupInviteCreateOrConnectWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteCreateOrConnectWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => GroupInviteUpsertWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUpsertWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupInviteCreateManyGroupInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => GroupInviteUpdateWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUpdateWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => GroupInviteUpdateManyWithWhereWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUpdateManyWithWhereWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => GroupInviteScalarWhereInputSchema),
          z.lazy(() => GroupInviteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUncheckedUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.UserGroupUncheckedUpdateManyWithoutGroupNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserGroupCreateWithoutGroupInputSchema),
          z.lazy(() => UserGroupCreateWithoutGroupInputSchema).array(),
          z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema),
          z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserGroupCreateOrConnectWithoutGroupInputSchema),
          z.lazy(() => UserGroupCreateOrConnectWithoutGroupInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserGroupUpsertWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => UserGroupUpsertWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserGroupCreateManyGroupInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserGroupWhereUniqueInputSchema),
          z.lazy(() => UserGroupWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserGroupUpdateWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => UserGroupUpdateWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserGroupUpdateManyWithWhereWithoutGroupInputSchema),
          z
            .lazy(() => UserGroupUpdateManyWithWhereWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserGroupScalarWhereInputSchema),
          z.lazy(() => UserGroupScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateManyWithoutGroupNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieVoteCreateWithoutGroupInputSchema),
          z.lazy(() => MovieVoteCreateWithoutGroupInputSchema).array(),
          z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema),
          z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MovieVoteCreateOrConnectWithoutGroupInputSchema),
          z.lazy(() => MovieVoteCreateOrConnectWithoutGroupInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MovieVoteUpsertWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => MovieVoteUpsertWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MovieVoteCreateManyGroupInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MovieVoteWhereUniqueInputSchema),
          z.lazy(() => MovieVoteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MovieVoteUpdateWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => MovieVoteUpdateWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MovieVoteUpdateManyWithWhereWithoutGroupInputSchema),
          z
            .lazy(() => MovieVoteUpdateManyWithWhereWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MovieVoteScalarWhereInputSchema),
          z.lazy(() => MovieVoteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedUpdateManyWithoutGroupNestedInputSchema: z.ZodType<Prisma.GroupInviteUncheckedUpdateManyWithoutGroupNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupInviteCreateWithoutGroupInputSchema),
          z.lazy(() => GroupInviteCreateWithoutGroupInputSchema).array(),
          z.lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => GroupInviteCreateOrConnectWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteCreateOrConnectWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => GroupInviteUpsertWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUpsertWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => GroupInviteCreateManyGroupInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => GroupInviteWhereUniqueInputSchema),
          z.lazy(() => GroupInviteWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => GroupInviteUpdateWithWhereUniqueWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUpdateWithWhereUniqueWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => GroupInviteUpdateManyWithWhereWithoutGroupInputSchema),
          z
            .lazy(() => GroupInviteUpdateManyWithWhereWithoutGroupInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => GroupInviteScalarWhereInputSchema),
          z.lazy(() => GroupInviteScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GroupCreateNestedOneWithoutGroupInviteInputSchema: z.ZodType<Prisma.GroupCreateNestedOneWithoutGroupInviteInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutGroupInviteInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutGroupInviteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GroupCreateOrConnectWithoutGroupInviteInputSchema)
        .optional(),
      connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutGroupInviteInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGroupInviteInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutGroupInviteInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutGroupInviteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutGroupInviteInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const EnumGroupInviteStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGroupInviteStatusFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => GroupInviteStatusSchema).optional(),
    })
    .strict();

export const GroupUpdateOneRequiredWithoutGroupInviteNestedInputSchema: z.ZodType<Prisma.GroupUpdateOneRequiredWithoutGroupInviteNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutGroupInviteInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutGroupInviteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GroupCreateOrConnectWithoutGroupInviteInputSchema)
        .optional(),
      upsert: z.lazy(() => GroupUpsertWithoutGroupInviteInputSchema).optional(),
      connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => GroupUpdateToOneWithWhereWithoutGroupInviteInputSchema),
          z.lazy(() => GroupUpdateWithoutGroupInviteInputSchema),
          z.lazy(() => GroupUncheckedUpdateWithoutGroupInviteInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneWithoutGroupInviteNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutGroupInviteNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutGroupInviteInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutGroupInviteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutGroupInviteInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutGroupInviteInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => UserWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => UserWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutGroupInviteInputSchema),
          z.lazy(() => UserUpdateWithoutGroupInviteInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutGroupInviteInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutUserGroupInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserGroupInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutUserGroupInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutUserGroupInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutUserGroupInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const GroupCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.GroupCreateNestedOneWithoutUsersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutUsersInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutUsersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GroupCreateOrConnectWithoutUsersInputSchema)
        .optional(),
      connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutUserGroupNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserGroupNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutUserGroupInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutUserGroupInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutUserGroupInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutUserGroupInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutUserGroupInputSchema),
          z.lazy(() => UserUpdateWithoutUserGroupInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutUserGroupInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.GroupUpdateOneRequiredWithoutUsersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutUsersInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutUsersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GroupCreateOrConnectWithoutUsersInputSchema)
        .optional(),
      upsert: z.lazy(() => GroupUpsertWithoutUsersInputSchema).optional(),
      connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => GroupUpdateToOneWithWhereWithoutUsersInputSchema),
          z.lazy(() => GroupUpdateWithoutUsersInputSchema),
          z.lazy(() => GroupUncheckedUpdateWithoutUsersInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutMovieVoteInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMovieVoteInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutMovieVoteInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutMovieVoteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutMovieVoteInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const MovieCreateNestedOneWithoutMovieVoteInputSchema: z.ZodType<Prisma.MovieCreateNestedOneWithoutMovieVoteInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieCreateWithoutMovieVoteInputSchema),
          z.lazy(() => MovieUncheckedCreateWithoutMovieVoteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MovieCreateOrConnectWithoutMovieVoteInputSchema)
        .optional(),
      connect: z.lazy(() => MovieWhereUniqueInputSchema).optional(),
    })
    .strict();

export const GroupCreateNestedOneWithoutMovieVoteInputSchema: z.ZodType<Prisma.GroupCreateNestedOneWithoutMovieVoteInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutMovieVoteInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutMovieVoteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GroupCreateOrConnectWithoutMovieVoteInputSchema)
        .optional(),
      connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutMovieVoteNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMovieVoteNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutMovieVoteInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutMovieVoteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutMovieVoteInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutMovieVoteInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutMovieVoteInputSchema),
          z.lazy(() => UserUpdateWithoutMovieVoteInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutMovieVoteInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieUpdateOneRequiredWithoutMovieVoteNestedInputSchema: z.ZodType<Prisma.MovieUpdateOneRequiredWithoutMovieVoteNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MovieCreateWithoutMovieVoteInputSchema),
          z.lazy(() => MovieUncheckedCreateWithoutMovieVoteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MovieCreateOrConnectWithoutMovieVoteInputSchema)
        .optional(),
      upsert: z.lazy(() => MovieUpsertWithoutMovieVoteInputSchema).optional(),
      connect: z.lazy(() => MovieWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => MovieUpdateToOneWithWhereWithoutMovieVoteInputSchema),
          z.lazy(() => MovieUpdateWithoutMovieVoteInputSchema),
          z.lazy(() => MovieUncheckedUpdateWithoutMovieVoteInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupUpdateOneWithoutMovieVoteNestedInputSchema: z.ZodType<Prisma.GroupUpdateOneWithoutMovieVoteNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GroupCreateWithoutMovieVoteInputSchema),
          z.lazy(() => GroupUncheckedCreateWithoutMovieVoteInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GroupCreateOrConnectWithoutMovieVoteInputSchema)
        .optional(),
      upsert: z.lazy(() => GroupUpsertWithoutMovieVoteInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => GroupWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => GroupWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => GroupWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => GroupUpdateToOneWithWhereWithoutMovieVoteInputSchema),
          z.lazy(() => GroupUpdateWithoutMovieVoteInputSchema),
          z.lazy(() => GroupUncheckedUpdateWithoutMovieVoteInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumMovieTypeFilterSchema: z.ZodType<Prisma.NestedEnumMovieTypeFilter> =
  z
    .object({
      equals: z.lazy(() => MovieTypeSchema).optional(),
      in: z
        .lazy(() => MovieTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MovieTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MovieTypeSchema),
          z.lazy(() => NestedEnumMovieTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumMovieTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMovieTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MovieTypeSchema).optional(),
      in: z
        .lazy(() => MovieTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MovieTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MovieTypeSchema),
          z.lazy(() => NestedEnumMovieTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMovieTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMovieTypeFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumGroupInviteStatusFilterSchema: z.ZodType<Prisma.NestedEnumGroupInviteStatusFilter> =
  z
    .object({
      equals: z.lazy(() => GroupInviteStatusSchema).optional(),
      in: z
        .lazy(() => GroupInviteStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => GroupInviteStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => NestedEnumGroupInviteStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const NestedEnumGroupInviteStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGroupInviteStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => GroupInviteStatusSchema).optional(),
      in: z
        .lazy(() => GroupInviteStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => GroupInviteStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => NestedEnumGroupInviteStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumGroupInviteStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumGroupInviteStatusFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const UserIdentitiesCreateWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesCreateWithoutUserInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      provider: z.string(),
      providerId: z.string(),
    })
    .strict();

export const UserIdentitiesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      provider: z.string(),
      providerId: z.string(),
    })
    .strict();

export const UserIdentitiesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema),
        z.lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const UserIdentitiesCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserIdentitiesCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => UserIdentitiesCreateManyUserInputSchema),
        z.lazy(() => UserIdentitiesCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserGroupCreateWithoutUserInputSchema: z.ZodType<Prisma.UserGroupCreateWithoutUserInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      group: z.lazy(() => GroupCreateNestedOneWithoutUsersInputSchema),
    })
    .strict();

export const UserGroupUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserGroupUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      groupId: z.number().int(),
    })
    .strict();

export const UserGroupCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserGroupCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserGroupWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserGroupCreateWithoutUserInputSchema),
        z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const UserGroupCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserGroupCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => UserGroupCreateManyUserInputSchema),
        z.lazy(() => UserGroupCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GroupCreateWithoutOwnerInputSchema: z.ZodType<Prisma.GroupCreateWithoutOwnerInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      users: z
        .lazy(() => UserGroupCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteCreateNestedManyWithoutGroupInputSchema)
        .optional(),
    })
    .strict();

export const GroupUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutOwnerInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      users: z
        .lazy(() => UserGroupUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
    })
    .strict();

export const GroupCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => GroupWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GroupCreateWithoutOwnerInputSchema),
        z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema),
      ]),
    })
    .strict();

export const GroupCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.GroupCreateManyOwnerInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => GroupCreateManyOwnerInputSchema),
        z.lazy(() => GroupCreateManyOwnerInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MovieVoteCreateWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteCreateWithoutUserInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      vote: z.number().int(),
      movie: z.lazy(() => MovieCreateNestedOneWithoutMovieVoteInputSchema),
      group: z
        .lazy(() => GroupCreateNestedOneWithoutMovieVoteInputSchema)
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      movieId: z.number().int(),
      groupId: z.number().int().optional().nullable(),
      vote: z.number().int(),
    })
    .strict();

export const MovieVoteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MovieVoteCreateWithoutUserInputSchema),
        z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const MovieVoteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MovieVoteCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MovieVoteCreateManyUserInputSchema),
        z.lazy(() => MovieVoteCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GroupInviteCreateWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteCreateWithoutUserInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sentAt: z.coerce.date(),
      respondedAt: z.coerce.date().optional().nullable(),
      cancelledAt: z.coerce.date().optional().nullable(),
      status: z.lazy(() => GroupInviteStatusSchema),
      email: z.string(),
      group: z.lazy(() => GroupCreateNestedOneWithoutGroupInviteInputSchema),
    })
    .strict();

export const GroupInviteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sentAt: z.coerce.date(),
      respondedAt: z.coerce.date().optional().nullable(),
      cancelledAt: z.coerce.date().optional().nullable(),
      status: z.lazy(() => GroupInviteStatusSchema),
      groupId: z.number().int(),
      email: z.string(),
    })
    .strict();

export const GroupInviteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => GroupInviteWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GroupInviteCreateWithoutUserInputSchema),
        z.lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const GroupInviteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.GroupInviteCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => GroupInviteCreateManyUserInputSchema),
        z.lazy(() => GroupInviteCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserIdentitiesUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UserIdentitiesUpdateWithoutUserInputSchema),
        z.lazy(() => UserIdentitiesUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserIdentitiesCreateWithoutUserInputSchema),
        z.lazy(() => UserIdentitiesUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const UserIdentitiesUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserIdentitiesWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UserIdentitiesUpdateWithoutUserInputSchema),
        z.lazy(() => UserIdentitiesUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const UserIdentitiesUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserIdentitiesScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserIdentitiesUpdateManyMutationInputSchema),
        z.lazy(() => UserIdentitiesUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const UserIdentitiesScalarWhereInputSchema: z.ZodType<Prisma.UserIdentitiesScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserIdentitiesScalarWhereInputSchema),
          z.lazy(() => UserIdentitiesScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserIdentitiesScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserIdentitiesScalarWhereInputSchema),
          z.lazy(() => UserIdentitiesScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      provider: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      providerId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const UserGroupUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserGroupUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserGroupWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UserGroupUpdateWithoutUserInputSchema),
        z.lazy(() => UserGroupUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserGroupCreateWithoutUserInputSchema),
        z.lazy(() => UserGroupUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const UserGroupUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserGroupUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserGroupWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UserGroupUpdateWithoutUserInputSchema),
        z.lazy(() => UserGroupUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const UserGroupUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserGroupUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserGroupScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserGroupUpdateManyMutationInputSchema),
        z.lazy(() => UserGroupUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const UserGroupScalarWhereInputSchema: z.ZodType<Prisma.UserGroupScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserGroupScalarWhereInputSchema),
          z.lazy(() => UserGroupScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserGroupScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserGroupScalarWhereInputSchema),
          z.lazy(() => UserGroupScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      groupId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict();

export const GroupUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.GroupUpsertWithWhereUniqueWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => GroupWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => GroupUpdateWithoutOwnerInputSchema),
        z.lazy(() => GroupUncheckedUpdateWithoutOwnerInputSchema),
      ]),
      create: z.union([
        z.lazy(() => GroupCreateWithoutOwnerInputSchema),
        z.lazy(() => GroupUncheckedCreateWithoutOwnerInputSchema),
      ]),
    })
    .strict();

export const GroupUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.GroupUpdateWithWhereUniqueWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => GroupWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => GroupUpdateWithoutOwnerInputSchema),
        z.lazy(() => GroupUncheckedUpdateWithoutOwnerInputSchema),
      ]),
    })
    .strict();

export const GroupUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.GroupUpdateManyWithWhereWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => GroupScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => GroupUpdateManyMutationInputSchema),
        z.lazy(() => GroupUncheckedUpdateManyWithoutOwnerInputSchema),
      ]),
    })
    .strict();

export const GroupScalarWhereInputSchema: z.ZodType<Prisma.GroupScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GroupScalarWhereInputSchema),
          z.lazy(() => GroupScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GroupScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GroupScalarWhereInputSchema),
          z.lazy(() => GroupScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      image: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      color: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      ownerId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict();

export const MovieVoteUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MovieVoteUpdateWithoutUserInputSchema),
        z.lazy(() => MovieVoteUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MovieVoteCreateWithoutUserInputSchema),
        z.lazy(() => MovieVoteUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const MovieVoteUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MovieVoteUpdateWithoutUserInputSchema),
        z.lazy(() => MovieVoteUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const MovieVoteUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MovieVoteUpdateManyMutationInputSchema),
        z.lazy(() => MovieVoteUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const MovieVoteScalarWhereInputSchema: z.ZodType<Prisma.MovieVoteScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MovieVoteScalarWhereInputSchema),
          z.lazy(() => MovieVoteScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MovieVoteScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MovieVoteScalarWhereInputSchema),
          z.lazy(() => MovieVoteScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      movieId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      groupId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      vote: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict();

export const GroupInviteUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => GroupInviteWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => GroupInviteUpdateWithoutUserInputSchema),
        z.lazy(() => GroupInviteUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => GroupInviteCreateWithoutUserInputSchema),
        z.lazy(() => GroupInviteUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const GroupInviteUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => GroupInviteWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => GroupInviteUpdateWithoutUserInputSchema),
        z.lazy(() => GroupInviteUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const GroupInviteUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => GroupInviteScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => GroupInviteUpdateManyMutationInputSchema),
        z.lazy(() => GroupInviteUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const GroupInviteScalarWhereInputSchema: z.ZodType<Prisma.GroupInviteScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GroupInviteScalarWhereInputSchema),
          z.lazy(() => GroupInviteScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GroupInviteScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GroupInviteScalarWhereInputSchema),
          z.lazy(() => GroupInviteScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      sentAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      respondedAt: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => EnumGroupInviteStatusFilterSchema),
          z.lazy(() => GroupInviteStatusSchema),
        ])
        .optional(),
      groupId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
    })
    .strict();

export const UserCreateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateWithoutIdentitiesInput> =
  z
    .object({
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      UserGroup: z
        .lazy(() => UserGroupCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteCreateNestedManyWithoutUserInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutIdentitiesInput> =
  z
    .object({
      id: z.number().int().optional(),
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutIdentitiesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutIdentitiesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUpsertWithoutIdentitiesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutIdentitiesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutIdentitiesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutIdentitiesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutIdentitiesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutIdentitiesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutIdentitiesInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUpdateWithoutIdentitiesInput> =
  z
    .object({
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserGroup: z
        .lazy(() => UserGroupUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutIdentitiesInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const MovieVoteCreateWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteCreateWithoutMovieInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      vote: z.number().int(),
      user: z.lazy(() => UserCreateNestedOneWithoutMovieVoteInputSchema),
      group: z
        .lazy(() => GroupCreateNestedOneWithoutMovieVoteInputSchema)
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedCreateWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteUncheckedCreateWithoutMovieInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      groupId: z.number().int().optional().nullable(),
      vote: z.number().int(),
    })
    .strict();

export const MovieVoteCreateOrConnectWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteCreateOrConnectWithoutMovieInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MovieVoteCreateWithoutMovieInputSchema),
        z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema),
      ]),
    })
    .strict();

export const MovieVoteCreateManyMovieInputEnvelopeSchema: z.ZodType<Prisma.MovieVoteCreateManyMovieInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MovieVoteCreateManyMovieInputSchema),
        z.lazy(() => MovieVoteCreateManyMovieInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MovieVoteUpsertWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteUpsertWithWhereUniqueWithoutMovieInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MovieVoteUpdateWithoutMovieInputSchema),
        z.lazy(() => MovieVoteUncheckedUpdateWithoutMovieInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MovieVoteCreateWithoutMovieInputSchema),
        z.lazy(() => MovieVoteUncheckedCreateWithoutMovieInputSchema),
      ]),
    })
    .strict();

export const MovieVoteUpdateWithWhereUniqueWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteUpdateWithWhereUniqueWithoutMovieInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MovieVoteUpdateWithoutMovieInputSchema),
        z.lazy(() => MovieVoteUncheckedUpdateWithoutMovieInputSchema),
      ]),
    })
    .strict();

export const MovieVoteUpdateManyWithWhereWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteUpdateManyWithWhereWithoutMovieInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MovieVoteUpdateManyMutationInputSchema),
        z.lazy(() => MovieVoteUncheckedUpdateManyWithoutMovieInputSchema),
      ]),
    })
    .strict();

export const UserCreateWithoutGroupInputSchema: z.ZodType<Prisma.UserCreateWithoutGroupInput> =
  z
    .object({
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      identities: z
        .lazy(() => UserIdentitiesCreateNestedManyWithoutUserInputSchema)
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupCreateNestedManyWithoutUserInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteCreateNestedManyWithoutUserInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutGroupInput> =
  z
    .object({
      id: z.number().int().optional(),
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedCreateNestedManyWithoutUserInputSchema,
        )
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutGroupInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutGroupInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const UserGroupCreateWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupCreateWithoutGroupInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutUserGroupInputSchema),
    })
    .strict();

export const UserGroupUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupUncheckedCreateWithoutGroupInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
    })
    .strict();

export const UserGroupCreateOrConnectWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupCreateOrConnectWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => UserGroupWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserGroupCreateWithoutGroupInputSchema),
        z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const UserGroupCreateManyGroupInputEnvelopeSchema: z.ZodType<Prisma.UserGroupCreateManyGroupInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => UserGroupCreateManyGroupInputSchema),
        z.lazy(() => UserGroupCreateManyGroupInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MovieVoteCreateWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteCreateWithoutGroupInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      vote: z.number().int(),
      user: z.lazy(() => UserCreateNestedOneWithoutMovieVoteInputSchema),
      movie: z.lazy(() => MovieCreateNestedOneWithoutMovieVoteInputSchema),
    })
    .strict();

export const MovieVoteUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteUncheckedCreateWithoutGroupInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      movieId: z.number().int(),
      vote: z.number().int(),
    })
    .strict();

export const MovieVoteCreateOrConnectWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteCreateOrConnectWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MovieVoteCreateWithoutGroupInputSchema),
        z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const MovieVoteCreateManyGroupInputEnvelopeSchema: z.ZodType<Prisma.MovieVoteCreateManyGroupInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MovieVoteCreateManyGroupInputSchema),
        z.lazy(() => MovieVoteCreateManyGroupInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GroupInviteCreateWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteCreateWithoutGroupInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sentAt: z.coerce.date(),
      respondedAt: z.coerce.date().optional().nullable(),
      cancelledAt: z.coerce.date().optional().nullable(),
      status: z.lazy(() => GroupInviteStatusSchema),
      email: z.string(),
      user: z
        .lazy(() => UserCreateNestedOneWithoutGroupInviteInputSchema)
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedCreateWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteUncheckedCreateWithoutGroupInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sentAt: z.coerce.date(),
      respondedAt: z.coerce.date().optional().nullable(),
      cancelledAt: z.coerce.date().optional().nullable(),
      status: z.lazy(() => GroupInviteStatusSchema),
      email: z.string(),
      userId: z.number().int().optional().nullable(),
    })
    .strict();

export const GroupInviteCreateOrConnectWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteCreateOrConnectWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => GroupInviteWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GroupInviteCreateWithoutGroupInputSchema),
        z.lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const GroupInviteCreateManyGroupInputEnvelopeSchema: z.ZodType<Prisma.GroupInviteCreateManyGroupInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => GroupInviteCreateManyGroupInputSchema),
        z.lazy(() => GroupInviteCreateManyGroupInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserUpsertWithoutGroupInputSchema: z.ZodType<Prisma.UserUpsertWithoutGroupInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutGroupInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutGroupInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutGroupInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutGroupInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutGroupInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutGroupInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutGroupInputSchema: z.ZodType<Prisma.UserUpdateWithoutGroupInput> =
  z
    .object({
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      identities: z
        .lazy(() => UserIdentitiesUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutGroupInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedUpdateManyWithoutUserNestedInputSchema,
        )
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserGroupUpsertWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupUpsertWithWhereUniqueWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => UserGroupWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UserGroupUpdateWithoutGroupInputSchema),
        z.lazy(() => UserGroupUncheckedUpdateWithoutGroupInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserGroupCreateWithoutGroupInputSchema),
        z.lazy(() => UserGroupUncheckedCreateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const UserGroupUpdateWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupUpdateWithWhereUniqueWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => UserGroupWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UserGroupUpdateWithoutGroupInputSchema),
        z.lazy(() => UserGroupUncheckedUpdateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const UserGroupUpdateManyWithWhereWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupUpdateManyWithWhereWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => UserGroupScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserGroupUpdateManyMutationInputSchema),
        z.lazy(() => UserGroupUncheckedUpdateManyWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const MovieVoteUpsertWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteUpsertWithWhereUniqueWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MovieVoteUpdateWithoutGroupInputSchema),
        z.lazy(() => MovieVoteUncheckedUpdateWithoutGroupInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MovieVoteCreateWithoutGroupInputSchema),
        z.lazy(() => MovieVoteUncheckedCreateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const MovieVoteUpdateWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteUpdateWithWhereUniqueWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MovieVoteUpdateWithoutGroupInputSchema),
        z.lazy(() => MovieVoteUncheckedUpdateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const MovieVoteUpdateManyWithWhereWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteUpdateManyWithWhereWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => MovieVoteScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MovieVoteUpdateManyMutationInputSchema),
        z.lazy(() => MovieVoteUncheckedUpdateManyWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const GroupInviteUpsertWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteUpsertWithWhereUniqueWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => GroupInviteWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => GroupInviteUpdateWithoutGroupInputSchema),
        z.lazy(() => GroupInviteUncheckedUpdateWithoutGroupInputSchema),
      ]),
      create: z.union([
        z.lazy(() => GroupInviteCreateWithoutGroupInputSchema),
        z.lazy(() => GroupInviteUncheckedCreateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const GroupInviteUpdateWithWhereUniqueWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteUpdateWithWhereUniqueWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => GroupInviteWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => GroupInviteUpdateWithoutGroupInputSchema),
        z.lazy(() => GroupInviteUncheckedUpdateWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const GroupInviteUpdateManyWithWhereWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteUpdateManyWithWhereWithoutGroupInput> =
  z
    .object({
      where: z.lazy(() => GroupInviteScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => GroupInviteUpdateManyMutationInputSchema),
        z.lazy(() => GroupInviteUncheckedUpdateManyWithoutGroupInputSchema),
      ]),
    })
    .strict();

export const GroupCreateWithoutGroupInviteInputSchema: z.ZodType<Prisma.GroupCreateWithoutGroupInviteInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      owner: z.lazy(() => UserCreateNestedOneWithoutGroupInputSchema),
      users: z
        .lazy(() => UserGroupCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteCreateNestedManyWithoutGroupInputSchema)
        .optional(),
    })
    .strict();

export const GroupUncheckedCreateWithoutGroupInviteInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutGroupInviteInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      ownerId: z.number().int(),
      users: z
        .lazy(() => UserGroupUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
    })
    .strict();

export const GroupCreateOrConnectWithoutGroupInviteInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutGroupInviteInput> =
  z
    .object({
      where: z.lazy(() => GroupWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GroupCreateWithoutGroupInviteInputSchema),
        z.lazy(() => GroupUncheckedCreateWithoutGroupInviteInputSchema),
      ]),
    })
    .strict();

export const UserCreateWithoutGroupInviteInputSchema: z.ZodType<Prisma.UserCreateWithoutGroupInviteInput> =
  z
    .object({
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      identities: z
        .lazy(() => UserIdentitiesCreateNestedManyWithoutUserInputSchema)
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutGroupInviteInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutGroupInviteInput> =
  z
    .object({
      id: z.number().int().optional(),
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedCreateNestedManyWithoutUserInputSchema,
        )
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutGroupInviteInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGroupInviteInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutGroupInviteInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutGroupInviteInputSchema),
      ]),
    })
    .strict();

export const GroupUpsertWithoutGroupInviteInputSchema: z.ZodType<Prisma.GroupUpsertWithoutGroupInviteInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => GroupUpdateWithoutGroupInviteInputSchema),
        z.lazy(() => GroupUncheckedUpdateWithoutGroupInviteInputSchema),
      ]),
      create: z.union([
        z.lazy(() => GroupCreateWithoutGroupInviteInputSchema),
        z.lazy(() => GroupUncheckedCreateWithoutGroupInviteInputSchema),
      ]),
      where: z.lazy(() => GroupWhereInputSchema).optional(),
    })
    .strict();

export const GroupUpdateToOneWithWhereWithoutGroupInviteInputSchema: z.ZodType<Prisma.GroupUpdateToOneWithWhereWithoutGroupInviteInput> =
  z
    .object({
      where: z.lazy(() => GroupWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => GroupUpdateWithoutGroupInviteInputSchema),
        z.lazy(() => GroupUncheckedUpdateWithoutGroupInviteInputSchema),
      ]),
    })
    .strict();

export const GroupUpdateWithoutGroupInviteInputSchema: z.ZodType<Prisma.GroupUpdateWithoutGroupInviteInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      owner: z
        .lazy(() => UserUpdateOneRequiredWithoutGroupNestedInputSchema)
        .optional(),
      users: z
        .lazy(() => UserGroupUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupUncheckedUpdateWithoutGroupInviteInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutGroupInviteInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      users: z
        .lazy(() => UserGroupUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUpsertWithoutGroupInviteInputSchema: z.ZodType<Prisma.UserUpsertWithoutGroupInviteInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutGroupInviteInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutGroupInviteInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutGroupInviteInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutGroupInviteInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutGroupInviteInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGroupInviteInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutGroupInviteInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutGroupInviteInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutGroupInviteInputSchema: z.ZodType<Prisma.UserUpdateWithoutGroupInviteInput> =
  z
    .object({
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      identities: z
        .lazy(() => UserIdentitiesUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutGroupInviteInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutGroupInviteInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedUpdateManyWithoutUserNestedInputSchema,
        )
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateWithoutUserGroupInputSchema: z.ZodType<Prisma.UserCreateWithoutUserGroupInput> =
  z
    .object({
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      identities: z
        .lazy(() => UserIdentitiesCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteCreateNestedManyWithoutUserInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutUserGroupInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserGroupInput> =
  z
    .object({
      id: z.number().int().optional(),
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedCreateNestedManyWithoutUserInputSchema,
        )
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutUserGroupInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserGroupInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutUserGroupInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutUserGroupInputSchema),
      ]),
    })
    .strict();

export const GroupCreateWithoutUsersInputSchema: z.ZodType<Prisma.GroupCreateWithoutUsersInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      owner: z.lazy(() => UserCreateNestedOneWithoutGroupInputSchema),
      MovieVote: z
        .lazy(() => MovieVoteCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteCreateNestedManyWithoutGroupInputSchema)
        .optional(),
    })
    .strict();

export const GroupUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutUsersInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      ownerId: z.number().int(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
    })
    .strict();

export const GroupCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutUsersInput> =
  z
    .object({
      where: z.lazy(() => GroupWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GroupCreateWithoutUsersInputSchema),
        z.lazy(() => GroupUncheckedCreateWithoutUsersInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutUserGroupInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserGroupInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutUserGroupInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutUserGroupInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutUserGroupInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutUserGroupInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutUserGroupInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUserGroupInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutUserGroupInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutUserGroupInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutUserGroupInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserGroupInput> =
  z
    .object({
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      identities: z
        .lazy(() => UserIdentitiesUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutUserGroupInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserGroupInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedUpdateManyWithoutUserNestedInputSchema,
        )
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupUpsertWithoutUsersInputSchema: z.ZodType<Prisma.GroupUpsertWithoutUsersInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => GroupUpdateWithoutUsersInputSchema),
        z.lazy(() => GroupUncheckedUpdateWithoutUsersInputSchema),
      ]),
      create: z.union([
        z.lazy(() => GroupCreateWithoutUsersInputSchema),
        z.lazy(() => GroupUncheckedCreateWithoutUsersInputSchema),
      ]),
      where: z.lazy(() => GroupWhereInputSchema).optional(),
    })
    .strict();

export const GroupUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.GroupUpdateToOneWithWhereWithoutUsersInput> =
  z
    .object({
      where: z.lazy(() => GroupWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => GroupUpdateWithoutUsersInputSchema),
        z.lazy(() => GroupUncheckedUpdateWithoutUsersInputSchema),
      ]),
    })
    .strict();

export const GroupUpdateWithoutUsersInputSchema: z.ZodType<Prisma.GroupUpdateWithoutUsersInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      owner: z
        .lazy(() => UserUpdateOneRequiredWithoutGroupNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutUsersInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateWithoutMovieVoteInputSchema: z.ZodType<Prisma.UserCreateWithoutMovieVoteInput> =
  z
    .object({
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      identities: z
        .lazy(() => UserIdentitiesCreateNestedManyWithoutUserInputSchema)
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutMovieVoteInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMovieVoteInput> =
  z
    .object({
      id: z.number().int().optional(),
      externalId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      emailAddress: z.string(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedCreateNestedManyWithoutUserInputSchema,
        )
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutMovieVoteInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMovieVoteInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutMovieVoteInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutMovieVoteInputSchema),
      ]),
    })
    .strict();

export const MovieCreateWithoutMovieVoteInputSchema: z.ZodType<Prisma.MovieCreateWithoutMovieVoteInput> =
  z
    .object({
      title: z.string(),
      year: z.number().int(),
      imdbId: z.string(),
      type: z.lazy(() => MovieTypeSchema),
      posterUrl: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const MovieUncheckedCreateWithoutMovieVoteInputSchema: z.ZodType<Prisma.MovieUncheckedCreateWithoutMovieVoteInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string(),
      year: z.number().int(),
      imdbId: z.string(),
      type: z.lazy(() => MovieTypeSchema),
      posterUrl: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const MovieCreateOrConnectWithoutMovieVoteInputSchema: z.ZodType<Prisma.MovieCreateOrConnectWithoutMovieVoteInput> =
  z
    .object({
      where: z.lazy(() => MovieWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MovieCreateWithoutMovieVoteInputSchema),
        z.lazy(() => MovieUncheckedCreateWithoutMovieVoteInputSchema),
      ]),
    })
    .strict();

export const GroupCreateWithoutMovieVoteInputSchema: z.ZodType<Prisma.GroupCreateWithoutMovieVoteInput> =
  z
    .object({
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      owner: z.lazy(() => UserCreateNestedOneWithoutGroupInputSchema),
      users: z
        .lazy(() => UserGroupCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteCreateNestedManyWithoutGroupInputSchema)
        .optional(),
    })
    .strict();

export const GroupUncheckedCreateWithoutMovieVoteInputSchema: z.ZodType<Prisma.GroupUncheckedCreateWithoutMovieVoteInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
      ownerId: z.number().int(),
      users: z
        .lazy(() => UserGroupUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedCreateNestedManyWithoutGroupInputSchema)
        .optional(),
    })
    .strict();

export const GroupCreateOrConnectWithoutMovieVoteInputSchema: z.ZodType<Prisma.GroupCreateOrConnectWithoutMovieVoteInput> =
  z
    .object({
      where: z.lazy(() => GroupWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GroupCreateWithoutMovieVoteInputSchema),
        z.lazy(() => GroupUncheckedCreateWithoutMovieVoteInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutMovieVoteInputSchema: z.ZodType<Prisma.UserUpsertWithoutMovieVoteInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutMovieVoteInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutMovieVoteInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutMovieVoteInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutMovieVoteInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutMovieVoteInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMovieVoteInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutMovieVoteInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutMovieVoteInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutMovieVoteInputSchema: z.ZodType<Prisma.UserUpdateWithoutMovieVoteInput> =
  z
    .object({
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      identities: z
        .lazy(() => UserIdentitiesUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutMovieVoteInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMovieVoteInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailAddress: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      avatar: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      identities: z
        .lazy(
          () => UserIdentitiesUncheckedUpdateManyWithoutUserNestedInputSchema,
        )
        .optional(),
      UserGroup: z
        .lazy(() => UserGroupUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Group: z
        .lazy(() => GroupUncheckedUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const MovieUpsertWithoutMovieVoteInputSchema: z.ZodType<Prisma.MovieUpsertWithoutMovieVoteInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MovieUpdateWithoutMovieVoteInputSchema),
        z.lazy(() => MovieUncheckedUpdateWithoutMovieVoteInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MovieCreateWithoutMovieVoteInputSchema),
        z.lazy(() => MovieUncheckedCreateWithoutMovieVoteInputSchema),
      ]),
      where: z.lazy(() => MovieWhereInputSchema).optional(),
    })
    .strict();

export const MovieUpdateToOneWithWhereWithoutMovieVoteInputSchema: z.ZodType<Prisma.MovieUpdateToOneWithWhereWithoutMovieVoteInput> =
  z
    .object({
      where: z.lazy(() => MovieWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MovieUpdateWithoutMovieVoteInputSchema),
        z.lazy(() => MovieUncheckedUpdateWithoutMovieVoteInputSchema),
      ]),
    })
    .strict();

export const MovieUpdateWithoutMovieVoteInputSchema: z.ZodType<Prisma.MovieUpdateWithoutMovieVoteInput> =
  z
    .object({
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      year: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imdbId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MovieTypeSchema),
          z.lazy(() => EnumMovieTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      posterUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieUncheckedUpdateWithoutMovieVoteInputSchema: z.ZodType<Prisma.MovieUncheckedUpdateWithoutMovieVoteInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      year: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imdbId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => MovieTypeSchema),
          z.lazy(() => EnumMovieTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      posterUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupUpsertWithoutMovieVoteInputSchema: z.ZodType<Prisma.GroupUpsertWithoutMovieVoteInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => GroupUpdateWithoutMovieVoteInputSchema),
        z.lazy(() => GroupUncheckedUpdateWithoutMovieVoteInputSchema),
      ]),
      create: z.union([
        z.lazy(() => GroupCreateWithoutMovieVoteInputSchema),
        z.lazy(() => GroupUncheckedCreateWithoutMovieVoteInputSchema),
      ]),
      where: z.lazy(() => GroupWhereInputSchema).optional(),
    })
    .strict();

export const GroupUpdateToOneWithWhereWithoutMovieVoteInputSchema: z.ZodType<Prisma.GroupUpdateToOneWithWhereWithoutMovieVoteInput> =
  z
    .object({
      where: z.lazy(() => GroupWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => GroupUpdateWithoutMovieVoteInputSchema),
        z.lazy(() => GroupUncheckedUpdateWithoutMovieVoteInputSchema),
      ]),
    })
    .strict();

export const GroupUpdateWithoutMovieVoteInputSchema: z.ZodType<Prisma.GroupUpdateWithoutMovieVoteInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      owner: z
        .lazy(() => UserUpdateOneRequiredWithoutGroupNestedInputSchema)
        .optional(),
      users: z
        .lazy(() => UserGroupUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupUncheckedUpdateWithoutMovieVoteInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutMovieVoteInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      users: z
        .lazy(() => UserGroupUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserIdentitiesCreateManyUserInputSchema: z.ZodType<Prisma.UserIdentitiesCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      provider: z.string(),
      providerId: z.string(),
    })
    .strict();

export const UserGroupCreateManyUserInputSchema: z.ZodType<Prisma.UserGroupCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      groupId: z.number().int(),
    })
    .strict();

export const GroupCreateManyOwnerInputSchema: z.ZodType<Prisma.GroupCreateManyOwnerInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      color: z.string(),
    })
    .strict();

export const MovieVoteCreateManyUserInputSchema: z.ZodType<Prisma.MovieVoteCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      movieId: z.number().int(),
      groupId: z.number().int().optional().nullable(),
      vote: z.number().int(),
    })
    .strict();

export const GroupInviteCreateManyUserInputSchema: z.ZodType<Prisma.GroupInviteCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sentAt: z.coerce.date(),
      respondedAt: z.coerce.date().optional().nullable(),
      cancelledAt: z.coerce.date().optional().nullable(),
      status: z.lazy(() => GroupInviteStatusSchema),
      groupId: z.number().int(),
      email: z.string(),
    })
    .strict();

export const UserIdentitiesUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesUpdateWithoutUserInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserIdentitiesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserIdentitiesUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserIdentitiesUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserGroupUpdateWithoutUserInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .lazy(() => GroupUpdateOneRequiredWithoutUsersNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserGroupUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserGroupUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserGroupUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.GroupUpdateWithoutOwnerInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      users: z
        .lazy(() => UserGroupUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateWithoutOwnerInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      users: z
        .lazy(() => UserGroupUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      MovieVote: z
        .lazy(() => MovieVoteUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
      GroupInvite: z
        .lazy(() => GroupInviteUncheckedUpdateManyWithoutGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.GroupUncheckedUpdateManyWithoutOwnerInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      color: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUpdateWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteUpdateWithoutUserInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      movie: z
        .lazy(() => MovieUpdateOneRequiredWithoutMovieVoteNestedInputSchema)
        .optional(),
      group: z
        .lazy(() => GroupUpdateOneWithoutMovieVoteNestedInputSchema)
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      movieId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      movieId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUpdateWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteUpdateWithoutUserInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .lazy(() => GroupUpdateOneRequiredWithoutGroupInviteNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.GroupInviteUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteCreateManyMovieInputSchema: z.ZodType<Prisma.MovieVoteCreateManyMovieInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      groupId: z.number().int().optional().nullable(),
      vote: z.number().int(),
    })
    .strict();

export const MovieVoteUpdateWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteUpdateWithoutMovieInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutMovieVoteNestedInputSchema)
        .optional(),
      group: z
        .lazy(() => GroupUpdateOneWithoutMovieVoteNestedInputSchema)
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateWithoutMovieInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateManyWithoutMovieInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateManyWithoutMovieInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      groupId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserGroupCreateManyGroupInputSchema: z.ZodType<Prisma.UserGroupCreateManyGroupInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
    })
    .strict();

export const MovieVoteCreateManyGroupInputSchema: z.ZodType<Prisma.MovieVoteCreateManyGroupInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.number().int(),
      movieId: z.number().int(),
      vote: z.number().int(),
    })
    .strict();

export const GroupInviteCreateManyGroupInputSchema: z.ZodType<Prisma.GroupInviteCreateManyGroupInput> =
  z
    .object({
      id: z.number().int().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sentAt: z.coerce.date(),
      respondedAt: z.coerce.date().optional().nullable(),
      cancelledAt: z.coerce.date().optional().nullable(),
      status: z.lazy(() => GroupInviteStatusSchema),
      email: z.string(),
      userId: z.number().int().optional().nullable(),
    })
    .strict();

export const UserGroupUpdateWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupUpdateWithoutGroupInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutUserGroupNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserGroupUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupUncheckedUpdateWithoutGroupInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserGroupUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.UserGroupUncheckedUpdateManyWithoutGroupInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUpdateWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteUpdateWithoutGroupInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutMovieVoteNestedInputSchema)
        .optional(),
      movie: z
        .lazy(() => MovieUpdateOneRequiredWithoutMovieVoteNestedInputSchema)
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateWithoutGroupInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      movieId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.MovieVoteUncheckedUpdateManyWithoutGroupInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      movieId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      vote: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteUpdateWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteUpdateWithoutGroupInput> =
  z
    .object({
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutGroupInviteNestedInputSchema)
        .optional(),
    })
    .strict();

export const GroupInviteUncheckedUpdateWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteUncheckedUpdateWithoutGroupInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const GroupInviteUncheckedUpdateManyWithoutGroupInputSchema: z.ZodType<Prisma.GroupInviteUncheckedUpdateManyWithoutGroupInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sentAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      respondedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cancelledAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => GroupInviteStatusSchema),
          z.lazy(() => EnumGroupInviteStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict();

export const UserIdentitiesFindFirstArgsSchema: z.ZodType<Prisma.UserIdentitiesFindFirstArgs> =
  z
    .object({
      select: UserIdentitiesSelectSchema.optional(),
      include: UserIdentitiesIncludeSchema.optional(),
      where: UserIdentitiesWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserIdentitiesOrderByWithRelationInputSchema.array(),
          UserIdentitiesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserIdentitiesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserIdentitiesScalarFieldEnumSchema,
          UserIdentitiesScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserIdentitiesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserIdentitiesFindFirstOrThrowArgs> =
  z
    .object({
      select: UserIdentitiesSelectSchema.optional(),
      include: UserIdentitiesIncludeSchema.optional(),
      where: UserIdentitiesWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserIdentitiesOrderByWithRelationInputSchema.array(),
          UserIdentitiesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserIdentitiesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserIdentitiesScalarFieldEnumSchema,
          UserIdentitiesScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserIdentitiesFindManyArgsSchema: z.ZodType<Prisma.UserIdentitiesFindManyArgs> =
  z
    .object({
      select: UserIdentitiesSelectSchema.optional(),
      include: UserIdentitiesIncludeSchema.optional(),
      where: UserIdentitiesWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserIdentitiesOrderByWithRelationInputSchema.array(),
          UserIdentitiesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserIdentitiesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserIdentitiesScalarFieldEnumSchema,
          UserIdentitiesScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserIdentitiesAggregateArgsSchema: z.ZodType<Prisma.UserIdentitiesAggregateArgs> =
  z
    .object({
      where: UserIdentitiesWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserIdentitiesOrderByWithRelationInputSchema.array(),
          UserIdentitiesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserIdentitiesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserIdentitiesGroupByArgsSchema: z.ZodType<Prisma.UserIdentitiesGroupByArgs> =
  z
    .object({
      where: UserIdentitiesWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserIdentitiesOrderByWithAggregationInputSchema.array(),
          UserIdentitiesOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: UserIdentitiesScalarFieldEnumSchema.array(),
      having: UserIdentitiesScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserIdentitiesFindUniqueArgsSchema: z.ZodType<Prisma.UserIdentitiesFindUniqueArgs> =
  z
    .object({
      select: UserIdentitiesSelectSchema.optional(),
      include: UserIdentitiesIncludeSchema.optional(),
      where: UserIdentitiesWhereUniqueInputSchema,
    })
    .strict();

export const UserIdentitiesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserIdentitiesFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserIdentitiesSelectSchema.optional(),
      include: UserIdentitiesIncludeSchema.optional(),
      where: UserIdentitiesWhereUniqueInputSchema,
    })
    .strict();

export const MovieFindFirstArgsSchema: z.ZodType<Prisma.MovieFindFirstArgs> = z
  .object({
    select: MovieSelectSchema.optional(),
    include: MovieIncludeSchema.optional(),
    where: MovieWhereInputSchema.optional(),
    orderBy: z
      .union([
        MovieOrderByWithRelationInputSchema.array(),
        MovieOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MovieWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([MovieScalarFieldEnumSchema, MovieScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const MovieFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MovieFindFirstOrThrowArgs> =
  z
    .object({
      select: MovieSelectSchema.optional(),
      include: MovieIncludeSchema.optional(),
      where: MovieWhereInputSchema.optional(),
      orderBy: z
        .union([
          MovieOrderByWithRelationInputSchema.array(),
          MovieOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MovieWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([MovieScalarFieldEnumSchema, MovieScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const MovieFindManyArgsSchema: z.ZodType<Prisma.MovieFindManyArgs> = z
  .object({
    select: MovieSelectSchema.optional(),
    include: MovieIncludeSchema.optional(),
    where: MovieWhereInputSchema.optional(),
    orderBy: z
      .union([
        MovieOrderByWithRelationInputSchema.array(),
        MovieOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MovieWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([MovieScalarFieldEnumSchema, MovieScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const MovieAggregateArgsSchema: z.ZodType<Prisma.MovieAggregateArgs> = z
  .object({
    where: MovieWhereInputSchema.optional(),
    orderBy: z
      .union([
        MovieOrderByWithRelationInputSchema.array(),
        MovieOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MovieWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const MovieGroupByArgsSchema: z.ZodType<Prisma.MovieGroupByArgs> = z
  .object({
    where: MovieWhereInputSchema.optional(),
    orderBy: z
      .union([
        MovieOrderByWithAggregationInputSchema.array(),
        MovieOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: MovieScalarFieldEnumSchema.array(),
    having: MovieScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const MovieFindUniqueArgsSchema: z.ZodType<Prisma.MovieFindUniqueArgs> =
  z
    .object({
      select: MovieSelectSchema.optional(),
      include: MovieIncludeSchema.optional(),
      where: MovieWhereUniqueInputSchema,
    })
    .strict();

export const MovieFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MovieFindUniqueOrThrowArgs> =
  z
    .object({
      select: MovieSelectSchema.optional(),
      include: MovieIncludeSchema.optional(),
      where: MovieWhereUniqueInputSchema,
    })
    .strict();

export const GroupFindFirstArgsSchema: z.ZodType<Prisma.GroupFindFirstArgs> = z
  .object({
    select: GroupSelectSchema.optional(),
    include: GroupIncludeSchema.optional(),
    where: GroupWhereInputSchema.optional(),
    orderBy: z
      .union([
        GroupOrderByWithRelationInputSchema.array(),
        GroupOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: GroupWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([GroupScalarFieldEnumSchema, GroupScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const GroupFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GroupFindFirstOrThrowArgs> =
  z
    .object({
      select: GroupSelectSchema.optional(),
      include: GroupIncludeSchema.optional(),
      where: GroupWhereInputSchema.optional(),
      orderBy: z
        .union([
          GroupOrderByWithRelationInputSchema.array(),
          GroupOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GroupWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([GroupScalarFieldEnumSchema, GroupScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const GroupFindManyArgsSchema: z.ZodType<Prisma.GroupFindManyArgs> = z
  .object({
    select: GroupSelectSchema.optional(),
    include: GroupIncludeSchema.optional(),
    where: GroupWhereInputSchema.optional(),
    orderBy: z
      .union([
        GroupOrderByWithRelationInputSchema.array(),
        GroupOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: GroupWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([GroupScalarFieldEnumSchema, GroupScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const GroupAggregateArgsSchema: z.ZodType<Prisma.GroupAggregateArgs> = z
  .object({
    where: GroupWhereInputSchema.optional(),
    orderBy: z
      .union([
        GroupOrderByWithRelationInputSchema.array(),
        GroupOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: GroupWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const GroupGroupByArgsSchema: z.ZodType<Prisma.GroupGroupByArgs> = z
  .object({
    where: GroupWhereInputSchema.optional(),
    orderBy: z
      .union([
        GroupOrderByWithAggregationInputSchema.array(),
        GroupOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: GroupScalarFieldEnumSchema.array(),
    having: GroupScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const GroupFindUniqueArgsSchema: z.ZodType<Prisma.GroupFindUniqueArgs> =
  z
    .object({
      select: GroupSelectSchema.optional(),
      include: GroupIncludeSchema.optional(),
      where: GroupWhereUniqueInputSchema,
    })
    .strict();

export const GroupFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GroupFindUniqueOrThrowArgs> =
  z
    .object({
      select: GroupSelectSchema.optional(),
      include: GroupIncludeSchema.optional(),
      where: GroupWhereUniqueInputSchema,
    })
    .strict();

export const GroupInviteFindFirstArgsSchema: z.ZodType<Prisma.GroupInviteFindFirstArgs> =
  z
    .object({
      select: GroupInviteSelectSchema.optional(),
      include: GroupInviteIncludeSchema.optional(),
      where: GroupInviteWhereInputSchema.optional(),
      orderBy: z
        .union([
          GroupInviteOrderByWithRelationInputSchema.array(),
          GroupInviteOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GroupInviteWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          GroupInviteScalarFieldEnumSchema,
          GroupInviteScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GroupInviteFindFirstOrThrowArgs> =
  z
    .object({
      select: GroupInviteSelectSchema.optional(),
      include: GroupInviteIncludeSchema.optional(),
      where: GroupInviteWhereInputSchema.optional(),
      orderBy: z
        .union([
          GroupInviteOrderByWithRelationInputSchema.array(),
          GroupInviteOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GroupInviteWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          GroupInviteScalarFieldEnumSchema,
          GroupInviteScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteFindManyArgsSchema: z.ZodType<Prisma.GroupInviteFindManyArgs> =
  z
    .object({
      select: GroupInviteSelectSchema.optional(),
      include: GroupInviteIncludeSchema.optional(),
      where: GroupInviteWhereInputSchema.optional(),
      orderBy: z
        .union([
          GroupInviteOrderByWithRelationInputSchema.array(),
          GroupInviteOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GroupInviteWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          GroupInviteScalarFieldEnumSchema,
          GroupInviteScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const GroupInviteAggregateArgsSchema: z.ZodType<Prisma.GroupInviteAggregateArgs> =
  z
    .object({
      where: GroupInviteWhereInputSchema.optional(),
      orderBy: z
        .union([
          GroupInviteOrderByWithRelationInputSchema.array(),
          GroupInviteOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GroupInviteWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const GroupInviteGroupByArgsSchema: z.ZodType<Prisma.GroupInviteGroupByArgs> =
  z
    .object({
      where: GroupInviteWhereInputSchema.optional(),
      orderBy: z
        .union([
          GroupInviteOrderByWithAggregationInputSchema.array(),
          GroupInviteOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: GroupInviteScalarFieldEnumSchema.array(),
      having: GroupInviteScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const GroupInviteFindUniqueArgsSchema: z.ZodType<Prisma.GroupInviteFindUniqueArgs> =
  z
    .object({
      select: GroupInviteSelectSchema.optional(),
      include: GroupInviteIncludeSchema.optional(),
      where: GroupInviteWhereUniqueInputSchema,
    })
    .strict();

export const GroupInviteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GroupInviteFindUniqueOrThrowArgs> =
  z
    .object({
      select: GroupInviteSelectSchema.optional(),
      include: GroupInviteIncludeSchema.optional(),
      where: GroupInviteWhereUniqueInputSchema,
    })
    .strict();

export const UserGroupFindFirstArgsSchema: z.ZodType<Prisma.UserGroupFindFirstArgs> =
  z
    .object({
      select: UserGroupSelectSchema.optional(),
      include: UserGroupIncludeSchema.optional(),
      where: UserGroupWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserGroupOrderByWithRelationInputSchema.array(),
          UserGroupOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserGroupWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserGroupScalarFieldEnumSchema,
          UserGroupScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserGroupFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserGroupFindFirstOrThrowArgs> =
  z
    .object({
      select: UserGroupSelectSchema.optional(),
      include: UserGroupIncludeSchema.optional(),
      where: UserGroupWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserGroupOrderByWithRelationInputSchema.array(),
          UserGroupOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserGroupWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserGroupScalarFieldEnumSchema,
          UserGroupScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserGroupFindManyArgsSchema: z.ZodType<Prisma.UserGroupFindManyArgs> =
  z
    .object({
      select: UserGroupSelectSchema.optional(),
      include: UserGroupIncludeSchema.optional(),
      where: UserGroupWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserGroupOrderByWithRelationInputSchema.array(),
          UserGroupOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserGroupWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserGroupScalarFieldEnumSchema,
          UserGroupScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserGroupAggregateArgsSchema: z.ZodType<Prisma.UserGroupAggregateArgs> =
  z
    .object({
      where: UserGroupWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserGroupOrderByWithRelationInputSchema.array(),
          UserGroupOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserGroupWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserGroupGroupByArgsSchema: z.ZodType<Prisma.UserGroupGroupByArgs> =
  z
    .object({
      where: UserGroupWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserGroupOrderByWithAggregationInputSchema.array(),
          UserGroupOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: UserGroupScalarFieldEnumSchema.array(),
      having: UserGroupScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserGroupFindUniqueArgsSchema: z.ZodType<Prisma.UserGroupFindUniqueArgs> =
  z
    .object({
      select: UserGroupSelectSchema.optional(),
      include: UserGroupIncludeSchema.optional(),
      where: UserGroupWhereUniqueInputSchema,
    })
    .strict();

export const UserGroupFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserGroupFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserGroupSelectSchema.optional(),
      include: UserGroupIncludeSchema.optional(),
      where: UserGroupWhereUniqueInputSchema,
    })
    .strict();

export const MovieVoteFindFirstArgsSchema: z.ZodType<Prisma.MovieVoteFindFirstArgs> =
  z
    .object({
      select: MovieVoteSelectSchema.optional(),
      include: MovieVoteIncludeSchema.optional(),
      where: MovieVoteWhereInputSchema.optional(),
      orderBy: z
        .union([
          MovieVoteOrderByWithRelationInputSchema.array(),
          MovieVoteOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MovieVoteWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MovieVoteScalarFieldEnumSchema,
          MovieVoteScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MovieVoteFindFirstOrThrowArgs> =
  z
    .object({
      select: MovieVoteSelectSchema.optional(),
      include: MovieVoteIncludeSchema.optional(),
      where: MovieVoteWhereInputSchema.optional(),
      orderBy: z
        .union([
          MovieVoteOrderByWithRelationInputSchema.array(),
          MovieVoteOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MovieVoteWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MovieVoteScalarFieldEnumSchema,
          MovieVoteScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteFindManyArgsSchema: z.ZodType<Prisma.MovieVoteFindManyArgs> =
  z
    .object({
      select: MovieVoteSelectSchema.optional(),
      include: MovieVoteIncludeSchema.optional(),
      where: MovieVoteWhereInputSchema.optional(),
      orderBy: z
        .union([
          MovieVoteOrderByWithRelationInputSchema.array(),
          MovieVoteOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MovieVoteWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MovieVoteScalarFieldEnumSchema,
          MovieVoteScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const MovieVoteAggregateArgsSchema: z.ZodType<Prisma.MovieVoteAggregateArgs> =
  z
    .object({
      where: MovieVoteWhereInputSchema.optional(),
      orderBy: z
        .union([
          MovieVoteOrderByWithRelationInputSchema.array(),
          MovieVoteOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MovieVoteWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MovieVoteGroupByArgsSchema: z.ZodType<Prisma.MovieVoteGroupByArgs> =
  z
    .object({
      where: MovieVoteWhereInputSchema.optional(),
      orderBy: z
        .union([
          MovieVoteOrderByWithAggregationInputSchema.array(),
          MovieVoteOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: MovieVoteScalarFieldEnumSchema.array(),
      having: MovieVoteScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const MovieVoteFindUniqueArgsSchema: z.ZodType<Prisma.MovieVoteFindUniqueArgs> =
  z
    .object({
      select: MovieVoteSelectSchema.optional(),
      include: MovieVoteIncludeSchema.optional(),
      where: MovieVoteWhereUniqueInputSchema,
    })
    .strict();

export const MovieVoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MovieVoteFindUniqueOrThrowArgs> =
  z
    .object({
      select: MovieVoteSelectSchema.optional(),
      include: MovieVoteIncludeSchema.optional(),
      where: MovieVoteWhereUniqueInputSchema,
    })
    .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserIdentitiesCreateArgsSchema: z.ZodType<Prisma.UserIdentitiesCreateArgs> =
  z
    .object({
      select: UserIdentitiesSelectSchema.optional(),
      include: UserIdentitiesIncludeSchema.optional(),
      data: z.union([
        UserIdentitiesCreateInputSchema,
        UserIdentitiesUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const UserIdentitiesUpsertArgsSchema: z.ZodType<Prisma.UserIdentitiesUpsertArgs> =
  z
    .object({
      select: UserIdentitiesSelectSchema.optional(),
      include: UserIdentitiesIncludeSchema.optional(),
      where: UserIdentitiesWhereUniqueInputSchema,
      create: z.union([
        UserIdentitiesCreateInputSchema,
        UserIdentitiesUncheckedCreateInputSchema,
      ]),
      update: z.union([
        UserIdentitiesUpdateInputSchema,
        UserIdentitiesUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const UserIdentitiesCreateManyArgsSchema: z.ZodType<Prisma.UserIdentitiesCreateManyArgs> =
  z
    .object({
      data: z.union([
        UserIdentitiesCreateManyInputSchema,
        UserIdentitiesCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserIdentitiesDeleteArgsSchema: z.ZodType<Prisma.UserIdentitiesDeleteArgs> =
  z
    .object({
      select: UserIdentitiesSelectSchema.optional(),
      include: UserIdentitiesIncludeSchema.optional(),
      where: UserIdentitiesWhereUniqueInputSchema,
    })
    .strict();

export const UserIdentitiesUpdateArgsSchema: z.ZodType<Prisma.UserIdentitiesUpdateArgs> =
  z
    .object({
      select: UserIdentitiesSelectSchema.optional(),
      include: UserIdentitiesIncludeSchema.optional(),
      data: z.union([
        UserIdentitiesUpdateInputSchema,
        UserIdentitiesUncheckedUpdateInputSchema,
      ]),
      where: UserIdentitiesWhereUniqueInputSchema,
    })
    .strict();

export const UserIdentitiesUpdateManyArgsSchema: z.ZodType<Prisma.UserIdentitiesUpdateManyArgs> =
  z
    .object({
      data: z.union([
        UserIdentitiesUpdateManyMutationInputSchema,
        UserIdentitiesUncheckedUpdateManyInputSchema,
      ]),
      where: UserIdentitiesWhereInputSchema.optional(),
    })
    .strict();

export const UserIdentitiesDeleteManyArgsSchema: z.ZodType<Prisma.UserIdentitiesDeleteManyArgs> =
  z
    .object({
      where: UserIdentitiesWhereInputSchema.optional(),
    })
    .strict();

export const MovieCreateArgsSchema: z.ZodType<Prisma.MovieCreateArgs> = z
  .object({
    select: MovieSelectSchema.optional(),
    include: MovieIncludeSchema.optional(),
    data: z.union([MovieCreateInputSchema, MovieUncheckedCreateInputSchema]),
  })
  .strict();

export const MovieUpsertArgsSchema: z.ZodType<Prisma.MovieUpsertArgs> = z
  .object({
    select: MovieSelectSchema.optional(),
    include: MovieIncludeSchema.optional(),
    where: MovieWhereUniqueInputSchema,
    create: z.union([MovieCreateInputSchema, MovieUncheckedCreateInputSchema]),
    update: z.union([MovieUpdateInputSchema, MovieUncheckedUpdateInputSchema]),
  })
  .strict();

export const MovieCreateManyArgsSchema: z.ZodType<Prisma.MovieCreateManyArgs> =
  z
    .object({
      data: z.union([
        MovieCreateManyInputSchema,
        MovieCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MovieDeleteArgsSchema: z.ZodType<Prisma.MovieDeleteArgs> = z
  .object({
    select: MovieSelectSchema.optional(),
    include: MovieIncludeSchema.optional(),
    where: MovieWhereUniqueInputSchema,
  })
  .strict();

export const MovieUpdateArgsSchema: z.ZodType<Prisma.MovieUpdateArgs> = z
  .object({
    select: MovieSelectSchema.optional(),
    include: MovieIncludeSchema.optional(),
    data: z.union([MovieUpdateInputSchema, MovieUncheckedUpdateInputSchema]),
    where: MovieWhereUniqueInputSchema,
  })
  .strict();

export const MovieUpdateManyArgsSchema: z.ZodType<Prisma.MovieUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MovieUpdateManyMutationInputSchema,
        MovieUncheckedUpdateManyInputSchema,
      ]),
      where: MovieWhereInputSchema.optional(),
    })
    .strict();

export const MovieDeleteManyArgsSchema: z.ZodType<Prisma.MovieDeleteManyArgs> =
  z
    .object({
      where: MovieWhereInputSchema.optional(),
    })
    .strict();

export const GroupCreateArgsSchema: z.ZodType<Prisma.GroupCreateArgs> = z
  .object({
    select: GroupSelectSchema.optional(),
    include: GroupIncludeSchema.optional(),
    data: z.union([GroupCreateInputSchema, GroupUncheckedCreateInputSchema]),
  })
  .strict();

export const GroupUpsertArgsSchema: z.ZodType<Prisma.GroupUpsertArgs> = z
  .object({
    select: GroupSelectSchema.optional(),
    include: GroupIncludeSchema.optional(),
    where: GroupWhereUniqueInputSchema,
    create: z.union([GroupCreateInputSchema, GroupUncheckedCreateInputSchema]),
    update: z.union([GroupUpdateInputSchema, GroupUncheckedUpdateInputSchema]),
  })
  .strict();

export const GroupCreateManyArgsSchema: z.ZodType<Prisma.GroupCreateManyArgs> =
  z
    .object({
      data: z.union([
        GroupCreateManyInputSchema,
        GroupCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GroupDeleteArgsSchema: z.ZodType<Prisma.GroupDeleteArgs> = z
  .object({
    select: GroupSelectSchema.optional(),
    include: GroupIncludeSchema.optional(),
    where: GroupWhereUniqueInputSchema,
  })
  .strict();

export const GroupUpdateArgsSchema: z.ZodType<Prisma.GroupUpdateArgs> = z
  .object({
    select: GroupSelectSchema.optional(),
    include: GroupIncludeSchema.optional(),
    data: z.union([GroupUpdateInputSchema, GroupUncheckedUpdateInputSchema]),
    where: GroupWhereUniqueInputSchema,
  })
  .strict();

export const GroupUpdateManyArgsSchema: z.ZodType<Prisma.GroupUpdateManyArgs> =
  z
    .object({
      data: z.union([
        GroupUpdateManyMutationInputSchema,
        GroupUncheckedUpdateManyInputSchema,
      ]),
      where: GroupWhereInputSchema.optional(),
    })
    .strict();

export const GroupDeleteManyArgsSchema: z.ZodType<Prisma.GroupDeleteManyArgs> =
  z
    .object({
      where: GroupWhereInputSchema.optional(),
    })
    .strict();

export const GroupInviteCreateArgsSchema: z.ZodType<Prisma.GroupInviteCreateArgs> =
  z
    .object({
      select: GroupInviteSelectSchema.optional(),
      include: GroupInviteIncludeSchema.optional(),
      data: z.union([
        GroupInviteCreateInputSchema,
        GroupInviteUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const GroupInviteUpsertArgsSchema: z.ZodType<Prisma.GroupInviteUpsertArgs> =
  z
    .object({
      select: GroupInviteSelectSchema.optional(),
      include: GroupInviteIncludeSchema.optional(),
      where: GroupInviteWhereUniqueInputSchema,
      create: z.union([
        GroupInviteCreateInputSchema,
        GroupInviteUncheckedCreateInputSchema,
      ]),
      update: z.union([
        GroupInviteUpdateInputSchema,
        GroupInviteUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const GroupInviteCreateManyArgsSchema: z.ZodType<Prisma.GroupInviteCreateManyArgs> =
  z
    .object({
      data: z.union([
        GroupInviteCreateManyInputSchema,
        GroupInviteCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GroupInviteDeleteArgsSchema: z.ZodType<Prisma.GroupInviteDeleteArgs> =
  z
    .object({
      select: GroupInviteSelectSchema.optional(),
      include: GroupInviteIncludeSchema.optional(),
      where: GroupInviteWhereUniqueInputSchema,
    })
    .strict();

export const GroupInviteUpdateArgsSchema: z.ZodType<Prisma.GroupInviteUpdateArgs> =
  z
    .object({
      select: GroupInviteSelectSchema.optional(),
      include: GroupInviteIncludeSchema.optional(),
      data: z.union([
        GroupInviteUpdateInputSchema,
        GroupInviteUncheckedUpdateInputSchema,
      ]),
      where: GroupInviteWhereUniqueInputSchema,
    })
    .strict();

export const GroupInviteUpdateManyArgsSchema: z.ZodType<Prisma.GroupInviteUpdateManyArgs> =
  z
    .object({
      data: z.union([
        GroupInviteUpdateManyMutationInputSchema,
        GroupInviteUncheckedUpdateManyInputSchema,
      ]),
      where: GroupInviteWhereInputSchema.optional(),
    })
    .strict();

export const GroupInviteDeleteManyArgsSchema: z.ZodType<Prisma.GroupInviteDeleteManyArgs> =
  z
    .object({
      where: GroupInviteWhereInputSchema.optional(),
    })
    .strict();

export const UserGroupCreateArgsSchema: z.ZodType<Prisma.UserGroupCreateArgs> =
  z
    .object({
      select: UserGroupSelectSchema.optional(),
      include: UserGroupIncludeSchema.optional(),
      data: z.union([
        UserGroupCreateInputSchema,
        UserGroupUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const UserGroupUpsertArgsSchema: z.ZodType<Prisma.UserGroupUpsertArgs> =
  z
    .object({
      select: UserGroupSelectSchema.optional(),
      include: UserGroupIncludeSchema.optional(),
      where: UserGroupWhereUniqueInputSchema,
      create: z.union([
        UserGroupCreateInputSchema,
        UserGroupUncheckedCreateInputSchema,
      ]),
      update: z.union([
        UserGroupUpdateInputSchema,
        UserGroupUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const UserGroupCreateManyArgsSchema: z.ZodType<Prisma.UserGroupCreateManyArgs> =
  z
    .object({
      data: z.union([
        UserGroupCreateManyInputSchema,
        UserGroupCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserGroupDeleteArgsSchema: z.ZodType<Prisma.UserGroupDeleteArgs> =
  z
    .object({
      select: UserGroupSelectSchema.optional(),
      include: UserGroupIncludeSchema.optional(),
      where: UserGroupWhereUniqueInputSchema,
    })
    .strict();

export const UserGroupUpdateArgsSchema: z.ZodType<Prisma.UserGroupUpdateArgs> =
  z
    .object({
      select: UserGroupSelectSchema.optional(),
      include: UserGroupIncludeSchema.optional(),
      data: z.union([
        UserGroupUpdateInputSchema,
        UserGroupUncheckedUpdateInputSchema,
      ]),
      where: UserGroupWhereUniqueInputSchema,
    })
    .strict();

export const UserGroupUpdateManyArgsSchema: z.ZodType<Prisma.UserGroupUpdateManyArgs> =
  z
    .object({
      data: z.union([
        UserGroupUpdateManyMutationInputSchema,
        UserGroupUncheckedUpdateManyInputSchema,
      ]),
      where: UserGroupWhereInputSchema.optional(),
    })
    .strict();

export const UserGroupDeleteManyArgsSchema: z.ZodType<Prisma.UserGroupDeleteManyArgs> =
  z
    .object({
      where: UserGroupWhereInputSchema.optional(),
    })
    .strict();

export const MovieVoteCreateArgsSchema: z.ZodType<Prisma.MovieVoteCreateArgs> =
  z
    .object({
      select: MovieVoteSelectSchema.optional(),
      include: MovieVoteIncludeSchema.optional(),
      data: z.union([
        MovieVoteCreateInputSchema,
        MovieVoteUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const MovieVoteUpsertArgsSchema: z.ZodType<Prisma.MovieVoteUpsertArgs> =
  z
    .object({
      select: MovieVoteSelectSchema.optional(),
      include: MovieVoteIncludeSchema.optional(),
      where: MovieVoteWhereUniqueInputSchema,
      create: z.union([
        MovieVoteCreateInputSchema,
        MovieVoteUncheckedCreateInputSchema,
      ]),
      update: z.union([
        MovieVoteUpdateInputSchema,
        MovieVoteUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const MovieVoteCreateManyArgsSchema: z.ZodType<Prisma.MovieVoteCreateManyArgs> =
  z
    .object({
      data: z.union([
        MovieVoteCreateManyInputSchema,
        MovieVoteCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MovieVoteDeleteArgsSchema: z.ZodType<Prisma.MovieVoteDeleteArgs> =
  z
    .object({
      select: MovieVoteSelectSchema.optional(),
      include: MovieVoteIncludeSchema.optional(),
      where: MovieVoteWhereUniqueInputSchema,
    })
    .strict();

export const MovieVoteUpdateArgsSchema: z.ZodType<Prisma.MovieVoteUpdateArgs> =
  z
    .object({
      select: MovieVoteSelectSchema.optional(),
      include: MovieVoteIncludeSchema.optional(),
      data: z.union([
        MovieVoteUpdateInputSchema,
        MovieVoteUncheckedUpdateInputSchema,
      ]),
      where: MovieVoteWhereUniqueInputSchema,
    })
    .strict();

export const MovieVoteUpdateManyArgsSchema: z.ZodType<Prisma.MovieVoteUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MovieVoteUpdateManyMutationInputSchema,
        MovieVoteUncheckedUpdateManyInputSchema,
      ]),
      where: MovieVoteWhereInputSchema.optional(),
    })
    .strict();

export const MovieVoteDeleteManyArgsSchema: z.ZodType<Prisma.MovieVoteDeleteManyArgs> =
  z
    .object({
      where: MovieVoteWhereInputSchema.optional(),
    })
    .strict();
