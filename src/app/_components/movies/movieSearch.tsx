"use client";
import {
  movieSearchFormFactory,
  MovieSearchType,
} from "~/forms/movieSearchForm";
import { FormApi, mergeForm, useTransform } from "@tanstack/react-form";
import { useFormState } from "react-dom";
import { Input } from "~/components/ui/input";
import { zodValidator } from "@tanstack/zod-form-adapter";
import validateMovieSearch from "~/forms/movieSearchValidate";
import { Button } from "~/components/ui/button";

export const MovieSearch = ({
  currentSearchValue,
  setCurrentSearchValue,
  currentTypeValue,
  setCurrentTypeValue,
}: {
  currentSearchValue: string | null;
  setCurrentSearchValue: (value: string) => void;
  currentTypeValue: MovieSearchType | null;
  setCurrentTypeValue: (value: MovieSearchType) => void;
}) => {
  const [state, action] = useFormState(
    validateMovieSearch,
    movieSearchFormFactory.initialFormState,
  );

  const { useStore, handleSubmit, Subscribe, Field } =
    movieSearchFormFactory.useForm({
      transform: useTransform(
        (baseForm: FormApi<unknown, unknown>) => mergeForm(baseForm, state),
        [state],
      ),
      onSubmit: async (values) => {
        console.log(values.formApi.state);
        if (
          values.formApi.state.isValid &&
          !values.formApi.state.errorMap?.onServer
        ) {
          if (values.value.search && values.value.type) {
            setCurrentSearchValue(values.value.search);
            setCurrentTypeValue(values.value.type);
          }
        }
      },
    });

  const formErrors = useStore((formState) => formState.errors);

  return (
    <div className={"mt-16"}>
      <div className={"container md:px-16"}>
        <form
          action={action as never}
          onSubmit={() => handleSubmit()}
          className={"flex"}
        >
          {formErrors.map((error) => (
            <p key={error as string}>{error}</p>
          ))}
          <Field
            name="search"
            validatorAdapter={zodValidator}
            validators={{
              onSubmit: ({ value }) =>
                (value?.length ?? 0) < 1
                  ? "Search must be at least 1 character long"
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
                  placeholder={"Search for a movie!"}
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
          <Subscribe
            selector={(formState) => [
              formState.canSubmit,
              formState.isSubmitting,
            ]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                variant={"link"}
                disabled={!canSubmit}
                className={"rounded-l-none"}
              >
                {isSubmitting ? "..." : "Search"}
              </Button>
            )}
          </Subscribe>
        </form>
      </div>
    </div>
  );
};
