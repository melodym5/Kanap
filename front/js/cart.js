function getCart() {
  let items = [];
  if (localStorage.getItem("cart") != null) {
    items = JSON.parse(localStorage.getItem("cart"));
  }
  return items;
}

function addToCart(productId, color, qty) {
  if (qty <= 0 || color == "") {
    return;
  }
  let items = getCart();
  if (items.length == 0) {
    items = [[productId, color, qty]];
    console.log(items)
  } else {
    let found = false;
    for (let i = 0; i < items.length; i++) {
      if (productId === items[i][0] && color === items[i][1]) {
        found = true;
        items[i][2] += qty;
      }
    }
    if (found == false) {
      let item = [productId, color, qty];
      items.push(item);
    }
  }
  localStorage.setItem("cart", JSON.stringify(items));
}

// Suppression et modification des quantités

function deleteItem(id, color) {
  let items = getCart();
  for (i = 0; i < items.length; i++) {
    let product = items[i];
    if (id === product.id && color === product.color) {
      items.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(items));
      if (items.length === 0) {
        localStorage.removeItem('cart')
        }
      window.location.reload();
    }
  }
}

function changeQuantity(id, color, qty) {
  let items = getCart();
  for (let i = 0; i < items.length; i++) {
    let product = items[i];
    if (id === product.id && color === product.color) {
      product.qty = qty;
      console.log(qty)
    }
    localStorage.setItem("cart", JSON.stringify(items));
    window.location.reload();
  }
}