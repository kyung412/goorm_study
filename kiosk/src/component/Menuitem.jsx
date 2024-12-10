/* eslint-disable react/prop-types */
import styles from "../css/MenuItem.module.css";

const MenuItem = ({ name, price, description, img, addToCart }) => {
  const imageSrc = new URL(`../assets/${img}`, import.meta.url).href;

  return (
    <div className={styles.menuItem} onClick={() => addToCart(name, price)}>
      <img src={imageSrc} alt={name} className={styles.image} />
      <div>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <p className={styles.price}>{price.toLocaleString()}원</p>
    </div>
  );
};

export default MenuItem;
