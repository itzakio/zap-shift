import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import riderImg from "../../assets/agent-pending.png"

const BeARider = () => {
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
  const riderRegion = useWatch({ control, name: "region" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter(
      (center) => center.region === region
    );
    const districts = regionDistricts.map(
      (singleRegion) => singleRegion.district
    );
    return districts;
  };

  const beARiderHandler = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      console.log(res.data)
      if (res.data.insertedId) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your application has been submitted, We will reach out you within 14 days!",
          icon: "success",
          timer: 5000,
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
    <section className="box-padding bg-base-100 rounded-4xl">
      <div className="w-full lg:w-1/2">
        <h2 className="text-6xl font-extrabold text-secondary">Be a rider</h2>
        <p className="text-accent">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
          <form onSubmit={handleSubmit(beARiderHandler)}>
            {/* New Rider Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold">Tell us about yourself</h4>
              {/* rider_name */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  Your Name
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  defaultValue={user?.displayName}
                  className="input w-full text-base placeholder:text-accent"
                  placeholder="Your Name"
                />
                {errors?.rider_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.rider_name.message}
                  </p>
                )}
              </div>

              {/* rider_phone_no */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  {...register("phone_no", {
                    required: "Sender Phone No is required",
                    pattern: {
                      value: /^01[0-9]{9}$/,
                      message:
                        "Phone number must be 11 digits and start with 01",
                    },
                  })}
                  type="text"
                  className="input w-full text-base placeholder:text-accent"
                  placeholder="Phone Number"
                />
                {errors?.rider_phone_no && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.rider_phone_no.message}
                  </p>
                )}
              </div>
              {/* rider_email */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  Your Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  defaultValue={user?.email}
                  className="input w-full text-base placeholder:text-accent"
                  placeholder="Your Email"
                />
              </div>
              {/* sender_region */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  Region
                </label>

                <select
                  className="input w-full text-base placeholder:text-accent"
                  {...register("region", {
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

                {errors?.region && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>
              {/* rider district */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  District
                </label>

                <select
                  className="input w-full text-base placeholder:text-accent"
                  {...register("district", {
                    required: "District name is required",
                  })}
                >
                  <option value="">Select Sender District</option>

                  {districtByRegion(riderRegion).map((region, index) => (
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
              {/* nid_no */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  Nid No
                </label>
                <input
                  {...register("nid", {
                    required: "NID No is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "NID no must be 10 digits",
                    },
                  })}
                  type="text"
                  className="input w-full text-base placeholder:text-accent"
                  placeholder="NID"
                />
                {errors?.nid_no && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nid_no.message}
                  </p>
                )}
              </div>
              {/* driving_license */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  Driving License Number
                </label>
                <input
                  {...register("license_no", {
                    required: "Driving License Number is required",
                  })}
                  type="text"
                  className="input w-full text-base placeholder:text-accent"
                  placeholder="Driving License Number"
                />
                {errors?.license_no && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.license_no.message}
                  </p>
                )}
              </div>
              {/* Bike Info */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  Bike Brand Model and Year
                </label>
                <input
                  {...register("bike_info", {
                    required: "Bike Brand Model and Year is required",
                  })}
                  type="text"
                  className="input w-full text-base placeholder:text-accent"
                  placeholder="Bike Brand Model and Year"
                />
                {errors?.bike_info && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bike_info.message}
                  </p>
                )}
              </div>
              {/* Bike Registration Number */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  Bike Registration Number
                </label>
                <input
                  {...register("bike_reg_no", {
                    required: "Bike Registration Number is required",
                  })}
                  type="text"
                  className="input w-full text-base placeholder:text-accent"
                  placeholder="Bike Registration Number"
                />
                {errors?.bike_reg_no && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bike_reg_no.message}
                  </p>
                )}
              </div>
              {/* about_rider */}
              <div>
                <label className="text-secondary label font-semibold mb-2">
                  Tell Us About Yourself
                </label>
                <textarea
                  {...register("about_rider")}
                  type="text"
                  className="input w-full h-28 text-base placeholder:text-accent py-2"
                  placeholder="Tell Us About Yourself"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary text-black my-4 w-full"
            />
          </form>
          {/* Receiver Details */}
          <div className="row-start-1 lg:col-start-2">
            <img className="mx-auto" src={riderImg} alt="rider image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeARider;
