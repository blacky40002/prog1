//Funzione che modifica l'aspetto del puntatore del mouse quando si passa sopra l'elemento.
/**/ function gestoreCursore() {
  /**/ try {
    /**/ this.style.cursor = "pointer";
    /**/
  } catch (e) {
    /**/ alert("gestoreCursore " + e);
    /**/
  }
  /**/
}
//Funzione anonima che al click del bottone con id bottoneCarrello reindirizza alla pagina carrello.
bottoneCarrello.addEventListener("click", function () {
  window.location.href = "../html/carrello.html";
});
//aggiunta del listener che esegue la funzione anonima.
document.addEventListener("DOMContentLoaded", function () {
  // Array di prodotti.
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

  //Funzione ForEach che cicla l'array prodotti e per ogni elemento crea un div contenitore con all'interno un h2 e un img.
  prodotti.forEach((prodotto) => {
    // Creazione del div contenitore
    const div = document.createElement("div");

    // Creazione e configurazione dell'elemento <h2>
    const h2 = document.createElement("h2");
    h2.textContent = prodotto.nome;
    div.appendChild(h2);

    // Creazione e configurazione dell'elemento <img>
    const img = document.createElement("img");
    img.src = prodotto.immagine;
    img.alt = prodotto.nome;
    div.appendChild(img);

    // Aggiunta degli event listeners
    div.addEventListener("mouseover", gestoreCursore);
    div.addEventListener("click", function () {
      window.location.href = prodotto.url; // Reindirizza all'URL del prodotto quando cliccato
    });

    // Aggiunta del div al contenitore
    contenitoreProdotti.appendChild(div);
  });
});
