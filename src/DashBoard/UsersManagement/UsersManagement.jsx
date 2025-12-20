import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { TbCrown, TbCrownOff } from "react-icons/tb";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("")
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const makeAdminHandler = (user, user_role) => {
    const roleInfo = { role: user_role };
    Swal.fire({
      title: `Are you sure you want to ${
        user_role === "admin" ? "make" : "remove"
      } ${user.name} ${user_role === "admin" ? "as" : "from"} admin?`,
      icon: "warning",
      showCancelButton: true,
      customClass: {
        title: "swal-text",
        htmlContainer: "swal-text",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}/role`, roleInfo)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: `You make ${user.name} as admin`,

                icon: "success",
                timer: 2500,
                customClass: {
                  title: "swal-text",
                  htmlContainer: "swal-text",
                  confirmButton: "swal-confirm",
                },
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h2>Users Management: {users.length}</h2>
        {/* search user */}
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input 
          onChange={(e)=>setSearchText(e.target.value)}
          type="search" 
          required placeholder="Search" />
        </label>
      </div>

      <div className="overflow-x-auto table-zebra bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Info</th>
              <th>Role</th>
              <th className="text-center">Admin Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photo_url} alt="user photo" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td className="text-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => makeAdminHandler(user, "user")}
                      className="btn btn-square btn-sm hover:btn-error mx-auto btn-error"
                    >
                      <TbCrownOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => makeAdminHandler(user, "admin")}
                      className="btn btn-square btn-sm hover:btn-primary text-black mx-auto btn-primary "
                    >
                      <TbCrown />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
