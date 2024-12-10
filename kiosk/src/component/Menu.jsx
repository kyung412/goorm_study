/* eslint-disable react/prop-types */
import menuData from "../data/menuData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useState } from "react";
import MenuItem from "./MenuItem";
import styles from "../css/Menu.module.css";

const Menu = ({ addToCart }) => {
  const categories = ["all", "coffee", "food"];
  const [filter, setFilter] = useState("all");

  const filteredMenu =
    filter === "all"
      ? menuData
      : menuData.filter((item) => item.category === filter);

  return (
    <div className={styles.menu}>
      <div className={styles.buttons}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`${filter === category ? styles.active : ""}`}
          >
            {category}
          </button>
        ))}
      </div>
      <Swiper
        spaceBetween={8}
        slidesPerView={3}
        pagination={true}
        modules={[Pagination]}
        className={styles.menuSwiper}
      >
        {filteredMenu.map((item) => (
          <SwiperSlide key={item.name}>
            <MenuItem {...item} addToCart={addToCart} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Menu;
