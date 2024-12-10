/* eslint-disable react/prop-types */
import styles from "../css/MenuItem.module.css";

const MenuItem = ({ name, price, img, addToCart }) => {

  const imageSrc = new URL(`../assets/${img}`, import.meta.url).href;
  return (
    <div className={styles.product} onClick={() => addToCart(name, price)}>
      <img src={imageSrc} alt={name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{name}</p>
        <p className={styles.productPrice}>{price.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default MenuItem;
