
const cartItems = {};
const cartDisplay = document.getElementById('cartItems');
const totalAmountDisplay = document.getElementById('totalAmount');

document.querySelectorAll('section.menu > article').forEach((menuItem) => {
  menuItem.addEventListener('click', () => {
    const name = menuItem.getAttribute('data-name');
    const price = parseInt(menuItem.getAttribute('data-price'));

    if (cartItems[name]) {
      cartItems[name].count++;
    } else {
      cartItems[name] = { price, count: 1 };
    }
    updateCart();
  });
});


function updateCart() {
  cartDisplay.innerHTML = '';
  let total = 0; 

  for (const name in cartItems) {

    const { price, count } = cartItems[name];
    total += price * count;

    const itemElement = document.createElement('div');
    itemElement.classList.add('cartItem');

    const itemNameAndCount = document.createElement('span');
    itemNameAndCount.textContent = `${name} x ${count}`;

    const itemPrice = document.createElement('span');
    itemPrice.textContent = `${(price * count).toLocaleString()}원`;

    
    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => {
      if (cartItems[name].count > 1) {
        cartItems[name].count--; 
      } else {
        delete cartItems[name]; 
      }
      updateCart(); 
    });

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => {
      cartItems[name].count++; 
      updateCart(); 
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = '삭제';
    removeButton.addEventListener('click', () => {
      delete cartItems[name]; 
      updateCart(); 
    });

    itemElement.appendChild(increaseButton);
    itemElement.appendChild(itemNameAndCount);
    itemElement.appendChild(decreaseButton);
    itemElement.appendChild(itemPrice);
    itemElement.appendChild(removeButton);
    cartDisplay.appendChild(itemElement);
  }

  totalAmountDisplay.textContent = total.toLocaleString();
}