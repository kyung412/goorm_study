/* eslint-disable react/prop-types */
import menuData from "../data/menuData";
import { useState } from "react";
import MenuItem from "./MenuItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "../css/Menu.module.css";

const Menu = ({ addToCart }) => {
  const categories = ["all", "coffee", "non-coffee","food"];
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
        spaceBetween={16}
        slidesPerView={3}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className={styles.menuSwiper}
      >
        {filteredMenu.map((item) => (
          <SwiperSlide key={item.name}>
            <MenuItem
              name={item.name}
              price={item.price}
              img={item.img}
              addToCart={addToCart}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Menu;
