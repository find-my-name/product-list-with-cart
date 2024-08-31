import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import cakeImg from "/assets/images/illustration-empty-cart.svg";
import carbonImg from "/assets/images/icon-carbon-neutral.svg";
import removeImg from "/assets/images/icon-remove-item.svg";
import Modal from "./Modal";

const Cart = () => {
  const { cartItems, total, setCartItems, removeItemFromCart, updateTotal } =
    useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    updateTotal();
  }, [cartItems, updateTotal]);

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCartItems([]);
  };

  return (
    <div className="cart">
      <h2>Your Cart ({cartItems.length})</h2>
      {cartItems.length === 0 ? (
        <div className="message">
          <img src={cakeImg} alt="" />
          <p className="added-text">Your added items will appear here</p>
        </div>
      ) : (
        <div className="items">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className={`cart-item ${item.productName.split(" ").join("-")}`}
            >
              <div className="item">
                <div className="product-details">
                  <p className="product-name">{item.productName}</p>
                  <p className="quantity">
                    {item.count}x <span>@ ${item.price.toFixed(2)}</span>{" "}
                    <span className="total-price">
                      ${(item.count * item.price).toFixed(2)}
                    </span>
                  </p>
                </div>
                <img
                  className="remove-icon"
                  src={removeImg}
                  alt="Remove"
                  onClick={() => removeItemFromCart(item.productName)}
                />
              </div>
              <div className="line"></div>
            </div>
          ))}
          <p className="total">
            Order Total <span className="grand-total">${total.toFixed(2)}</span>
          </p>
          <div className="carbon">
            <img src={carbonImg} alt="Carbon" />
            <p>
              This is a <b>carbon-neutral</b> delivery
            </p>
          </div>
          <button className="confirm-btn" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Cart;
