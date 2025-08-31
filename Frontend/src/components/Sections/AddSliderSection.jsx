import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ads = [image2, image2, image1];

export default function AddSliderSection() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Hide default arrows
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden p-4">
        <Slider ref={sliderRef} {...settings}>
          {ads.map((item, index) => (
            <img
              key={index}
              src={item}
              alt="Ad"
              className="w-full h-full object-cover rounded-2xl p-2"
            />
          ))}
        </Slider>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
