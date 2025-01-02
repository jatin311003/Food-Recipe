import React, { useState } from 'react';

const Card = ({ meal }) => {
  const [showModal, setShowModal] = useState(false);

  // Extract ingredients
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure ? measure : ''} ${ingredient}`);
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden">
      {/* Meal Name */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center tracking-wide">
        {meal.strMeal}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Image */}
        <div className="relative group">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-64 object-cover rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 rounded-lg transition-opacity duration-300 group-hover:opacity-0"></div>
        </div>

        {/* Meal Details */}
        <div className="space-y-4 text-gray-700">
          <p className="text-sm">
            <span className="font-semibold">Category:</span> {meal.strCategory} | 
            <span className="font-semibold"> Cuisine:</span> {meal.strArea}
          </p>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:from-red-600 hover:to-red-700 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M23.498 6.186a2.995 2.995 0 00-2.105-2.121C19.36 3.548 12 3.548 12 3.548s-7.361 0-9.394.517A2.995 2.995 0 00.5 6.186C0 8.22 0 12 0 12s0 3.781.5 5.815c.285 1.062 1.156 1.836 2.105 2.121C4.64 20.452 12 20.452 12 20.452s7.361 0 9.394-.516a2.995 2.995 0 002.105-2.121C24 15.78 24 12 24 12s0-3.781-.502-5.814zM9.545 15.568v-7.14l6.327 3.57-6.327 3.57z" />
              </svg>
              Watch on YouTube
            </a>
          )}
        </div>
      </div>

      {/* Show Modal Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:bg-yellow-600 transition-transform transform hover:-translate-y-1"
        >
          View Recipe Details
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Container */}
          <div className=" bg-white w-10/12 max-w-3xl h-4/5 rounded-lg shadow-xl relative overflow-hidden transform transition-all scale-100">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header with Image */}
            <div className="mt-12 flex justify-between items-start border-b border-gray-200 pb-4">
              <div className="flex-grow">
                <h2 className="text-3xl font-extrabold text-gray-800">{meal.strMeal}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-medium">Category:</span> {meal.strCategory} |{" "}
                  <span className="font-medium">Cuisine:</span> {meal.strArea}
                </p>
              </div>
              <div className="w-32 h-32 ml-4">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto h-full px-6 py-4">
              {/* Ingredients Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Ingredients</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions Section */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Instructions</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {meal.strInstructions}
                </p>
              </div>

              {/* Footer Links */}
              <div className="mt-6 space-y-2 text-center">
                {meal.strSource && (
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:text-blue-700 underline"
                  >
                    View Original Recipe
                  </a>
                )}
                {meal.strYoutube && (
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:text-blue-700 underline block"
                  >
                    Watch on YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
