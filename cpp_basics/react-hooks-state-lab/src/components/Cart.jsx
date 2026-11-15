function Cart({ items }) {
  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`}>{item.name} is in your cart.</li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;