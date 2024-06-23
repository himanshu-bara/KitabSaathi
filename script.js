// login
const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
  loadContent(); // Add this line to reload content after switching to the signup form
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
  loadContent(); // Add this line to reload content after switching to the login form
});


// shopping cart
// Event listener to initialize when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select the cart icon, cart container, and close button
  const btnCart = document.querySelector('#cart-icon');
  const cart = document.querySelector('.cart');
  const btnClose = document.querySelector('#cart-close');

  // Event listener for opening the cart when the cart icon is clicked
  btnCart.addEventListener('click', () => {
    if (cart) {
      cart.classList.add('cart-active');
    }
  });

  // Event listener for closing the cart when the close button is clicked
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      if (cart) {
        cart.classList.remove('cart-active');
      }
    });
  }

  // Load food content when the DOM is loaded
  loadFood();
});

// Function to load food content
function loadFood() {
  loadContent();
}

// Function to load content
function loadContent() {
  // Add event listeners for removing items and changing quantities
  let btnRemove = document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });

  let qtyElements = document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input) => {
    input.addEventListener('change', changeQty);
  });

  // Add event listeners for adding items to the cart
  let cartBtns = document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', addCart);
  });

  // Update the total price
  updateTotal();
}

// Function to remove an item from the cart
function removeItem() {
  if (confirm('Are You Sure to Remove')) {
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList = itemList.filter(el => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

// Function to change the quantity of an item
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

// Array to store cart items
let itemList = [];

// Function to add an item to the cart
function addCart() {
  let food = this.parentElement.parentElement;
  let title = food.querySelector('.food-title').innerHTML;
  let price = food.querySelector('.food-price').innerHTML;
  let imgSrc = food.querySelector('.food-img').src;
  let newProduct = { title, price, imgSrc };

  // Check if the product already exists in the cart
  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product Already added in Cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  // Create the HTML for the new cart item
  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
  loadContent();
}

// Function to create HTML for a cart item
function createCartProduct(title, price, imgSrc) {
  return `
    <div class="cart-box">
      <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>
  `;
}

// Function to update the total price and cart count
function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');
  let total = 0;

  cartItems.forEach(product => {
    let priceElement = product.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("₹", ""));
    let qty = product.querySelector('.cart-quantity').value;
    total += price * qty;
    product.querySelector('.cart-amt').innerText = "₹" + (price * qty);
  });

  totalValue.innerHTML = '₹' + total;

  // Update the cart count
  const cartCount = document.querySelector('.cart-count');
  let count = itemList.length;
  cartCount.innerHTML = count;
  if (count == 0) {
    cartCount.style.display = 'none';
  } else {
    cartCount.style.display = 'block';
  }
}


//contact us

