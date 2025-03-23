import { useRef } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination } from "swiper/modules";


function SwiperReviews(){
  const swiperRef = useRef(null);
  const reviews = [
    {
      id: 1,
      star: 5,
      date: "02 Feb, 2025",
      imageUrl:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Regis's Cakes are not only visually stunning but also incredibly delicious. One bite and you can tell they use the finest natural ingredients.",
    },
    {
      id: 2,
      star: 5,
      date: "10 Feb, 2025",
      imageUrl:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Whether it's a birthday or a gathering, Regis's Cakes is always my top choice—healthy, delicious, and loved by the whole family.",
    },
    {
      id: 3,
      star: 4,
      date: "10 March, 2025",
      imageUrl:
        "https://images.unsplash.com/vector-1741091034556-4913fb0e9e18?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "I always feel confident ordering from them. The cakes are fresh, and the delivery process is flawless—absolutely satisfied!",
    },
    {
      id: 4,
      star: 5,
      date: "12 March, 2025",
      imageUrl:
        "https://images.unsplash.com/vector-1739803877525-3835552e1859?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The natural flavors of the cakes keep me coming back for more. I truly recommend them to all dessert lovers!",
    },
    {
      id: 5,
      star: 5,
      date: "15 March, 2025",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "I choose Regis's Cakes because their cakes are simple yet delicious, with no unnecessary additives. I can enjoy them with peace of mind.",
    },
    {
      id: 6,
      star: 5,
      date: "23 March, 2025",
      imageUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The balance of flavors in Regis's Cakes is perfect—just the right amount of sweetness without being overwhelming. You can really taste the quality of the ingredients!",
    },
  ];
  
  const handlePrevSlide = () => {
    swiperRef.current.slidePrev();
  };
  
  const handleNextSlide = () => {
    swiperRef.current.slideNext();
  };

  return (
    <div className="py-10">
        <div className="position-relative mx-auto" style={{ maxWidth: "1500px" }}>
          <h3 className="text-center mb-6">Reviews</h3>
          <button
            type="button"
            className="d-none d-lg-block btn btn-primary-light rounded-circle position-absolute top-50 translate-middle-y z-2"
            onClick={handlePrevSlide}
            style={{left: "3%"}}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <button
            type="button"
            className="d-none d-lg-block btn btn-primary-light rounded-circle position-absolute top-50 translate-middle-y z-2"
            onClick={handleNextSlide}
            style={{right: "3%"}}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
          <div className="container">
            <Swiper
              spaceBetween={24}
              slidesPerView={1.2}
              // onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="h-100 pb-8"
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}
              loop={true}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2.5,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id} className="h-auto border shadow-sm p-4">
                  <div className="h-100 d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <div>
                        {Array.from({ length: review.star }).map((_, index) => (
                          <i
                            key={index}
                            className="bi bi-star-fill text-warning"
                          ></i>
                        ))}
                        {Array.from({ length: 5 - review.star }).map(
                          (_, index) => (
                            <i
                              key={index}
                              className="bi bi-star-fill text-secondary opacity-25"
                            ></i>
                          )
                        )}
                      </div>
                      <span>{review.date}</span>
                    </div>
                    <p className="mb-auto">{review.text}</p>
                    <div>
                      <img
                        className="img-fluid object-fit-cover rounded-circle"
                        style={{ width: "80px", height: "80px" }}
                        src={review.imageUrl}
                        alt={`review image ${review.id}`}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
  );
}
export default SwiperReviews