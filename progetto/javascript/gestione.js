let cookieStr = [];

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
function creaCookie(valuta) {
  localStorage.clear();
  var scadenzaMilliSecondi = 15 * 60 * 1000; // 15 minutes in milliseconds
  var data = new Date();
  var expirationTime = data.getTime() + scadenzaMilliSecondi; // Expiration time in milliseconds

  cookieStr[0] = valuta;
  cookieStr[1] = expirationTime; // Store the expiration time directly in milliseconds
  aggiornaLocalStorage(cookieStr);
  console.log("Cookie created: ", cookieStr);
  console.log("Current cookie item:", cookieStr[1]);
}

function aggiornaLocalStorage(newCookieData) {
  localStorage.setItem("cookieStr", JSON.stringify(cookieStr));
}

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
