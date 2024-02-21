
async function fetchProductData(category) {
  try {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();
    return data[category];
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
}

async function renderProductCards(category) {
  const products = await fetchProductData(category);
  const container = document.getElementById(category);
  container.innerHTML = '';

  products || [].forEach(product => {
    const discount = ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100;

    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
  <img src="${product.image}" alt="${product.title}">
  <span class="badge">${product.badge}</span>
  <h2>${product.title}</h2>
  <p>Vendor: ${product.vendor}</p>
  <p>Price: $${product.price}</p>
  <p>Compare at price: $${product.compareAtPrice}</p>
  <p>Discount: ${discount.toFixed(2)}% off</p>
  <button>Add to Cart</button>
`;
    container.appendChild(card);
  });
}

function showTab(category) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.getElementById(category).classList.add('active');
  renderProductCards(category);
}

showTab('men'); 
