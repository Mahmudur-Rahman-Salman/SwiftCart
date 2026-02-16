// cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartAlert();
}

function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.length;
}

updateCartCount();

function openCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="flex justify-between items-center border-b pb-2">
        <div>
          <p class="text-sm font-semibold">${item.title.slice(0, 30)}</p>
          <p class="text-sm">$${item.price}</p>
        </div>

        <button 
          class="btn btn-xs btn-error"
          onclick="removeFromCart(${index})"
        >
          ✕
        </button>
      </div>
    `;
  });

  cartTotal.innerText = total.toFixed(2);
  cartModal.showModal();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  openCart(); // re-render cart
}

// alert functionality
function showCartAlert() {
  const alertBox = document.getElementById("cartAlert");

  alertBox.classList.remove("hidden");

  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 2000); // 2 seconds
}

// trending products funtion

const trendingProductsContainer = document.getElementById("trending-products");

async function loadTrendingProducts() {
  try {
    trendingProductsContainer.innerHTML = `
          <div class="col-span-full flex justify-center py-12">
            <span
              class="loading loading-spinner loading-lg text-primary"
            ></span>
          </div>`;

    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("Failed to fetch trending products");
    }

    const products = await response.json();

    trendingProductsContainer.innerHTML = "";

    const topRated = products
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 4);

    topRated.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className =
        "border border-base-200 rounded-lg p-6 hover:shadow-md transition";
      productCard.innerHTML = `
             <img
            src="${product.image}"
            alt="${product.title}"
            class="h-48 w-full object-contain mb-4"
          />

          <h3 class="font-semibold text-lg mb-2 line-clamp-2">
            ${product.title}
          </h3>

          <div class="flex items-center justify-between mb-3">
            <span class="text-primary font-bold text-lg">
              $${product.price}
            </span>
            <span class="text-sm text-base-content/70">
              ⭐ ${product.rating.rate}
            </span>
          </div>
            `;
      trendingProductsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error loading trending products:", error);
    trendingProductsContainer.innerHTML =
      "<p class='text-red-500'>Failed to load trending products. Please try again later.</p>";
  }
}

loadTrendingProducts();

// category products function

const categoryButtons = document.getElementById("categoryButtons");
const productGrid = document.getElementById("productGrid");
const loading = document.getElementById("loading");

const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalRating = document.getElementById("modalRating");

let activeCategory = "";

async function loadCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();

  categoryButtons.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "btn btn-outline btn-sm capitalize";
    button.innerText = category;
    button.onclick = () => selectCategory(category, button);
    categoryButtons.appendChild(button);

    if (categories.length > 0) {
      const firstCategory = categories[0];
      const firstButton = categoryButtons.children[0];
      selectCategory(firstCategory, firstButton);
    }
  });
}

// select category function

async function selectCategory(category, button) {
  activeCategory = category;
  [...categoryButtons.children].forEach((btn) =>
    btn.classList.remove("btn-active"),
  );
  button.classList.add("btn-active");

  loading.classList.remove("hidden");
  productGrid.innerHTML = "";

  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  );
  const products = await res.json();

  loading.classList.add("hidden");
  renderProducts(products);
}

/* -------------------- RENDER PRODUCTS -------------------- */
function renderProducts(products) {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow";

    card.innerHTML = `
      <figure class="p-4 h-48">
        <img src="${product.image}" class="object-contain h-full" />
      </figure>

      <div class="card-body">
        <h2 class="text-sm font-semibold">
          ${product.title.slice(0, 40)}...
        </h2>

        <span class="badge badge-outline capitalize">
          ${product.category}
        </span>

        <p class="font-bold">$${product.price}</p>
        <p class="text-sm">⭐ ${product.rating.rate}</p>

        <div class="card-actions justify-between mt-2">
          <button class="btn btn-sm btn-outline" onclick="openModal(${product.id})">
            Details
          </button>
          <button class="btn btn-sm btn-primary" onclick='addToCart(${JSON.stringify(product)})'>Add To Cart</button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

/* -------------------- MODAL -------------------- */
async function openModal(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  modalTitle.innerText = product.title;
  modalDesc.innerText = product.description;
  modalPrice.innerText = `$${product.price}`;
  modalRating.innerText = `⭐ ${product.rating.rate}`;

  modal.showModal();
}

/* INIT */
loadCategories();
