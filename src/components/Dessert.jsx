import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import AddToCart from "/assets/images/icon-add-to-cart.svg";
import Inc from "/assets/images/icon-increment-quantity.svg";
import Dec from "/assets/images/icon-decrement-quantity.svg";

const Dessert = ({ name, category, price, imageUrl }) => {
  const [count, setCount] = useState(0);
  const [style, setStyle] = useState({});
  const { addItemToCart, removeItemFromCart, cartItems } = useCart();

  const formattedName = name.split(" ").join("-");

  useEffect(() => {
    const itemInCart = cartItems.find((item) => item.productName === name);
    if (itemInCart) {
      setCount(itemInCart.count);
    } else {
      setCount(0);
    }
  }, [cartItems, name]);

  const handleClick = () => {
    incCount();
  };

  const incCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    addItemToCart({ productName: name, count: newCount, price });
  };

  const decCount = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      if (newCount === 0) {
        removeItemFromCart(name);
      } else {
        addItemToCart({ productName: name, count: newCount, price });
      }
    }
  };

  useEffect(() => {
    const applyStyles = () => {
      const mobileQuery = window.matchMedia("(max-width: 710px)");
      const tabletQuery = window.matchMedia("(max-width: 878px)");
      const desktopQuery = window.matchMedia("(min-width: 1024px)");

      if (mobileQuery.matches) {
        setStyle({
          width: "100%",
          height: "300px",
          background: `url(../${imageUrl.mobile}) center / cover no-repeat`,
        });
      } else if (tabletQuery.matches) {
        setStyle({
          width: "300px",
          height: "300px",
          background: `url(../${imageUrl.tablet}) center / cover no-repeat`,
        });
      } else if (desktopQuery.matches) {
        setStyle({
          width: "250px",
          height: "250px",
          background: `url(../${imageUrl.desktop}) center / cover no-repeat`,
        });
      }
    };

    applyStyles(); // Apply styles on initial render

    window.addEventListener("resize", applyStyles); // Update styles on window resize

    return () => window.removeEventListener("resize", applyStyles);
  }, [imageUrl]);

  return (
    <div className="card">
      <div
        className={
          count === 0
            ? `card-image ${formattedName}`
            : `card-image ${formattedName} red`
        }
        style={style}
      >
        {count === 0 ? (
          <button onClick={handleClick} className={`btn add-btn`}>
            <img src={AddToCart} alt="Cart" />
            Add to Cart
          </button>
        ) : (
          <div className="btn item-count">
            <img src={Dec} onClick={decCount} alt="Decrement" />
            <p>{count}</p>
            <img src={Inc} onClick={incCount} alt="Increment" />
          </div>
        )}
      </div>
      <p className="dessert">{category}</p>
      <h4>{name}</h4>
      <h3 className="price">${price.toFixed(2)}</h3>
    </div>
  );
};

export default Dessert;
