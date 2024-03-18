"use server";

import { permanentRedirect } from "next/navigation";

export async function SignInRedirect() {
  permanentRedirect(`/sign-up`); // Navigate to the new user profile
}

export default SignInRedirect;
