"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { NotificationsBell } from "~/app/_components/notifications/notificationsBell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

const navigation = [
  { name: "Decisions", href: "/" },
  { name: "Groups", href: "/groups" },
];
export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("personal");

  const { user } = useUser();
  const { data: userData } = api.user.getUserByExternalId.useQuery(
    {
      externalUserId: user?.id ?? "",
    },
    {
      enabled: !!user?.id,
    },
  );

  //Get all user groups
  const {
    data: userGroupData,
    refetch: userGroupRefetch,
    isLoading: userGroupLoading,
  } = api.group.getUserGroups.useQuery(
    {
      userId: userData?.id ?? 0,
    },
    {
      enabled: !!userData?.id,
    },
  );
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex gap-3 lg:flex-1">
          <Link href="/" className="-m-1.5 rounded-full bg-blue p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              className="h-8 w-auto"
              src="/images/decision_icon.png"
              alt=""
              width={32}
              height={32}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold leading-6 text-blue"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-x-3 lg:flex lg:flex-1 lg:justify-end">
          <Select
            value={selectedGroup}
            onValueChange={(value) => setSelectedGroup(() => value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              {userGroupData?.map((userGroup) => (
                <SelectItem
                  key={`group-select-item-${userGroup?.group?.id}`}
                  value={userGroup?.group?.id?.toString()}
                >
                  {userGroup?.group?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <NotificationsBell />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-12 h-12",
                userButtonPopoverCard: "bg-white shadow-lg text-blue",
              },
            }}
          />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="text-primary-foreground fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gold">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Decyde</span>
              <Image
                className="h-8 w-auto"
                src="/images/decision_icon.png"
                alt=""
                width={32}
                height={32}
              />
            </Link>
            <Button type="button" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gold/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gold transition-all hover:bg-gold hover:text-purple"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-12 h-12",
                      userButtonPopoverCard: "bg-white shadow-lg",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
