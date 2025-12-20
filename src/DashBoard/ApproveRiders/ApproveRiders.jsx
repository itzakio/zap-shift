import React from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import { TbListDetails } from "react-icons/tb";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updatedDoc = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updatedDoc).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: `Rider ${status}!`,
          text: `Rider status set to ${status}!`,
          icon: "success",
          timer: 3000,
          customClass: {
            title: "swal-text",
            htmlContainer: "swal-text",
            confirmButton: "swal-confirm",
          },
        });
      }
    });
  };

  return (
    <div>
      <h2>Approve Pending Riders: {riders.length}</h2>
      <div className="bg-base-100 overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-left">Name</th>
              <th className="text-center">Phone No</th>
              <th className="text-center">District</th>
              <th className="text-center">Application Status</th>
              <th className="text-center">Work Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th className="text-center">{index + 1}</th>
                <td className="text-left">{rider.name}</td>
                <td className="text-center">{rider.phone_no}</td>
                <td className="text-center">{rider.district}</td>
                <td className="text-center">
                  <p
                    className={`rounded-full w-fit p-1 px-2 mx-auto ${
                      rider.status === "pending"
                        ? "bg-yellow-300"
                        : rider.status === "approved"
                        ? "bg-green-300"
                        : "bg-red-300"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td className="text-center">
                  <p
                    className={`rounded-full w-fit p-1 px-2 mx-auto ${
                      rider.work_status === "in_transit"
                        ? "text-yellow-700"
                        : rider.work_status === "available"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {rider.work_status}
                  </p>
                </td>
                <td>
                  <div className="flex justify-center items-center space-x-2">
                    <div className="flex justify-center items-center space-x-2">
                      <button className="btn btn-square btn-sm hover:btn-primary text-black">
                        <TbListDetails />
                      </button>
                      <button
                        onClick={() => updateRiderStatus(rider, "approved")}
                        className="btn btn-square btn-sm hover:btn-primary text-black"
                      >
                        <IoPersonAdd />
                      </button>
                      <button
                        onClick={() => updateRiderStatus(rider, "rejected")}
                        className="btn btn-square btn-sm hover:bg-yellow-400 text-black"
                      >
                        <IoPersonRemove />
                      </button>
                      <button className="btn btn-square btn-sm hover:btn-error">
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
