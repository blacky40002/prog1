//inizializzo la variabile a livello globale cosi che possa esser usata da tutte le funzioni di questa pagine .js.
let cookieStr = [];
/* funzione che viene chiamata dopo che è stato premuto il pulsante "procedi" della pagina index.html, 
estrae la valuta che è stata selezionata e se è uguale a "-" allora farà comparire una scritta,
altrimenti chiamerà la funzione creaCookie passandole la "valuta" e infine reinderezzerà alla pagina homepage.*/
function procedi() {
  var valuta = document.getElementById("valuta").value;
  var avvisoValuta = document.getElementById("avvisoValuta");

  if (valuta === "-") {
    avvisoValuta.classList.remove("avviso-nascosto");
    avvisoValuta.classList.add("avviso-visibile");
  } else {
    avvisoValuta.classList.remove("avviso-visibile");
    avvisoValuta.classList.add("avviso-nascosto");
    creaCookie(valuta);
    window.location.href = "../html/homepage.html";
  }
}

/* 
Crea il Cookie con la valuta selezionata e la data di scadenza settata a 15 minuti.  
Inserisco i dati del cookie sotto forma di array  in una variabile chiama cookieStr  e poi nel localStorage che viene prima ripulito.

*/
function creaCookie(valuta) {
  localStorage.clear();
  var scadenzaMilliSecondi = 15 * 60 * 1000; // 15 minuti
  var data = new Date();
  var expirationTime = data.getTime() + scadenzaMilliSecondi; // Scadenza in millisecondi

  cookieStr[0] = valuta;
  cookieStr[1] = expirationTime;
  aggiornaLocalStorage(cookieStr);
  console.log("Cookie created: ", cookieStr);
  console.log("Current cookie item:", cookieStr[1]);
}

/*   JSON.stringify() trasforma un oggetto(nel nostro caso un array) in una stringa cosi che
       possa essere salvato nel localStorage e poi ritrasformato in un oggetto con JSON.parse() */
function aggiornaLocalStorage() {
  localStorage.setItem("cookieStr", JSON.stringify(cookieStr));
}
/* 
Aggiorna i dati presenti nel cookieStr prima estraendolo dal local storage, poi controllando se non è ancora scaduto
 e poi aggiornandolo con i nuovi dati che vengono passati alla funzione alla chiamata.
*/
function aggiornaCookie(prodotto, valore) {
  cookieStr = JSON.parse(localStorage.getItem("cookieStr"));
  if (controlloScadenza(cookieStr[1])) {
    // Session is valid, update the cookie

    let nuovoCookie = [prodotto, valore];
    cookieStr.push(nuovoCookie);
    aggiornaLocalStorage(cookieStr);
    alert("prodotti aggiunti al carrello");
  }
}
/* 
funzione che controlla la scadenza, prima prende l'ora attuale e la confronta con la data di scadenza del cookie,
se l'ora attuale è minore della data di scadenza allora ritorna true, altrimenti cancella il cookie e reindirizza alla pagina index.html.
*/
function controlloScadenza(dataScadenza) {
  var oraAttuale = new Date().getTime();
  if (oraAttuale < dataScadenza) {
    return true;
  } else {
    cookieStr = [];
    aggiornaLocalStorage(cookieStr);
    window.location.href = "../index.html";
    alert("Sessione scaduta!");
    return false;
  }
}

/* 
Funzione che smista i vari prodotti creando le stringhe che verranno poi visualizzate nel carrello.
*/
function prodottiCaricamento() {
  var h1NelCont = document.querySelector(".cont h1");
  var tipoProdottoH1 = h1NelCont.className;
  var prodottiCookie = "";
  if (prodotto2 > 0) {
    prodottiCookie += tipoProdottoH1 + " eleganti=" + prodotto2 + ";";
  }
  if (prodotto1 > 0) {
    prodottiCookie += tipoProdottoH1 + " casual=" + prodotto1 + ";";
  }

  if (prodottiCookie) {
    aggiornaCookie(tipoProdottoH1, prodottiCookie);

    window.location.href = "../homepage.html";
    console.log(localStorage.getItem("cookieStr"));
  } else {
    alert("Nessun prodotto aggiunto!");
    window.location.href = "../homepage.html";
  }
}
