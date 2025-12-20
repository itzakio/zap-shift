import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import amazon from "../../assets/brands/amazon.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import start_people from "../../assets/brands/start_people.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const brands = [
  amazon,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
  amazon,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];

const Brands = () => {
  return (
    <section className="margin-bottom">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-secondary mb-10 text-center">
        We've helped thousands of sales teams
      </h2>

      <div className="ml-24">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={5}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        >
          {brands.map((brand, index) => (
            <SwiperSlide>
              <img key={index} src={brand} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;
