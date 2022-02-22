import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(()=> {
    setIsLoading(true);
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-meals-ef357-default-rtdb.firebaseio.com/meals.json'
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().then().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
      return (
        <section>
          <p className="mealsLoading">Loading...</p>
        </section>
    );
  }

  if (httpError) {
      return (
        <section className="MealsError">
          <p>{httpError}</p>
        </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    >
      {meal.name}
    </MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
};

export default AvailableMeals;
