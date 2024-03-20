"use server";

import { permanentRedirect } from "next/navigation";

export default async function Page() {
  permanentRedirect(`/sign-up`); // Navigate to the new user profile
}
