const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const objectURL = "http://localhost:3000/api/products/" + id;


// Récupération des données pour affichage d'un meuble

let fetchOneMeuble = function () {
  fetch(objectURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
     
      let img = document.querySelector(".item__img");
      img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
   
      let name = document.getElementById("title");
      name.innerHTML = data.name;
      let title = document.querySelector("title");
      title.innerHTML = data.name;
   
      let price = document.getElementById("price");
      price.innerHTML = `${data.price}`;
 
      let description = document.getElementById("description");
      description.innerHTML = data.description;

      let color = document.getElementById("colors");
      for (i = 0; i < data.colors.length; i++) {
        color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
      }
    });
};

fetchOneMeuble();

// Valeurs
function qtyValue() {
  let qty = document.getElementById("quantity");
  return qty.value;
}

function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

// Ajout panier
let btnAdd = document.getElementById("addToCart");
btnAdd.addEventListener("click", () => {
  /*let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart)
  if (cart==null) {
      cart=[]
  }*/
  let product = {}
  product.id = id;
  product.qty = parseInt(qtyValue());
  product.color = colorValue();
  addToCart(product);
})