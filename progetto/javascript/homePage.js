function gestoreCursore() {
  try {
    this.style.cursor = "pointer";
  } catch (e) {
    alert("gestoreCursore " + e);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let prodotti = [
    {
      tipo: "Scarpe",
      nome: "Scarpe Sportive",
      immagine: "../immagini/scarpe1.jpg",
      url: "../html/prodotti/scarpe.html",
    },
    {
      tipo: "Scarpe",
      nome: "Scarpe da città",
      immagine: "../immagini/scarpe2.jpg",
      url: "../html/prodotti/scarpe.html",
    },
    {
      tipo: "Magliette",
      nome: "Maglietta Cotone",
      immagine: "../immagini/maglietta1.jpg",
      url: "../html/prodotti/magliette.html",
    },
    {
      tipo: "Magliette",
      nome: "Maglietta Gialla",
      immagine: "../immagini/maglietta2.jpg",
      url: "../html/prodotti/magliette.html",
    },
    {
      tipo: "Pantaloni",
      nome: "Pantaloni Eleganti",
      immagine: "../immagini/pantaloni1.jpg",
      url: "../html/prodotti/pantaloni.html",
    },
    {
      tipo: "Pantaloni",
      nome: "Jeans",
      immagine: "../immagini/pantaloni2.jpg",
      url: "../html/prodotti/pantaloni.html",
    },
  ];

  const contenitoreProdotti = document.getElementById("prodotti");

  prodotti.forEach((prodotto) => {
    const div = document.createElement("div");
    div.innerHTML = `<h2>${prodotto.nome}</h2><img src="${prodotto.immagine}" alt="${prodotto.nome}">`;
    div.addEventListener("mouseover", gestoreCursore);
    div.addEventListener("click", function () {
      window.location.href = prodotto.url; // Reindirizza all'URL del prodotto quando cliccato
    });
    contenitoreProdotti.appendChild(div);
  });
});
