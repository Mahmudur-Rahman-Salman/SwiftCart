// treding products funtion

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

          <button class="btn btn-primary btn-sm w-full">
            Add to Cart
          </button>
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
