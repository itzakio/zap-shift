import React from "react";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels?email=${user.email}`);
      return res.data;
    },
  });

  const deleteParcelHandler = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`);
          console.log(res.data);

          // Show success only if delete succeeded
          if (res.data.deletedCount) {
            // refresh the data or refetch
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error(error);

          // Show error message if delete failed
          Swal.fire({
            title: "Error!",
            text: "Something went wrong!",
            icon: "error",
          });
        }
      }
    });
  };

  const paymentHandler = async(parcel) => {
    const parcel_info = {
      cost: parcel.cost,
      parcel_id: parcel._id,
      parcel_name: parcel.parcel_name,
      sender_email: parcel.sender_email,
      tracking_id: parcel.tracking_id,
    };

    const res = await axiosSecure.post("/payment-checkout-session", parcel_info);
    console.log(res.data.url)
    window.location.assign(res.data.url) 
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">All of my parcels: {parcels.length}</h2>
      <div className="bg-base-100 overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-left">Name</th>
              <th className="text-center">Cost</th>
              <th className="text-center">Payment</th>
              <th className="text-center">Tracking ID</th>
              <th className="text-center">Delivery Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th className="text-center">{index + 1}</th>
                <td className="text-left">{parcel.parcel_name}</td>
                <td className="text-center">{parcel.cost}</td>
                <td className="text-center">
                  {parcel.payment_status === "paid" ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <button
                      onClick={() => {
                        paymentHandler(parcel);
                      }}
                      // to={`/dashboard/payment/${parcel._id}`}
                      className="btn btn-primary text-black btn-sm"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td className="text-center"><Link to={`/parcel-track/${parcel.tracking_id}`}>{parcel.tracking_id}</Link></td>
                <td className="text-center">{parcel.delivery_status}</td>
                <td>
                  <div className="flex justify-center items-center space-x-2">
                    <button className="btn btn-square btn-sm hover:btn-primary text-black">
                      <TbListDetails />
                    </button>
                    <button className="btn btn-square btn-sm hover:btn-primary text-black">
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => deleteParcelHandler(parcel._id)}
                      className="btn btn-square btn-sm hover:btn-error"
                    >
                      <RiDeleteBin6Line />
                    </button>
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

export default MyParcels;
