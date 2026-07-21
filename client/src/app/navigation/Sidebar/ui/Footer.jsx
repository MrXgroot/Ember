import React from "react";
import { useAuth } from "@/app/auth";
export const Footer = () => {
  const auth = useAuth();
  return <button onClick={() => auth.logout()}>logout</button>;
};
