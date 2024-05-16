"use client";
import { useFormState } from "react-dom";
import { mergeForm, useTransform } from "@tanstack/react-form";
import { groupFormFactory } from "~/forms/groupForm";
import validateGroup from "~/forms/groupValidate";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { UserDisplay } from "~/app/_components/users/userDisplay";
import { api } from "~/trpc/react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "~/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Loading from "~/app/_components/loading";

export const CreateGroup = () => {
  const router = useRouter();

  const { user } = useUser();
  const { data: userData } = api.user.getUserByExternalId.useQuery(
    {
      externalUserId: user?.id ?? "",
    },
    {
      enabled: !!user?.id,
    },
  );

  const upsertGroup = api.group.upsertGroup.useMutation({
    onSettled: () => {
      router.push("/groups", { scroll: false });
    },
  });

  const [state, action] = useFormState(
    validateGroup,
    groupFormFactory.initialFormState,
  );

  const { useStore, handleSubmit, Subscribe, Field } = groupFormFactory.useForm(
    {
      transform: useTransform(
        (baseForm) => mergeForm(baseForm ?? {}, state ?? {}),
        [state],
      ),
      onSubmit: async (values) => {
        console.log(values.formApi.state);
        if (
          values.formApi.state.isValid &&
          !values.formApi.state.errorMap?.onServer &&
          userData?.id
        ) {
          upsertGroup.mutate({
            id: 0,
            name: values.value.name,
            description: values.value.description,
            image: "",
            color: "",
            ownerId: userData?.id ?? 0,
            users: [{ userId: userData?.id ?? 0, type: "OWNER" }],
          });
        }
      },
    },
  );

  const formErrors = useStore((formState) => formState.errors);
  return (
    <div className={"p-8"}>
      {upsertGroup.isPending ? (
        <div className={"mt-24 flex items-center justify-center py-32"}>
          <Loading />
        </div>
      ) : (
        <div className={"container md:w-6/12 md:px-16"}>
          {userData ? (
            <div className={"mb-6"}>
              <h2 className={"px-3 text-2xl font-bold text-gray-400"}>Owner</h2>
              <UserDisplay user={userData} />
            </div>
          ) : (
            <div className={"mb-3"}>
              <h2 className={"px-3 text-2xl font-bold text-gray-400"}>Owner</h2>
              <div className="flex items-center space-x-4 p-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          )}
          <form
            action={action as never}
            onSubmit={() => handleSubmit()}
            className={"flex flex-col gap-6"}
          >
            {formErrors.map((error) => (
              <p key={error as string}>{error}</p>
            ))}
            <Field
              name="name"
              validatorAdapter={zodValidator}
              validators={{
                onSubmit: ({ value }) =>
                  (value?.length ?? 0) < 1
                    ? "Name must be at least 1 character long"
                    : undefined,
              }}
            >
              {(field) => (
                <div className={"flex w-full flex-col"}>
                  <Input
                    className={
                      "rounded-none border-x-0 border-b-2 border-t-0 placeholder:text-2xl placeholder:font-bold"
                    }
                    onBlur={field.handleBlur}
                    placeholder={"Name"}
                    value={field.state.value}
                    type={"search"}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.map((error) => (
                    <p key={error as string}>{error}</p>
                  ))}
                </div>
              )}
            </Field>
            <Field name="description">
              {(field) => (
                <div className={"flex w-full flex-col"}>
                  <Textarea
                    className={
                      "rounded-none border-x-0 border-b-2 border-t-0 placeholder:text-2xl placeholder:font-bold"
                    }
                    onBlur={field.handleBlur}
                    placeholder={"Description"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.map((error) => (
                    <p key={error as string}>{error}</p>
                  ))}
                </div>
              )}
            </Field>

            <Subscribe
              selector={(formState) => [
                formState.canSubmit,
                formState.isSubmitting,
              ]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={!canSubmit}
                  className={"ml-auto"}
                >
                  {isSubmitting ? "..." : "Save Group"}
                </Button>
              )}
            </Subscribe>
          </form>
        </div>
      )}
    </div>
  );
};
