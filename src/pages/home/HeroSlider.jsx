import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slideImg1 from "../../assets/banner/banner1.png";
import slideImg2 from "../../assets/banner/banner2.png";
import slideImg3 from "../../assets/banner/banner3.png";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdArrowBackIos, MdArrowForwardIos, MdArrowOutward } from "react-icons/md";
import { Link } from "react-router";

// JSON Data for slides
const slides = [
  {
    id: 1,
    title: "Learn Modern Web Development",
    subtitle: "Courses, ebooks, and hands-on projects",
    cta: "Track Your Parcel",
    img: slideImg1,
  },
  {
    id: 2,
    title: "Build Real Projects",
    subtitle: "From beginner to job ready",
    cta: "Track Your Parcel",
    img: slideImg2,
  },
  {
    id: 3,
    title: "Join Our Community",
    subtitle: "Get feedback, mentorship, and jobs",
    cta: "Track Your Parcel",
    img: slideImg3,
  },
];

const HeroSlider = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-4xl margin-bottom">
      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true, }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        speed={800}
        className="h-full"
        
      >
        {/* Map JSON data */}
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-center relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 "></div>

              {/* Slide Content */}

              <div className="flex justify-center gap-4 absolute left-10 bottom-20 lg:left-26">
                <div>
                  <button className="btn btn-primary rounded-full text-neutral text-lx font-bold">
                    {slide.cta}
                  </button>
                  <Link className="btn btn-neutral size-10 text-primary rounded-full relative">
                    <MdArrowOutward size={20} className="absolute" />
                  </Link>
                </div>
                <Link className="btn rounded-xl text-neutral">Be a Rider</Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Bottom Center */}
      <div className="custom-prev absolute  bottom-6 justify-end inset-x-0 flex mr-6 gap-6 z-20">
        <button className="btn btn-neutral size-10 text-primary rounded-full relative">
          <MdArrowBackIos size={20} className="absolute left-3" />
        </button>
        <button className="custom-next btn btn-neutral size-10 text-primary rounded-full relative">
          <MdArrowForwardIos size={20} className="absolute right-2" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
