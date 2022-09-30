const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const objectURL = "http://localhost:3000/api/products/" + id;


// Récupération des données pour affichage d'un meuble

let fetchOneMeuble = function () {
  fetch(objectURL)
    .then((response) => response.json())
    .then((data) => {
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
  let product = {}
  product.id = id;
  product.qty = parseInt(qtyValue());
  product.color = colorValue();
  if (
    product.qty < 1 ||
    product.qty > 100 ||
    product.qty === undefined ||
    product.color === undefined ||
    product.color === ""
  ) {
    alert("Pour valider le choix de cet article, veuillez renseigner une couleur et/ou une quantité valide entre 1 et 100");
  } else { 
  alert("Votre produit a été ajouté!");
  addToCart(product);
  }
})