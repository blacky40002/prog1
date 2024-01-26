//Variablili globali per il carrello.
var scarpe = [];
var magliette = [];
var pantaloni = [];
var prezzoFinale = 0;
/* 
Funzione che estrae i deti del cookie  (che vengono prima presi dal local storage), prima controlla se sono presenti
 dati e se la scadenza non è ancora avvenuta, in seguito con un ciclo for scorre i dati  e con la funzione split() 
li divide in un array  di array dove al primo indice c'è il tipo di prodotto[0] e al secondo il tipo di prodotto e la quantità[1].
all'interno di questo array viene fatto un altro ciclo for che scorre i prodotti e li smista nelle varie variabili con smistaProdotti().
In caso di fallimento dei precedenti controlli viene reindirizzato alla pagina index  e compare un alert.

*/
function estraiCookie(cookieStr) {
  if (cookieStr.length > 1 && controlloScadenza(cookieStr[1])) {
    for (var i = 2; i < cookieStr.length; i++) {
      var tipoProdotto = cookieStr[i][0];
      var prodotti = cookieStr[i][1].split(";"); // Split multiple products

      for (var j = 0; j < prodotti.length; j++) {
        var prodotto = prodotti[j];
        if (prodotto) {
          smistaProdotti(tipoProdotto, prodotto);
        }
      }
    }
  } else {
    window.location.href = "../html/index.html";
    alert("C'è stato un errore inaspettato ricominciare la sessione!");
  }
}
/* 
Funzione che smista i prodotti in maso al tipo nelle rispettivbe variabili globali.
*/
function smistaProdotti(primo, secondo) {
  if (primo.includes("scarpe")) {
    scarpe.push({ tipo: primo, quantita: secondo });
  } else if (primo.includes("magliette")) {
    magliette.push({ tipo: primo, quantita: secondo });
  } else if (primo.includes("pantaloni")) {
    pantaloni.push({ tipo: primo, quantita: secondo });
  }
}
/* 
Funzione che calcola il prezzo finale in base alla valuta che è stata scelta nella pagina index
 e alla quantità dei prodotti selezionati  e viene aggiunto alla variabile globale prezzoFinale.
*/
function calcolaPrezzo(tipoProdotto, quantita) {
  let valuta = localStorage.getItem("cookieStr")[0];
  let valoreValuta = 1;
  if (valuta == "USD") valoreValuta = 1.2;
  if (valuta == "GBP") valoreValuta = 0.9;
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
/* 
Funzione che genera gli elementi HTML per ogni prodotto presente nel carrello, 
viene prima preso il contenitore e poi viene pulito, in seguito viene fatto un ciclo for che scorre i prodotti e per ogni prodotto
presente genera un div con al suo interno la stringa globale dei rispettivi prodotti. Nel ciclo for viene anche chiamata la funzione
calcolaPrezzo() per aggiungere il prezzo di ogni singolo prodotto al prezzo totale.
*/
function creaElementiPerProdotto(arrayProdotti, idContenitore) {
  var contenitore = document.getElementById(idContenitore);
  contenitore.textContent = ""; // Pulisce il contenitore

  arrayProdotti.forEach((prodotto) => {
    var nodo = document.createElement("div");
    let tipoSpecifico = prodotto.quantita.split("=")[0];
    let quantitaSpecifico = prodotto.quantita.split("=")[1];

    calcolaPrezzo(tipoSpecifico, parseInt(quantitaSpecifico)); // Uso ParseInt per convertire la stringa in un numero.
    // Creazione e aggiunta del testo al nodo
    nodo.textContent = `Tipo: ${tipoSpecifico}, Quantità: ${quantitaSpecifico}`;
    // selezionando la classe contenitore vengono aggiunti al sui interno in maniera dinamica i prodotti con appendChild()
    contenitore.appendChild(nodo);
  });
}
/* 
Funzione che controlla se sono stati aggiunti prodotti al carrello(controllando il prezzo finale), e in caso negativo manda il messaggio "carrello vuoto",
in caso contrario genera il prezzo finale con la valuta scelta.
*/
function generaPrezzoFinale() {
  var contenitorePrezzo = document.getElementById("prezzoFinale");

  if (prezzoFinale == 0) contenitorePrezzo.textContent = "Carrello vuoto!";
  else {
    var cookie = JSON.parse(localStorage.getItem("cookieStr"));
    var valuta = cookie[0];
    contenitorePrezzo.textContent = `Prezzo finale: ${prezzoFinale} in ${valuta}`;
  }
}
//Funzione che richiama la funzione creaElementiPerProdotto() per passando le variabili globali.
function generaElementiHTML() {
  creaElementiPerProdotto(scarpe, "contenitoreScarpe");
  creaElementiPerProdotto(magliette, "contenitoreMagliette");
  creaElementiPerProdotto(pantaloni, "contenitorePantaloni");
}
/* Funzione anonima che al caricamento della pagina esegue le varie funzioni in ordine,
1) Estrae dal local storage i dati del Cookie ritrasformandolo con .parse() nel formato originale.
2) Richiama la funzione che estrae i dati dal cookie.
3) Richiama la funzione che genera gli elementi HTML.
4) Richiama la funzione che genera il prezzo finale.
5) Agginge 3 listener per i rispettivi bottoni della pagina HTML e gli aggiunge delle funzioni anonime  che fanno i loro rispettivi compiti.
 */
window.onload = function () {
  cookieStr = JSON.parse(localStorage.getItem("cookieStr")) || [];
  estraiCookie(cookieStr);
  generaElementiHTML();
  generaPrezzoFinale();
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
