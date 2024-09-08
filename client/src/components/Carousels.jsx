import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../style/carousels.css";

const ImageData = [
  "https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/event_photos%2F15Aug2021-01.jpg?alt=media&token=99d8da69-9f1d-42cf-bf49-89eae34c2698",
  "https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/event_photos%2F15Aug2021-02.jpg?alt=media&token=ab7114bd-4454-4b4e-bdfc-6a81be7d933c",
  "https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/event_photos%2F15Aug2021-03.jpg?alt=media&token=74841ee5-5255-4dfb-95b8-fd30801d4fe5",
  "https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/event_photos%2F15Aug2021-04.jpg?alt=media&token=960f1967-2ab2-4302-a9ed-042e4fa75233",
  "https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/event_photos%2F15Aug2021-05.jpg?alt=media&token=1424b49b-5b66-45a0-b462-1411df9cc15a",
  "https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/event_photos%2F15Aug2021-06.jpg?alt=media&token=c5d39c89-4ecc-404b-bf72-e5a7e900c4f1",
  "https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/event_photos%2F15Aug2021-07.jpg?alt=media&token=44f90b26-c739-43fe-8886-c195c66f6824"
];

const Carousels = () => {
  return (
    <>
      <div className="">
        <h1 className="swiper-heading text-center text-themColor-blue text-5xl font-bold font-suse">
          Our Event Memories
        </h1>
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 20,
            stretch: 2,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          loop
          pagination={{ clickable: true }}
          navigation
          modules={[EffectCoverflow, Navigation, Pagination]}
        >
          {ImageData.map((data, index) => (
            <SwiperSlide
              key={index}
              className="border-2 border-themColor-blue max-w-sm md:max-w-lg"
            >
              <img src={data} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Carousels;
