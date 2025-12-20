import React from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignedTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?rider_email=${user.email}&delivery_status=rider_assigned`
      );
      return res.data;
    },
  });


  const { data: rider = [] } = useQuery({
    queryKey: ["single-rider", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders?email=${user.email}`);
      return res.data;
    },
  });

  const parcelStatusUpdateHandler = (parcel, status) => {
    const statusInfo = {
      delivery_status: status,
      rider_id: parcel.rider_id,
      tracking_id: parcel.tracking_id
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `Parcel delivery status updated with ${status
              .split("_")
              .join(" ")}!`,
            icon: "success",
            timer: 2000,
            customClass: {
              title: "swal-text",
              htmlContainer: "swal-text",
              confirmButton: "swal-confirm",
            },
          });
        }
      });
  };

  const parcelRejectHandler = (parcel) => {
    const parcelInfo = {
      rider_id: rider[0]._id,
      rider_email: "",
      rider_name: "",
      rider_phone_no: "",
      parcel_id: parcel._id,
      delivery_status: "parcel-paid",
      work_status: "available",
    };

    axiosSecure.patch(`/parcels/${parcel._id}`, parcelInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: `Parcel Rejected!`,
          icon: "success",
          timer: 2000,
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
      <h2 className="text-2xl font-semibold my-4">
        Assigned Tasks: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        {parcels ? (
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th className="text-center">Address</th>
                <th className="text-center">Cost</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel?._id}>
                  <th>{index + 1}</th>
                  <td>{parcel?.parcel_name}</td>
                  <td className="text-center">
                    {parcel?.sender_address}, {parcel?.sender_district}
                  </td>
                  <td className="text-center">{parcel?.cost}</td>
                  <td className="space-x-4 flex justify-center">
                    {parcel.delivery_status === "rider-assigned" ? (
                      <>
                        <button
                          onClick={() =>
                            parcelStatusUpdateHandler(parcel, "rider-arriving")
                          }
                          className="btn btn-primary text-black"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => parcelRejectHandler(parcel, "parcel-paid")}
                          className="btn btn-error text-black"
                        >
                          Reject
                        </button>
                      </>
                    ) : parcel.delivery_status === "rider-arriving" ? (
                      <button
                        onClick={() =>
                          parcelStatusUpdateHandler(parcel, "picked-up")
                        }
                        className="btn btn-primary text-black"
                      >
                        Marked as Picked Up
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          parcelStatusUpdateHandler(parcel, "parcel-delivered")
                        }
                        className="btn btn-primary text-black"
                      >
                        Marked as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-2xl font-semibold text-center my-4">
            No Assign Task Available!
          </p>
        )}
      </div>
    </div>
  );
};

export default AssignedTasks;
