import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const { data: parcels = [], refetch: parcelRefetch } = useQuery({
    queryKey: ["parcels", "pending-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?delivery_status=parcel-paid"
      );
      return res.data;
    },
  });

  const { data: riders = [], refetch: riderRefetch } = useQuery({
    queryKey: ["rider", selectedParcel?.sender_district, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&work_status=available&district=${selectedParcel?.sender_district}`
      );
      return res.data;
    },
  });

  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    modalRef.current.showModal();
  };

  const assignRiderHandler = (rider) => {
    const riderAssignInfo = {
      rider_id: rider._id,
      rider_email: rider.email,
      rider_name: rider.name,
      rider_phone_no: rider.phone_no,
      parcel_id: selectedParcel._id,
      tracking_id: selectedParcel.tracking_id,
      delivery_status: "rider-assigned",
      work_status: "in-transit"
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          modalRef.current.close();
          parcelRefetch();
          riderRefetch();
          Swal.fire({
            title: `Rider assigned for this parcel`,
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
      <h2>Assign Rider: {parcels?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Crated At</th>
              <th>Pickup Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcel_name}</td>
                <td>{parcel.cost}</td>
                <td>
                  {new Date(parcel.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  {parcel.sender_address}, {parcel.sender_district}
                </td>
                <td>
                  <button
                    onClick={() => openModal(parcel)}
                    className="btn btn-primary text-black"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders: {riders.length}</h3>

          <div className="overflow-x-auto">
            {riders ? (
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, index) => (
                    <tr key={rider._id}>
                      <th>{index + 1}</th>
                      <td>{rider.name}</td>
                      <td>{rider.phone_no}</td>
                      <td>
                        <button
                          onClick={() => assignRiderHandler(rider)}
                          className="btn btn-primary text-black"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-2xl font-semibold text-center my-4">
                No rider available for this district!
              </p>
            )}
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
