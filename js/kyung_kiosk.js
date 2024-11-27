document.addEventListener("DOMContentLoaded", () => {
  const cartItems = {};
  const cartBody = document.getElementById("cart-body");
  const totalAmountDisplay = document.getElementById("totalAmount");
  const quantityDisplay = document.getElementById("quantity");
  const clearButton = document.querySelector(".clear-button");

  // 제품 클릭 이벤트
  document.querySelectorAll(".product").forEach((product) => {
    product.addEventListener("click", () => {
      const name = product.getAttribute("data-name");
      const price = parseInt(product.getAttribute("data-price"));

      if (cartItems[name]) {
        cartItems[name].count++;
      } else {
        cartItems[name] = { price, count: 1 };
      }

      updateCart();
    });
  });

  // 장바구니 업데이트 함수
  function updateCart() {
    cartBody.innerHTML = "";
    let totalQuantity = 0;
    let totalAmount = 0;

    for (const name in cartItems) {
      const { price, count } = cartItems[name];
      totalQuantity += count;
      totalAmount += price * count;

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${name}</td>
        <td>${price.toLocaleString()}원</td>
        <td>
          <button class="decrease">-</button>
          ${count}
          <button class="increase">+</button>
        </td>
      `;

      row.querySelector(".decrease").addEventListener("click", () => {
        if (cartItems[name].count > 1) {
          cartItems[name].count--;
        } else {
          delete cartItems[name];
        }
        updateCart();
      });

      row.querySelector(".increase").addEventListener("click", () => {
        cartItems[name].count++;
        updateCart();
      });

      cartBody.appendChild(row);
    }

    quantityDisplay.textContent = totalQuantity;
    totalAmountDisplay.textContent = `${totalAmount.toLocaleString()}원`;
  }

  // 전체 취소 버튼
  clearButton.addEventListener("click", () => {
    for (const key in cartItems) delete cartItems[key];
    updateCart();
  });
});
