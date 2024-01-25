var scarpe = [];
var magliette = [];
var pantaloni = [];
var prezzoFinale;

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
    console.log("Errore nei dati del cookie o sessione scaduta:", localStorage.getItem("cookieStr"));
    window.location.href = "../html/index.html";
    alert("C'è stato un errore inaspettato ricominciare la sessione!");
  }
}

function smistaProdotti(primo, secondo) {
  if (primo.includes("scarpe")) {
    scarpe.push({tipo: primo, quantita: secondo});
  } else if (primo.includes("magliette")) {
    magliette.push({tipo: primo, quantita: secondo});
  } else if (primo.includes("pantaloni")) {
    pantaloni.push({tipo: primo, quantita: secondo});
  }

}


function calcolaPrezzo(tipoProdotto, quantita) {
  let valuta = localStorage.getItem("cookieStr")[0];
    if (valuta == "EUR") valuta = 1;
    else if (valuta == "USD") valuta = 1.2;
    else if (valuta == "GBP") valuta = 0.9;

  var prezzo = 0;
  if (tipoProdotto.includes("scarpe")) {
    prezzo = 50 * valuta;
  } else if (tipoProdotto.includes("magliette")) {
    prezzo = 20 * valuta;
  } else if (tipoProdotto.includes("pantaloni")) {
    prezzo = 40 * valuta;
  }
  prezzoFinale += prezzo * quantita;
}


function generaElementiHTML() {
  function creaElementiPerProdotto(arrayProdotti, idContenitore) {
    var contenitore = document.getElementById(idContenitore);
    contenitore.innerHTML = "";

    arrayProdotti.forEach((prodotto) => {
      var nodo = document.createElement("div");
      let tipoSpecifico = prodotto.quantita.split("=")[0];
      let quantitaSpecifico = prodotto.quantita.split("=")[1];
      let tipo = `Tipo: ${tipoSpecifico}, Quantià: ${quantitaSpecifico}`;

      nodo.innerHTML = tipo;
      contenitore.appendChild(nodo);
    });
  }

  creaElementiPerProdotto(scarpe, "contenitoreScarpe");
  creaElementiPerProdotto(magliette, "contenitoreMagliette");
  creaElementiPerProdotto(pantaloni, "contenitorePantaloni");
}

window.onload = function () {
  cookieStr = JSON.parse(localStorage.getItem("cookieStr")) || [];
  console.log(cookieStr);

  estraiCookie(cookieStr);

  generaElementiHTML();
  console.log(scarpe, magliette, pantaloni)
};
