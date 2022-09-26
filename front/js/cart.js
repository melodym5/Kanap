function getCart() {
  let items = [];
  if (localStorage.getItem("cart") != null) {
    items = JSON.parse(localStorage.getItem("cart"));
  }
  return items;
}

function addToCart(product) {
  if (product.qty <= 0 || product.color == "") {
    return;
  }
  let items = getCart();
  
  if (items.length == 0) {
    items = [product];
  } else {
    let found = false;
    for (let i = 0; i < items.length; i++) {
      let currentProduct = items [i];
      if (product.id === currentProduct.id && product.color === currentProduct.color) {
        found = true;
        currentProduct.qty += product.qty;
        break
      }
    }
    if (found == false) {
      items.push(product);
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
      product.qty = parseInt(qty);
    }
    localStorage.setItem("cart", JSON.stringify(items));
    window.location.reload();
  }
}

// REGEXs

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");

const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexMail.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}

const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom) == false) {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}

const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom) == false) {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}

const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville) == false) {
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}

function makeJsonData() {
  let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: mail.value,
  };
  let items = getCart();
  let products = [];

  for (i = 0; i < items.length; i++) {
    products.push(items[i].id);
  }
  let jsonData = JSON.stringify({ contact, products });
  return jsonData;
}