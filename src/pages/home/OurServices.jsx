import React from "react";
import serviceIcon from "../../assets/service.png";

const services = [
  {
    icon: serviceIcon,
    title: "Booking Pick & Drop",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    icon: serviceIcon,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    icon: serviceIcon,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    icon: serviceIcon,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    icon: serviceIcon,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    icon: serviceIcon,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const OurServices = () => {
  return (
    <section className="margin-bottom box-padding bg-secondary rounded-4xl mx-4">
      <div className="lg:w-1/2 px-8 text-center mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-base-100">Our Services</h2>
        <p className="text-base-200 mb-8">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {services.map((service, index) => (
          <div key={index} className="bg-base-100 p-8 rounded-3xl space-y-6 text-center">
            <img className="mx-auto" src={service.icon} alt={service.title} />
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-accent font-medium">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
