import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"; // Add this import

export const Home = () => {
  const [search, setSearch] = useState("");
  const { dispatch } = useAuthContext(); // Get dispatch from context

  const popularFoods = [
    { name: "Pizza", img: "https://source.unsplash.com/400x300/?pizza" },
    { name: "Burger", img: "https://source.unsplash.com/400x300/?burger" },
    { name: "Pasta", img: "https://source.unsplash.com/400x300/?pasta" },
    { name: "Sushi", img: "https://source.unsplash.com/400x300/?sushi" },
  ];

  // Signout handler
  const handleSignout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Navbar */}
      <header className="flex justify-between items-center p-5 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-orange-600">Foodie</h1>
        <nav className="flex gap-6 items-center">
          <a href="#" className="hover:text-orange-500">Home</a>
          <a href="#" className="hover:text-orange-500">Menu</a>
          <a href="#" className="hover:text-orange-500">About</a>
          <button
            onClick={handleSignout}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Sign Out
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-orange-400 to-red-400 text-white">
        <h2 className="text-4xl font-bold mb-4">Find the Best Food Near You</h2>
        <p className="mb-6">Delicious meals delivered fresh and fast 🍔🍕🍣</p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-l-lg w-64 text-black"
          />
          <button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-r-lg hover:bg-gray-100">
            Search
          </button>
        </div>
      </section>

      {/* Popular Food Section */}
      <section className="p-10">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Popular Dishes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {popularFoods.map((food, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-200"
            >
              <img src={food.img} alt={food.name} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{food.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
