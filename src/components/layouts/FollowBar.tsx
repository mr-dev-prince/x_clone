"use client";

import useAllUsers from "@/hooks/useAllUsers";
import axios from "axios";
import React, { useEffect } from "react";

const FollowBar = () => {
  useEffect(() => {
    const getAllUsers = async () => {
      const fetchedUser = await axios.get("/api/users", {
        withCredentials: true,
      });
      const users = fetchedUser?.data?.users;
      useAllUsers.setState({ users });
    };

    getAllUsers();
  }, []);

  const users = useAllUsers((state) => state.users);

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className=" bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        {users?.map((item: any) => (
          <p key={item.id}>{item.email}</p>
        ))}
      </div>
    </div>
  );
};

export default FollowBar;
