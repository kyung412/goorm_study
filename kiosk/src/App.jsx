
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Menu from "./component/Menu";
import Cart from "./component/Cart";
import styles from "./css/App.module.css";

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (name, price) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [name]: prevItems[name]
        ? { price, count: prevItems[name].count + 1 }
        : { price, count: 1 },
    }));
  };

  const updateItemCount = (name, countChange) => {
    setCartItems((prevCart) => {
      const updatedCount = (prevCart[name]?.count || 0) + countChange;

      if (updatedCount <= 0) {
        const { [name]: _, ...rest } = prevCart;
        return rest;
      }

      return {
        ...prevCart,
        [name]: { ...prevCart[name], count: updatedCount },
      };
    });
  };
  const clearCart = () => setCartItems({});

  return (
    <div className={styles.app}>
      <h1>React Kiosk</h1>
      <Menu addToCart={addToCart} />
      <Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        updateItemCount={updateItemCount}
        clearCart={clearCart}
      />
    </div>
  );
};

export default App;
