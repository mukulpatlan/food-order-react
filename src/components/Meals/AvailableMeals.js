import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const mealsRes = await fetch('https://react-guide-9f34b.firebaseio.com/meals.json');
            if (!mealsRes.ok) {
                throw new Error('Something new error;')
            }
            const meals = await mealsRes.json();
            const loadedMeals = [];
            for (let r in meals) {
                loadedMeals.push({
                    id: r,
                    name: meals[r].name,
                    description: meals[r].description,
                    price: meals[r].price
                });
            }
            console.log(loadedMeals)
            setMeals(loadedMeals);
            setIsLoading(false);
        }
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, []);

    if (isLoading) {
        return <section className={classes.MealsLoading}><p>Loading...</p></section>
    }

    if (httpError) {
        return <section className={classes.MealsError}><p>{httpError}</p></section>
    }

    const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;