"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useLoginModal from "@/hooks/useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const user = await axios.post("/api/register", {
        email,
        username,
        name,
        password,
      });

      toast.success("Account Created...", {
        position: "top-right",
        duration: 2000,
      });

      console.log(user);

      setIsLoading(false);
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, name, username, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        value={email}
        placeholder="Email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        value={name}
        placeholder="Name"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        value={username}
        placeholder="Username"
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        placeholder="Password"
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className=" text-neutral-400 text-center mt-4">
      <p>
        Already have an account ?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      disabled={isLoading}
      body={bodyContent}
      title="Create an account !"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
