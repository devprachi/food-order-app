import { useRef, useState } from "react";

import classes from "./../css/MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [qtyIsValid, setQtyIsValid] = useState(true);
  const quantityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const entertedQuantity = quantityInputRef.current.value;
    const entertedQuantityNumber = +entertedQuantity;

    if (
      entertedQuantity.trim().length === 0 ||
      entertedQuantityNumber < 1 ||
      entertedQuantityNumber > 5
    ) {
      setQtyIsValid(false);
      return;
    }
    props.onAddToCart(entertedQuantityNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Quantity"
        ref={quantityInputRef}
        input={{
          id: "quantity_" + props.id,
          type: "number",
          max: "5",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!qtyIsValid && <p>Please enter a valid quantity (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
