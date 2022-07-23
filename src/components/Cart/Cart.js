import { useContext, useState } from "react";

import classes from "./css/Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem/CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCxt = useContext(CartContext);
  const totalCartAmount = cartCxt.totalAmount.toFixed(2);

  const onAddQuantity = (item) => {
    cartCxt.addItem({ ...item, quantity: 1 });
    console.log("item: ", item);
  };

  const onRemoveQuantity = (id) => {
    cartCxt.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxt.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={onAddQuantity.bind(null, item)}
          onRemove={onRemoveQuantity.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const handleOrder = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    console.log(userData);
    setIsSubmitting(true);
    console.log("Here");
    fetch(
      "https://food-order-app-39375-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: cartCxt.items,
        }),
      }
    );

    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCxt.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCartClose}>
        Close
      </button>
      <button className={classes.button} onClick={handleOrder}>
        Order
      </button>
    </div>
  );

  const modalCartDisplay = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$ {totalCartAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onCartClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const orderSubmitted = (
    <>
      <p>Order Recieved. We'll start preparing your order.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCartClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.onCartClose}>
      {isSubmitting && !isSubmitted && <p>Submitting your order...</p>}
      {!isSubmitting && isSubmitted && orderSubmitted}
      {!isSubmitting && !isSubmitted && modalCartDisplay}
    </Modal>
  );
};

export default Cart;
