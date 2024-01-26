var scarpe = [];
var magliette = [];
var pantaloni = [];
var prezzoFinale = 0;

function estraiCookie(cookieStr) {
  if (cookieStr.length > 1 && controlloScadenza(cookieStr[1])) {
    // Start from index 2, as the first two entries are currency and expiration time
    for (var i = 2; i < cookieStr.length; i++) {
      var tipoProdotto = cookieStr[i][0];
      var prodotti = cookieStr[i][1].split(";"); // Split multiple products

      // Iterate over each product entry
      for (var j = 0; j < prodotti.length; j++) {
        var prodotto = prodotti[j];
        if (prodotto) {
          smistaProdotti(tipoProdotto, prodotto);
        }
      }
    }
  } else {
    console.log(
      "Errore nei dati del cookie o sessione scaduta:",
      localStorage.getItem("cookieStr")
    );
    window.location.href = "../html/index.html";
    alert("C'è stato un errore inaspettato ricominciare la sessione!");
  }
}

function smistaProdotti(primo, secondo) {
  if (primo.includes("scarpe")) {
    scarpe.push({ tipo: primo, quantita: secondo });
  } else if (primo.includes("magliette")) {
    magliette.push({ tipo: primo, quantita: secondo });
  } else if (primo.includes("pantaloni")) {
    pantaloni.push({ tipo: primo, quantita: secondo });
  }
}

function calcolaPrezzo(tipoProdotto, quantita) {
  let valuta = localStorage.getItem("cookieStr")[0];
  let valoreValuta = 1; // Fattore di conversione di default è 1 per EUR
  if (valuta == "USD") valoreValuta = 1.2;
  else if (valuta == "GBP") valoreValuta = 0.9;

  var prezzoUnitario = 0;
  if (tipoProdotto.includes("scarpe")) {
    prezzoUnitario = 50;
  } else if (tipoProdotto.includes("magliette")) {
    prezzoUnitario = 20;
  } else if (tipoProdotto.includes("pantaloni")) {
    prezzoUnitario = 40;
  }

  var prezzo = prezzoUnitario * valoreValuta * quantita;
  prezzoFinale += prezzo;
}

function creaElementiPerProdotto(arrayProdotti, idContenitore) {
  var contenitore = document.getElementById(idContenitore);
  contenitore.textContent = ""; // Pulisce il contenitore

  arrayProdotti.forEach((prodotto) => {
    var nodo = document.createElement("div");
    let tipoSpecifico = prodotto.quantita.split("=")[0];
    let quantitaSpecifico = prodotto.quantita.split("=")[1];

    calcolaPrezzo(tipoSpecifico, parseInt(quantitaSpecifico)); // Assicurati che la quantità sia un numero

    // Creazione e aggiunta del testo al nodo
    nodo.textContent = `Tipo: ${tipoSpecifico}, Quantità: ${quantitaSpecifico}`;
    contenitore.appendChild(nodo);
  });
}

function generaPrezzoFinale() {
  var contenitorePrezzo = document.getElementById("prezzoFinale");

  if (prezzoFinale == 0) contenitorePrezzo.textContent = "Carrello vuoto!";
  else {
    var cookie = JSON.parse(localStorage.getItem("cookieStr"));
    var valuta = cookie[0];
    contenitorePrezzo.textContent = `Prezzo finale: ${prezzoFinale} in ${valuta}`;
  }
}

function generaElementiHTML() {
  creaElementiPerProdotto(scarpe, "contenitoreScarpe");
  creaElementiPerProdotto(magliette, "contenitoreMagliette");
  creaElementiPerProdotto(pantaloni, "contenitorePantaloni");
}

window.onload = function () {
  cookieStr = JSON.parse(localStorage.getItem("cookieStr")) || [];
  console.log(cookieStr);

  estraiCookie(cookieStr);

  generaElementiHTML();

  generaPrezzoFinale();
  console.log(prezzoFinale + "prezzo finale");
  console.log(scarpe, magliette, pantaloni);
  bottoneAcquista.addEventListener("click", function () {
    window.location.href = "../html/finale.html";
  });

  bottoneAnnulla.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../html/index.html";
  });
  bottoneIndietro.addEventListener("click", function () {
    window.location.href = "../html/homepage.html";
  });
};
