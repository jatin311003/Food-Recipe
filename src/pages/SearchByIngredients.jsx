import React, { useState } from 'react';
import Card1 from '../components/Card1'; // Use the MealCard component

const SearchByIngredients = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const ingredients = query.split(',').map((ing) => ing.trim()).filter(Boolean); // Split by comma, trim spaces, and remove empty strings
    if (ingredients.length === 0) return;

    setLoading(true);
    try {
      const allMeals = [];

      // Fetch meals for each ingredient separately
      for (const ingredient of ingredients) {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        const data = await response.json();
        if (data.meals) {
          allMeals.push(...data.meals);
        }
      }

      // Remove duplicates (meals with the same ID)
      const uniqueMeals = Array.from(new Map(allMeals.map((meal) => [meal.idMeal, meal])).values());
      setMeals(uniqueMeals);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-100 bg-gradient-to-b py-8 px-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
        Search By Ingredients
      </h1>

      {/* Search Input */}
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter ingredients (comma-separated)..."
          className="w-full max-w-md px-4 py-2 border border-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && <p className="text-center text-blue-600 font-medium">Loading...</p>}

      {/* Meals Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.length > 0 ? (
          meals.map((meal) => <Card1 key={meal.idMeal} meal={meal} />)
        ) : (
          !loading && <p className="text-center col-span-full text-gray-600">No meals found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchByIngredients;
