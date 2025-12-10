import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { slides } from "../data/images";
import Image from "next/image";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function SlideShow() {
  return (
    <div className="relative mb-4 ">
      <Swiper
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides.map((e) => (
          <SwiperSlide key={e.id}>
            <Image
              src={e.image}
              alt={e.title}
              priority
              className=" h-auto w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
