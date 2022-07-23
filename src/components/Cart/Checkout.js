import { useRef, useState } from "react";
import classes from "./css/Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const checkoutConfirmHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalCodeIsValid = isFiveChars(postal);
    const cityIsValid = !isEmpty(city);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

    if (formIsValid) {
      props.onConfirm({
        name: name,
        street: street,
        postalCode: postal,
        city: city,
      });
    }
  };

  const nameClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={checkoutConfirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef}></input>
        {!formInputsValidity.name && (
          <p className={classes.error}>Name can't be empty!</p>
        )}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef}></input>
        {!formInputsValidity.street && (
          <p className={classes.error}>Street can't be empty!</p>
        )}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef}></input>
        {!formInputsValidity.postalCode && (
          <p className={classes.error}>
            Postal code is invalid. It should have 5 characters
          </p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef}></input>
        {!formInputsValidity.city && (
          <p className={classes.error}>City can't be empty!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        {/* Doesn't submit the form if type is button */}
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
