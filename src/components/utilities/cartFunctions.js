export function getExistingCartItems() {
  const cartItems = localStorage.getItem("cartItems");

  if (!cartItems) {
    return [];
  } else {
    return JSON.parse(cartItems);
  }
}
