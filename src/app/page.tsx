// app/page.tsx (or any other route file)
"use client";

import Header from "@/components/Header";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

const Home = () => {
  useEffect(() => {
    const getUserAndSetUser = async () => {
      const session = await getSession();
      const user = session?.user || null;
      useCurrentUser.setState({ user });
      console.log("home data", user);
    };

    getUserAndSetUser();
  }, []);

  return (
    <>
      <Header label="Home" />
    </>
  );
};

export default Home;
