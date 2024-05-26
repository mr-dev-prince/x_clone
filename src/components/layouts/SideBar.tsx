"use client";

import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SideBarLogo from "./SideBarLogo";
import SideBarItem from "./SideBarItem";
import { BiLogOut } from "react-icons/bi";
import SideBarTweetButton from "./SideBarTweetButton";

const SideBar = () => {
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

          <SideBarItem onClick={() => {}} icon={BiLogOut} label="Logout" />
          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
