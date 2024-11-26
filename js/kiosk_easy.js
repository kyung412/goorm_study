const cart = {};
const menu = document.querySelector(".product-container");
const quantity_display = document.querySelector("#quantity");
const total_display = document.querySelector("#total");

menu.addEventListener("click", (event) => {
  const product = event.target.closest(".product");
  if (product) {
    const name = product.getAttribute("data-name");
    const price = parseInt(product.getAttribute("data-price"));

    if (cart[name]) {
      cart[name].count++;
    } else {
      cart[name] = { price, count: 1 };
    }

    updateCart();
  }
});

function updateCart() {
  let totalQuantity = 0;
  let total = 0;

  for (const name in cart) {
    const { price, count } = cart[name];
    totalQuantity += count;
    total += price * count;
  }

  quantity_display.textContent = totalQuantity;
  total_display.textContent = total.toLocaleString();
}
