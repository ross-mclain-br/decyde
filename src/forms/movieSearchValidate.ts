"use server";
import { movieSearchFormFactory } from "./movieSearchForm";

export default async function validateMovieSearch(
  prev: unknown,
  formData: FormData,
) {
  return await movieSearchFormFactory.validateFormData(formData);
}
