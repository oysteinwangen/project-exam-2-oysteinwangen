export default function cartCounter() {
  const cartNumber = document.querySelector(".cart-counter");
  const numberInCart = JSON.parse(localStorage.cartItems).length;
  console.log(numberInCart);

  if (numberInCart < 1) {
    cartNumber.style.display = "none";
  } else if (numberInCart > 0) {
    cartNumber.style.display = "flex";
    cartNumber.innerText = numberInCart;
  }
}
