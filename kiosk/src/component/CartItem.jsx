/* eslint-disable react/prop-types */
import styles from "../css/Cart.module.css";
import { useEffect } from "react";
import CartItem from "./CartItem";


const Cart = ({ cartItems, setCartItems, updateItemCount }) => {
  const totalAmount = Object.values(cartItems).reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, [setCartItems]);

  return (
    <section className={styles.cart}>
      <h2>Cart</h2>
      <div>
        {Object.keys(cartItems).length === 0 ? (
          <p>카트가 비었습니다.</p>
        ) : (
          Object.entries(cartItems).map(([name, item]) => (
            <CartItem
              key={name}
              name={name}
              price={item.price}
              count={item.count}
              updateItemCount={updateItemCount}
            />
          ))
        )}
      </div>
      <h3 className={styles.total}>Total: {totalAmount.toLocaleString()}원</h3>
    </section>
  );
};

export default Cart;
