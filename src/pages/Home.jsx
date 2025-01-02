import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        if (data.meals) {
          console.log(data.meals);
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
      } catch (err) {
        setError('Failed to fetch meals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="min-h-screen bg-red-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Explore Delicious Meals</h1>
        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 font-medium">{error}</div>
        )}
        {!loading && !error && meals.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            No meals found. Try searching for something else!
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {!loading && meals.length > 0 &&
            meals.map((meal) => (
              <Card key={meal.idMeal} meal={meal} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
