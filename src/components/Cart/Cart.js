import { useContext } from "react";

import classes from "./css/Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem/CartItem";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
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
    console.log("Order Placed !!!");
    props.onCartClose();
  };

  return (
    <Modal onClick={props.onCartClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$ {totalCartAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCartClose}>
          Close
        </button>
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
