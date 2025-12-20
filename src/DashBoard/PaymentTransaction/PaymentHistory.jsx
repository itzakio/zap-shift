import React from "react";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { TbListDetails } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">Payment History {payments.length}</h2>
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-left">Parcel Info</th>
            <th className="text-center">Recipient Info</th>
            <th className="text-center">Transaction ID</th>
            <th className="text-center">Payment Info</th>
            <th className="text-center">Time</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment?._id}>
              <th className="text-center">{index + 1}</th>
              <td className="text-left">{payment?.parcel_name}</td>
              <td className="text-center">{payment?.delivery_status}</td>
              <td className="text-center">{payment?.transaction_id}</td>
              <td className="text-center">
                $ {payment?.amount}
                {` (${payment?.payment_status})`}
              </td>
              <td className="text-center">
                {new Date(payment.paid_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="text-center">
                <button className="btn">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
