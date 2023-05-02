import React from "react";
import { useUser } from "../../context/user-context";
import { Navigate } from "react-router-dom";

export const AdminProtector = ({ children }) => {
  const { isAdmin } = useUser();
  if (isAdmin) {
    return children;
  }
  return <Navigate to="/" replace />;
};

