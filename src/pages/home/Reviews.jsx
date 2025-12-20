import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import customerTop from "../../assets/customer-top.png";

import "swiper/css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <section className="margin-bottom">
      {/* Top Content */}
      <div className="lg:w-1/2 px-8 text-center mx-auto">
        <img className="mx-auto mb-10" src={customerTop} alt="customer-top" />
        <h2 className="text-4xl font-extrabold mb-8 text-secondary">Our Services</h2>
        <p className="text-accent mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={5}
          centeredSlides={true}
          loop={true}
          speed={800}
          spaceBetween={-40}         // overlapping effect
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".review-next",
            prevEl: ".review-prev",
          }}
          className="pb-16 review-swiper"  // 👈 SCOPED CLASS
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="review-prev btn btn-neutral size-10 text-primary rounded-full relative">
            <MdArrowBackIos size={20} className="absolute left-3" />
          </button>
          <button className="review-next btn btn-neutral size-10 text-primary rounded-full relative">
            <MdArrowForwardIos size={20} className="absolute right-2" />
          </button>
        </div>

        {/* Scoped Slide Style */}
        <style>
          {`
          .review-swiper .swiper-slide {
            opacity: 0.3;
            filter: blur(2px);
            transform: scale(0.8);
            transition: 0.3s;
          }

          .review-swiper .swiper-slide-active {
            opacity: 1 !important;
            filter: blur(0) !important;
            transform: scale(1.05) !important;
            z-index: 30 !important;
          }

          .review-swiper .swiper-slide-next,
          .review-swiper .swiper-slide-prev {
            opacity: 0.6 !important;
            filter: blur(1px) !important;
            transform: scale(0.95) !important;
            z-index: 20 !important;
          }
        `}
        </style>
      </div>
    </section>
  );
};

export default Reviews;
