import ProductCard from "./ProductCard";

const products = [
  { id: 1, name: "Apple", category: "Fruits" },
  { id: 2, name: "Milk", category: "Dairy" },
  { id: 3, name: "Cheese", category: "Dairy" },
  { id: 4, name: "Bread", category: "Bakery" },
];

function ProductList({ category, onAddToCart }) {
  const visible =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <ul>
      {visible.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </ul>
  );
}

export default ProductList;