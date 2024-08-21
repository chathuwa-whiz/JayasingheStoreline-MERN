import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to Jayasinghe Storlines</h1>
          <div className="flex justify-end space-x-2">
            <button className="bg-cyan-500 text-white px-4 py-2 rounded">Sign Up</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
          </div>
        </header>

        <main className="grid grid-cols-4 gap-4">
          <aside className="col-span-1 space-y-4">
            <div className="text-center">
              <div className="text-xl">Icons</div>
              {/* Add SVG or image icons here */}
              <ul className="space-y-4">
                <li className="cursor-pointer">🏠 Home</li>
                <li className="cursor-pointer">🛒 Cart</li>
                <li className="cursor-pointer">❤️ Wishlist</li>
              </ul>
            </div>
          </aside>

          <section className="col-span-3">
            <div className="border p-4 rounded-lg bg-white shadow-lg">
              <img src="your-image-path" alt="Samsung 50-inch Television" className="w-full h-48 object-contain" />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Samsung 50-inch Television</h2>
                <p className="text-gray-700">$250</p>
                <ul className="list-disc ml-4">
                  <li>Brand New</li>
                  <li>Ratings: 453</li>
                  <li>InStock: 76</li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Special Products</h2>
          {/* Additional product listings or carousels go here */}
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
