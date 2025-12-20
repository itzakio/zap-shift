import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading: isRoleLoading, data: role = "user" } = useQuery({
    queryKey: ["user_role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data;
    },
  });
  return {isRoleLoading, role};
};

export default useRole;
