"use client";

import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SideBarLogo from "./SideBarLogo";
import SideBarItem from "./SideBarItem";
import { BiLogOut } from "react-icons/bi";
import SideBarTweetButton from "./SideBarTweetButton";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";

const SideBar = () => {
  const user = useCurrentUser((state) => state.user);

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: FaUser,
    },
  ];

  const handleLogOut = async () => {
    try {
      await signOut();
      toast.success("Logged Out...!", {
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className=" space-y-2 lg:w-[230px]">
          <SideBarLogo />
          {items.map((item) => (
            <SideBarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              onClick={() => {}}
            />
          ))}

          {user ? (
            <SideBarItem
              onClick={handleLogOut}
              icon={BiLogOut}
              label="Logout"
            />
          ) : null}

          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
