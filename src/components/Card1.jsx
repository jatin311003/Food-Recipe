import React from 'react';

const Card1 = ({ meal }) => {
  return (
    <div className="border bg-white rounded-lg shadow-md p-4">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg text-center font-bold mt-4">{meal.strMeal}</h3>
    </div>
  );
};

export default Card1;
