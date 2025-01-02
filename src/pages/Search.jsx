import React, { useState } from "react";
import MealCard from "../components/MealCard"; // Import the MealCard component

const Search = ({ favorites,setFavorites }) => {
  const [search, setSearch] = useState("");
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchMeal = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      const data = await response.json();
      console.log(data);

      if (data.meals) {
        setMeal(data.meals);
      } else {
        setMeal(null);
      }
    } catch (error) {
      console.error("Error fetching meal data:", error);
      setMeal(null);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div className="container mx-auto p-4 bg-red-100">
      <form

        onSubmit={searchMeal}
        className="flex justify-center my-6 items-center"
      >
        
        <input
          type="search"
          placeholder="Search for a meal..."
          className=" p-3 w-full max-w-lg outline-none text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          type="submit"
          className="ml-4 mt-4 cursor-pointer w-20 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500 text-lg">Loading...</p>}

      {meal && meal.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meal.map((m) => (
            <MealCard
            key={m.idMeal}
            meal={m}
            favorites={favorites}
            setFavorites={setFavorites} 
      />
      
          ))}
        </div>
      ) : (
        !loading && (
          <h1 className="text-3xl text-center text-red-600">No meals found</h1>
        )
      )}
    </div>
  );
};

export default Search;
