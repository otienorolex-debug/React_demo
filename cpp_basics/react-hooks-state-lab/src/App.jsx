import { useState } from "react";
import DarkModeToggle from "./components/DarkModeToggle";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  const addToCart = (product) => setCart((prev) => [...prev, product]);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <header>
        <h1>Shopping App</h1>
        <DarkModeToggle
          darkMode={darkMode}
          onToggle={() => setDarkMode((prev) => !prev)}
        />
      </header>

      <label htmlFor="category">Filter by category: </label>
      <select
        id="category"
        data-testid="product-filter"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
      </select>

      <ProductList category={category} onAddToCart={addToCart} />
      <Cart items={cart} />
    </div>
  );
}

export default App;