import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favourites";
import SearchByIngredients from "./pages/SearchByIngredients";
import SignIn from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(() => {
    // Load the user from localStorage on initial render
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save the user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Mock user authentication
  const authenticateUser = (email, password) => {
    // Replace this with actual authentication logic (e.g., API call)
    setUser({ email });
    return true;
  };

  // Add recipe to favorites
  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      setFavorites((prevFavorites) => [...prevFavorites, recipe]);
      alert(`${recipe.strMeal} has been added to favorites!`);
    } else {
      alert(`${recipe.strMeal} is already in your favorites!`);
    }
  };

  // Remove recipe from favorites
  const removeFromFavorites = (idMeal) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.idMeal !== idMeal)
    );
    alert(`Recipe has been removed from favorites.`);
  };

  return (
    <Router>
      <div className={`min-h-screen bg-red-100 flex flex-col ${window.location.pathname === '/signin' ? 'background' : ''}`}>
        {/* Navbar */}
        {user && <Navbar user={user} />}

        {/* Main Content */}
        <main className="flex-grow container mx-auto ">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Home addToFavorites={addToFavorites} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute user={user}>
                  <Search favorites={favorites} setFavorites={setFavorites} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipe/:id"
              element={<RecipeDetails addToFavorites={addToFavorites} />}
            />
            <Route
              path="/favourites"
              element={
                <ProtectedRoute user={user}>
                  <Favorites
                    favorites={favorites}
                    setFavorites={setFavorites}
                    removeFromFavorites={removeFromFavorites}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search-by-ingredients"
              element={
                <ProtectedRoute user={user}>
                  <SearchByIngredients
                    favorites={favorites}
                    addToFavorites={addToFavorites}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                user ? <Navigate to="/" /> : <SignIn authenticateUser={authenticateUser} />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
