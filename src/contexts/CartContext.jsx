import { createContext, useContext, useState } from "react";

// Create a context for the cart
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.productName === item.productName
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.productName === item.productName ? { ...i, count: item.count } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeItemFromCart = (productName) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productName !== productName)
    );
  };

  const updateTotal = () => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    setTotal(newTotal);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        total,
        addItemToCart,
        removeItemFromCart,
        updateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
