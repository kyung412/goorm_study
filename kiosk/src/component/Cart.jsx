/* eslint-disable react/prop-types */
import CartItem from "./CartItem";
import styles from "../css/Cart.module.css";

const Cart = ({ cartItems, updateItemCount, clearCart }) => {
  const totalAmount = Object.values(cartItems).reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  const totalQuantity = Object.values(cartItems).reduce(
    (acc, item) => acc + item.count,
    0
  );

  return (
    <div className={styles.cart}>
      <table className={`${styles.cartItems} ${Object.keys(cartItems).length ? styles.visible : ""}`}>
        <thead>
          <tr>
            <th>메뉴</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cartItems).map(([name, item]) => (
            <CartItem
              key={name}
              name={name}
              price={item.price}
              count={item.count}
              updateItemCount={updateItemCount}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.cartSummary}>
        <div>
          <span>수량: {totalQuantity}</span>
          <span>금액: {totalAmount.toLocaleString()}원</span>
        </div>
        <button onClick={clearCart}>전체 취소</button>
        <button>주문</button>
      </div>
    </div>
  );
};

export default Cart;
