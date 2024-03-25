"use server";

import { groupFormFactory } from "./groupForm";

export default async function validateGroup(prev: unknown, formData: FormData) {
  return await groupFormFactory.validateFormData(formData);
}
