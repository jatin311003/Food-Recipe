import React, { useEffect, useState } from 'react';
import MealCard from '../components/MealCard';

const Favorites = ({favorites,setFavorites}) => {
  

  // Load favorites from local storage on component mount
  useEffect(() => {
    console.log(favorites)
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

  }, []);

  // Remove meal from favorites
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites); // Update state
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Sync with local storage
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-6">My Favorites</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              favorites={favorites}
              setFavorites={setFavorites}
              onAddToFavorites={() => removeFromFavorites(meal.idMeal)} // Pass the remove function
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No favorite meals added yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
