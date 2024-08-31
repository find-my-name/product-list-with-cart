import "./Modal.css";
import { useCart } from "../contexts/CartContext";
import tick from "/assets/images/icon-order-confirmed.svg";
import desserts from "./data.json";

const Modal = ({ isOpen, onClose }) => {
  const { cartItems, total } = useCart();
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={tick} alt="Tick" />
        <h1>Order Confirmed</h1>
        <p>We hope you enjoy your food!</p>
        <div className="items">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className={`cart-item ${item.productName.split(" ").join("-")}`}
            >
              <div className="item">
                <div className="ctr">
                  <div
                    className="thumb-image"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: `url(/src/components/${
                        desserts.find(
                          (dessert) => dessert.name === item.productName
                        )?.image.thumbnail
                      }) center / cover no-repeat`,
                    }}
                  ></div>
                  <div className="product-details">
                    <p className="product-name">{item.productName}</p>
                    <p className="quantity">
                      {item.count}x <span>@ ${item.price.toFixed(2)}</span>{" "}
                    </p>
                  </div>
                </div>
                <p className="total-price">
                  ${(item.count * item.price).toFixed(2)}
                </p>
              </div>
              <div className="line"></div>
            </div>
          ))}
        </div>
        <p className="total">
          Order Total <span className="grand-total">${total.toFixed(2)}</span>
        </p>
        <button className="btn btn-new" onClick={onClose}>
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default Modal;
