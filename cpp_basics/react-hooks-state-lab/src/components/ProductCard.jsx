function ProductCard({ product, onAddToCart }) {
  return (
    <li className="product-card">
      <span>{product.name}</span> <small>({product.category})</small>{" "}
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </li>
  );
}

export default ProductCard;