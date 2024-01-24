var scarpe = [];
var magliette = [];
var pantaloni = [];

function estraiCookie(cookieStr) {
  // Check if the cookieStr array has at least one element and if the session has expired
  if (cookieStr.length >= 1 && controlloScadenza(cookieStr[0][1])) {
    // Start the loop from the second element (i = 1) since the first element is the timestamp
    for (var i = 1; i < cookieStr.length; i++) {
      var tipoProdotto = cookieStr[i][0]; // Assuming the first element is the product type
      var prodotto = cookieStr[i][1]; // Assuming the second element is the quantity
      console.log(tipoProdotto, prodotto);
      smistaProdotti(tipoProdotto, prodotto);
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
  if (primo.includes("Scarpe")) {
    scarpe.push({ tipo: primo, quantita: secondo });
  } else if (primo.includes("Magliette")) {
    magliette.push({ tipo: primo, quantita: secondo });
  } else if (primo.includes("Pantaloni")) {
    pantaloni.push({ tipo: primo, quantita: secondo });
  }
}

function generaElementiHTML() {
  function creaElementiPerProdotto(arrayProdotti, idContenitore) {
    var contenitore = document.getElementById(idContenitore);
    contenitore.innerHTML = "";

    arrayProdotti.forEach((prodotto) => {
      var nodo = document.createElement("div");
      nodo.innerHTML = `Tipo: ${prodotto.tipo}, Quantità: ${prodotto.quantita}`;
      contenitore.appendChild(nodo);
    });
  }
  console.log(scarpe.length);
  creaElementiPerProdotto(scarpe, "contenitoreScarpe");
  creaElementiPerProdotto(magliette, "contenitoreMagliette");
  creaElementiPerProdotto(pantaloni, "contenitorePantaloni");
}
window.onload = function () {
  cookieStr = JSON.parse(localStorage.getItem("cookieStr")) || [];
  console.log(cookieStr);
  estraiCookie(cookieStr);
  generaElementiHTML();
};
