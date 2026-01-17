import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import './swipercss.css'

const SwiperCategory = () => {
  const { parentCategory } = useSelector(
    (state) => state.categoryInfo
  );

  if (!parentCategory?.length) return null;

  return (
    <div className="mt-4 mb-4">
      <Swiper
        spaceBetween={3}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="mySwiper"
      >
        {parentCategory.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div className="category-item">
              <Link
                to={`/category/${cat.parentCategory
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <img
                  src={cat.image}
                  alt={cat.parentCategory}
                  className="category-img"
                />
              </Link>
              <p className="mt-2 text-center fw-semibold">
                {cat.parentCategory}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCategory;
