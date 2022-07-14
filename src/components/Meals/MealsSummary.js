import classes from "./css/MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favourite meal from our broad selections of available meals
        and enjoy a delicious lunch / dinner at you home.
      </p>
      <p>
        All our meals are cooked with high quality ingredients, just-in-time,
        and ofcourse by experienced chefs !
      </p>
    </section>
  );
};

export default MealsSummary;
