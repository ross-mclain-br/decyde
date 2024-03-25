import { Button } from "~/components/ui/button";
import Link from "next/link";

export const BackButton = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <Button variant={"link"} className={"group flex items-center px-0"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-1 h-5 w-5 text-blue transition-all  duration-300 ease-in-out group-hover:text-primary"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>

        <span>Back</span>
      </Button>
    </Link>
  );
};
