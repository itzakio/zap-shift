import React from "react";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?rider_email=${user.email}&delivery_status=parcel-delivered`
      );
      return res.data;
    },
  });

  const calculatePayout = parcel =>{
    if(parcel.sender_district === parcel.receiver_district){
      return parcel.cost * 0.8;
    }else{
      return parcel.cost * 0.6;
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">
        Completed Deliveries: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th className="text-center">Address</th>
              <th className="text-center">Cost</th>
              <th className="text-center">Payout</th>
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
                <td className="text-center">{calculatePayout(parcel)}</td>
                <td className="flex justify-center">
                  <button className="btn btn-primary text-black">Cash Out</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
