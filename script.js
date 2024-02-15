document.addEventListener("DOMContentLoaded", function () {
  showProducts('Men');
});

function showProducts(category) {
  fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
    .then(response => response.json())
    .then(data => {
      let products = [];
      for (let cat of data.categories) {
        if (cat.category_name === category) {
          products = cat.category_products;
          break;
        }
      }
      let output = "";
      for (let product of products) {
        let discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
        output += `


        <div class="product">
    <img src="${product.image}" alt="${product.title}">
    <div class="title-vendor">
    <p class="title">${product.title}</p>
    <p class="vendor">${product.vendor}</p>
    </div>
    <div class="price-info" style="display: flex; align-items: center;"> 
        <p class="price" style="margin-right: 15px;">Rs.${product.price}</p> 
        <p class="compare-price" style="color: #888; margin-right: 15px;">${product.compare_at_price > product.price ? `<del>${product.compare_at_price}.00</del>` : ''}</p> 
        <p class="discount" style="color: red;">${discount > 0 ? `${discount}% off` : ''}</p>
    </div>
    ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
    <button class="cart">Add to cart <i class="bx bx-cart-alt"></i></button>
</div>

        `;
      }
      document.querySelector(".products").innerHTML = output;
    })
    .catch(error => console.error('Error fetching data:', error));
}