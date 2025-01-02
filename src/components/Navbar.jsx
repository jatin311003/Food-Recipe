import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('user');
    window.location.reload();
    navigate('/signin');
  }
  return (
    <nav className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-white">
          <Link to="/">Recipe Delight</Link>
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link
            to="/"
            className={`text-lg font-medium transition duration-300 ${
              location.pathname === "/" ? "text-yellow-400 underline" : "text-white hover:text-yellow-400"
            }`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`text-lg font-medium transition duration-300 ${
              location.pathname === "/search" ? "text-yellow-400 underline" : "text-white hover:text-yellow-400"
            }`}
          >
            Search
          </Link>
          <Link
            to="/favourites"
            className={`text-lg font-medium transition duration-300 ${
              location.pathname === "/favourites" ? "text-yellow-400 underline" : "text-white hover:text-yellow-400"
            }`}
          >
            Favorites
          </Link>
          <Link
            to="/search-by-ingredients"
            className={`text-lg font-medium transition duration-300 ${
              location.pathname === "/search-by-ingredients" ? "text-yellow-400 underline" : "text-white hover:text-yellow-400"
            }`}
          >
            Search by Ingredients
          </Link>
        </div>

        {/* Call to Action */}
        <button
          className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-red-700 font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300"
          onClick={() => handleLogout()}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
