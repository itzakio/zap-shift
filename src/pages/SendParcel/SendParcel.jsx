import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const SendParcel = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicates = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicates)];
  const senderRegion = useWatch({ control, name: "sender_region" });
  const receiverRegion = useWatch({ control, name: "receiver_region" });
  const navigate = useNavigate();

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter(
      (center) => center.region === region
    );
    const districts = regionDistricts.map(
      (singleRegion) => singleRegion.district
    );
    return districts;
  };

  const parcelBookingHandler = (data) => {
    const isDocument = data.parcel_type === "document";
    const isSameDistrict = data.sender_district === data.receiver_district;
    const parcelWeight = data.parcel_weight;
    const now = new Date();
    let cost = 0;
    console.log(data, isSameDistrict, isDocument);

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = extraWeight * 40;
        cost = isSameDistrict
          ? minCharge + extraCharge
          : minCharge + extraCharge + 40;
      }
    }

    data.user_email = user?.email;
    data.created_at = now.toISOString();
    data.cost = cost;

    Swal.fire({
      title: "Agree with the cost?",
      text: `You have to pay  ৳${cost}`,
      icon: "warning",
      showCancelButton: true,
      customClass: {
        title: "swal-text",
        htmlContainer: "swal-text",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
      confirmButtonText: "Confirm and Continue Payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save parcel to the database
        axiosSecure
          .post("/parcels", data)
          .then((res) => {
            console.log("after saving parcel", res.data);
            if (res.data.insertedId) {
              navigate("/dashboard/my-parcels")
              Swal.fire({
                title: "Booked!",
                text: "Your parcel has been booked. Pay now!",
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
    <section className="bg-base-100 box-padding text-secondary rounded-4xl">
      <h2 className="text-secondary text-4xl lg:text-5xl xl:text-6xl font-extrabold">
        Send A Parcel
      </h2>
      <p className="font-extrabold text-xl md:text-2xl lg:text-3xl my-8">
        Enter your parcel details
      </p>
      <form onSubmit={handleSubmit(parcelBookingHandler)}>
        {/* top part */}
        <div className="space-y-4 border-t border-b border-gray-300 py-8">
          <div className="flex gap-8">
            <div className="flex items-center">
              <input
                id="document"
                type="radio"
                value="document"
                {...register("parcel_type")}
                className="radio"
                defaultChecked
              />
              <label
                htmlFor="document"
                className="text-secondary label font-semibold ml-2"
              >
                Document
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="not-document"
                type="radio"
                value="not_document"
                {...register("parcel_type")}
                className="radio"
              />
              <label
                htmlFor="not-document"
                className="text-secondary label font-semibold ml-2"
              >
                Not-Document
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            <div>
              {/* parcel name */}
              <label className="text-secondary label font-semibold mb-2">
                Parcel Name
              </label>
              <input
                {...register("parcel_name", {
                  required: "Parcel name is required",
                })}
                type="text"
                className="input w-full text-base placeholder:text-accent"
                placeholder="Parcel Name"
              />
              {errors?.parcel_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parcel_name.message}
                </p>
              )}
            </div>
            <div>
              {/* parcel weight */}
              <label className="text-secondary label font-semibold mb-2">
                Parcel Weight (KG)
              </label>
              <input
                {...register("parcel_weight", {
                  required: "Parcel weight is required",
                  min: {
                    value: 0,
                    message: "Weight cannot be negative",
                  },
                  pattern: {
                    value: /^\d*\.?\d+$/, // allows decimals like 1.5, 2.3, .5
                    message: "Enter a valid weight",
                  },
                  valueAsNumber: true,
                })}
                type="number"
                onWheel={(e) => e.target.blur()}
                step="any"
                className="input w-full text-base placeholder:text-accent"
                placeholder="Parcel Weight (KG)"
              />
              {errors?.parcel_weight && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parcel_weight.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
          {/* Sender Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-extrabold">Sender Details</h4>
            {/* sender_name */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Name
              </label>
              <input
                {...register("sender_name", {
                  required: "Sender name is required",
                })}
                type="text"
                defaultValue={user?.displayName}
                className="input w-full text-base placeholder:text-accent"
                placeholder="Sender Name"
              />
              {errors?.sender_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sender_name.message}
                </p>
              )}
            </div>
            {/* sender_address */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Address
              </label>
              <input
                {...register("sender_address", {
                  required: "Address is required",
                })}
                type="text"
                className="input w-full text-base placeholder:text-accent"
                placeholder="Sender Address"
              />
              {errors?.senderAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderAddress.message}
                </p>
              )}
            </div>
            {/* sender_phone_no */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Phone No
              </label>
              <input
                {...register("sender_phone_no", {
                  required: "Sender Phone No is required",
                  pattern: {
                    value: /^01[0-9]{9}$/,
                    message: "Phone number must be 11 digits and start with 01",
                  },
                })}
                type="text"
                className="input w-full text-base placeholder:text-accent"
                placeholder="Sender Phone No"
              />
              {errors?.sender_phone_no && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sender_phone_no.message}
                </p>
              )}
            </div>
            {/* sender_email */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Email
              </label>
              <input
                {...register("sender_email")}
                type="email"
                defaultValue={user?.email}
                className="input w-full text-base placeholder:text-accent"
                placeholder="Sender Email"
              />
            </div>
            {/* sender_region */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Region
              </label>

              <select
                className="input w-full text-base placeholder:text-accent"
                {...register("sender_region", {
                  required: "Region name is required",
                })}
              >
                <option value="">Select your Region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {errors?.sender_region && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sender_region.message}
                </p>
              )}
            </div>
            {/* sender_district */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                District
              </label>

              <select
                className="input w-full text-base placeholder:text-accent"
                {...register("sender_district", {
                  required: "Sender District name is required",
                })}
              >
                <option value="">Select Sender District</option>

                {districtByRegion(senderRegion).map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {errors?.sender_district && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sender_district.message}
                </p>
              )}
            </div>
            {/* pickup_instruction */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Pickup Instruction
              </label>
              <textarea
                {...register("pickup_instruction")}
                type="text"
                className="input w-full h-28 text-base placeholder:text-accent py-2"
                placeholder="Pickup Instruction"
              />
            </div>
          </div>

          {/* Receiver Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-extrabold">Receiver Details</h4>
            {/* receiver_name */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Name
              </label>
              <input
                {...register("receiver_name", {
                  required: "Receiver name is required",
                })}
                type="text"
                className="input w-full text-base placeholder:text-accent"
                placeholder="Receiver Name"
              />
              {errors?.receiver_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiver_name.message}
                </p>
              )}
            </div>
            {/* receiver_address */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Address
              </label>
              <input
                {...register("receiver_address", {
                  required: "Receiver Address is required",
                })}
                type="text"
                className="input w-full text-base placeholder:text-accent"
                placeholder="Receiver Address"
              />
              {errors?.receiver_address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiver_address.message}
                </p>
              )}
            </div>
            {/* receiver_phone_no */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Phone No
              </label>
              <input
                {...register("receiver_phone_no", {
                  required: "Receiver Phone No is required",
                  pattern: {
                    value: /^01[0-9]{9}$/,
                    message: "Phone number must be 11 digits and start with 01",
                  },
                })}
                type="text"
                className="input w-full text-base placeholder:text-accent"
                placeholder="Receiver Phone No"
              />
              {errors?.receiver_phone_no && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiver_phone_no.message}
                </p>
              )}
            </div>

            {/* sender_email */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Email
              </label>
              <input
                {...register("receiver_email")}
                type="email"
                className="input w-full text-base placeholder:text-accent"
                placeholder="Receiver Email"
              />
            </div>

            {/* receiver_region */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Region
              </label>

              <select
                className="input w-full text-base placeholder:text-accent"
                {...register("receiver_region", {
                  required: "Receiver Region name is required",
                })}
              >
                <option value="">Select Receiver Region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {errors?.receiver_region && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiver_region.message}
                </p>
              )}
            </div>

            {/* receiver_district */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                District
              </label>

              <select
                className="input w-full text-base placeholder:text-accent"
                {...register("receiver_district", {
                  required: "Receiver District name is required",
                })}
              >
                <option value="">Select Receiver District</option>

                {districtByRegion(receiverRegion).map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {errors?.receiver_district && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiver_district.message}
                </p>
              )}
            </div>
            {/* delivery_instruction */}
            <div>
              <label className="text-secondary label font-semibold mb-2">
                Delivery Instruction
              </label>
              <textarea
                {...register("delivery_instruction")}
                type="text"
                className="input w-full h-28 text-base placeholder:text-accent py-2"
                placeholder="Delivery Instruction"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between">
          <p>* PickUp Time 4pm-7pm Approx.</p>
          <input
            type="submit"
            value="Proceed to Confirm Booking"
            className="btn btn-primary text-black my-4 w-fit"
          />
        </div>
      </form>
    </section>
  );
};

export default SendParcel;
