import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className={"container mt-52 flex items-center justify-center"}>
      {" "}
      <SignIn
        afterSignInUrl={"/"}
        afterSignUpUrl={"/"}
        appearance={{
          variables: {
            colorPrimary: "#00172f",
            colorBackground: "rgb(60 185 174 / 50%)",
            colorText: "#00172f",
          },
        }}
      />
    </div>
  );
}
