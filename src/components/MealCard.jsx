import React, { useState } from 'react';

const MealCard = ({ meal, favorites, setFavorites }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [visibleIngredients, setVisibleIngredients] = useState(5);

  if (!meal) {
    return null; // Return null if meal data is undefined
  }

  const handleShowMoreIngredients = () => {
    setVisibleIngredients((prevCount) => prevCount + 5);
  };

  const handleAddToFavorites = () => {
    const isAlreadyFavorited = favorites.some((fav) => fav.idMeal === meal.idMeal);

    if (!isAlreadyFavorited) {
      const updatedFavorites = [...favorites, meal];
      setFavorites(updatedFavorites); // Update the parent component's state
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Sync with local storage
      alert(`${meal.strMeal} added to favorites!`);
    } else {
      alert(`${meal.strMeal} is already in favorites.`);
    }
  };

  const handleRemoveFromFavorites = () => {
    const updatedFavorites = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
    setFavorites(updatedFavorites); // Update the parent component's state
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Sync with local storage
    alert(`${meal.strMeal} removed from favorites!`);
  };

  // Collect all ingredients and measures dynamically
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
    }
  }

  return (
    <div className="border rounded-lg shadow-lg bg-white overflow-hidden">
      {/* Meal Image */}
      <img
        src={meal.strMealThumb || 'https://via.placeholder.com/300'}
        alt={meal.strMeal || 'Meal Image'}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Meal Details */}
      <div className="p-6">
        <h2 className="text-xl text-center font-bold text-gray-800 mb-4">
          {meal.strMeal}
        </h2>
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => setShowDetails(!showDetails)}
            aria-label="Toggle recipe details"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          {!favorites.some((fav) => fav.idMeal === meal.idMeal) ? (
            <button
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 cursor-pointer transition duration-300"
              onClick={handleAddToFavorites}
              aria-label="Add to favorites"
            >
              Add to Favorites
            </button>
          ) : (
            <button
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
              onClick={handleRemoveFromFavorites}
              aria-label="Remove from favorites"
            >
              Remove from Favorites
            </button>
          )}
        </div>

        {/* Modal */}
        {showDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full relative overflow-hidden">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl font-bold"
                onClick={() => setShowDetails(false)}
                aria-label="Close recipe details"
              >
                &times;
              </button>

              {/* Modal Content */}
              <div className="max-h-[80vh] overflow-y-auto">
                <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                  {meal.strMeal}
                </h3>

                {/* Ingredients */}
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Ingredients:
                </h4>
                <ul className="list-disc ml-6 text-gray-700 mb-6">
                  {ingredients.slice(0, visibleIngredients).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                {/* Show More Ingredients Button */}
                {visibleIngredients < ingredients.length && (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={handleShowMoreIngredients}
                  >
                    Show More Ingredients
                  </button>
                )}

                {/* Instructions */}
                <h4 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
                  Instructions:
                </h4>
                <p className="text-gray-600 mb-6 whitespace-pre-line leading-relaxed">
                  {meal.strInstructions}
                </p>

                {/* Recipe Source Link */}
                {meal.strSource && (
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-500 hover:text-blue-700 transition-all duration-300 mt-4 text-center"
                  >
                    View Full Recipe
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCard;
