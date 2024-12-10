/* eslint-disable react/prop-types */
import styles from "../css/CartItem.module.css";

const CartItem = ({ name, price, count, updateItemCount }) => {
  return (
    <tr className={styles.cartItem}>
      <td>{name}</td>
      <td>{price.toLocaleString()}원</td>
      <td>
        <button onClick={() => updateItemCount(name, -1)}>-</button>
        <span>{count}</span>
        <button onClick={() => updateItemCount(name, 1)}>+</button>
      </td>
    </tr>
  );
};

export default CartItem;
