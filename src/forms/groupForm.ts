import { createFormFactory } from "@tanstack/react-form";
import { z } from "zod";

export const groupFormInputType = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  color: z.string().optional(),
  ownerId: z.number(),
});

export type GroupFormType = z.infer<typeof groupFormInputType>;
export const groupFormFactory = createFormFactory<GroupFormType>({
  defaultValues: {
    id: undefined,
    name: "",
    description: "",
    image: "",
    color: "",
    ownerId: 0,
  },
  onServerValidate() {
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
