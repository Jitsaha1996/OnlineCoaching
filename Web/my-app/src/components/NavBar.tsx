import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg z-50">
      <h1 className="text-xs tracking-wide">
        {isLoggedIn ? "Welcome Debraj" : "Welcome"}
      </h1>
      <button 
        className="bg-white text-black px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-gray-200"
        onClick={() => setIsLoggedIn(!isLoggedIn)}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </nav>
  );
}
