document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let nome = document.getElementById('nome').value;
  let preco = document.getElementById('preco').value;
  let imagem = document.getElementById('imagem').value;

  let product = { nome, preco, imagem };
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(product);

  localStorage.setItem('products', JSON.stringify(products));
  
  addProductToList(product);
  this.reset(); // Limpa o formulário
});

document.getElementById('clearForm').addEventListener('click', function() {
  document.getElementById('productForm').reset();
});

function addProductToList(product) {
  let li = document.createElement('li');
  li.innerHTML = `
    <img src="${product.imagem}" alt="${product.nome}" style="width:100px;">
    <p>${product.nome} - $${product.preco}</p>
    <button onclick="removeProduct('${product.nome}')">Remover</button>
  `;
  document.getElementById('productList').appendChild(li);
}

function removeProduct(productName) {
  let products = JSON.parse(localStorage.getItem('products'));
  let filteredProducts = products.filter(p => p.nome !== productName);
  localStorage.setItem('products', JSON.stringify(filteredProducts));
  document.getElementById('productList').innerHTML = '';
  filteredProducts.forEach(addProductToList);
}

function loadProducts() {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products.forEach(addProductToList);
}

window.onload = loadProducts;

