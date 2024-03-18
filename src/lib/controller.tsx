"use client";
import { useEffect, type ReactElement } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";

export const Controller = ({ children }: { children: ReactElement }) => {
  const { mutate: userMutation } = api.user.upsertUser.useMutation();

  const { user, isSignedIn, isLoaded } = useUser();

  const {
    data: userData,
    isSuccess: userDataSuccess,
    refetch: refetchUserData,
  } = api.user.getUserByExternalId.useQuery({
    externalUserId: user?.id ?? "",
  });

  useEffect(() => {
    if (user?.id && isSignedIn && isLoaded && !userDataSuccess) {
      void refetchUserData();
    }
  }, [user, isLoaded, isSignedIn, userDataSuccess, refetchUserData]);

  useEffect(() => {
    if (
      !userData?.id &&
      user?.id &&
      isSignedIn &&
      isLoaded &&
      userDataSuccess
    ) {
      console.warn("Upserting User!");
      userMutation({
        externalId: user.id,
        emailAddress: user?.primaryEmailAddress?.emailAddress ?? "",
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        avatar: user?.profileImageUrl ?? "",
        userIdentities: user?.externalAccounts?.map((account) => ({
          provider: account.provider,
          providerId: account.providerUserId,
        })),
      });
    }
  }, [userData, user, isSignedIn, isLoaded, userMutation, userDataSuccess]);

  return children;
};

export default Controller;
