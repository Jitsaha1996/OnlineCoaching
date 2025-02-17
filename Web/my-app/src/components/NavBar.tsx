import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg z-50">
      <h1 className="text-xs  tracking-wide">
        {isLoggedIn ? "Welcome Debraj" : "Welcome"}
      </h1>
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300"
        onClick={() => setIsLoggedIn(!isLoggedIn)}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </nav>
  );
}
