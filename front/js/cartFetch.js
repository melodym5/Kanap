const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const h1 = document.getElementsByTagName("h1");

// Récupération des données

function fetchIdData() {
  let items = getCart();
  let qty = 0;
  let price = 0;
    if (localStorage.getItem("cart") != null) {
    for (let i = 0; i < items.length; i++) {
      let product = items [i];
      let id = product.id;
      let color = product.color;
      let url = "http://localhost:3000/api/products/" + id;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cartSection.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${data.name}</h2>
                    <p>${color}</p>
                    <p>${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${id}', '${color}', this.value)" min="1" max="100" value="${product.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="deleteItem('${id}','${color}')">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;

          // Total

          price += data.price * product.qty;
          document.getElementById("totalPrice").innerHTML = price;
        });
      qty += parseInt(product.qty);
      document.getElementById("totalQuantity").innerHTML = qty;
    }
    } else {
      h1[0].innerHTML = `Votre panier est vide`;
      cartOrder[0].innerHTML = "";
      cartPrice[0].innerHTML = "";
    }
  }

fetchIdData();

const postUrl = "http://localhost:3000/api/products/order";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault(); 
  // REGEXs permissions
  let email = validateEmail(mail.value);
  let firstName = validateFirstName(prenom.value);
  let lastName = validateLastName(nom.value);
  let address = validateAddress(adresse.value);
  let city = validateCity(ville.value);
  if (
    email == false ||
    firstName == false ||
    lastName == false ||
    address == false ||
    city == false
  ) {
    if (email == false) {
      emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
    }
    if (firstName == false) {
      firstNameErrorMsg.innerHTML = "Entrez un prénom valide.";
    }
    if (lastName == false) {
      lastNameErrorMsg.innerHTML = "Entrez un nom valide.";
    }
    if (address == false) {
      addressErrorMsg.innerHTML = "Entrez une adresse valide.";
    }
    if (city == false) {
      cityErrorMsg.innerHTML = "Entrez une commune valide.";
    }
    return;
  }
  let jsonData = makeJsonData();
  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.clear();
      let confirmationUrl = "./confirmation.html?id=" + data.orderId;
      window.location.href = confirmationUrl;
    })
    .catch(() => {
      alert("Une erreur est survenue.");
    });
});