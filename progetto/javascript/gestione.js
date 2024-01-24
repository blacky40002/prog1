let cookieStr = [];

function procedi() {
  var valuta = document.getElementById("valuta").value;
  var avvisoValuta = document.getElementById("avvisoValuta");

  if (valuta === "-") {
    avvisoValuta.classList.remove("avviso-nascosto");
  } else {
    avvisoValuta.classList.add("avviso-nascosto");
    creaCookie(valuta);
    // Comment out the line below for debugging
    window.location.href = "../html/homepage.html";
  }
}

function aggiornaLocalStorage(cookie) {
  console.log("Updating local storage with: ", cookie); // Debugging
  localStorage.setItem("cookieStr", JSON.stringify(cookie));
}

function creaCookie(valuta) {
  localStorage.clear();
  var scadenzaMilliSecondi = 15 * 60 * 1000; // 15 minuti
  var data = new Date();
  data.setTime(data.getTime() + scadenzaMilliSecondi);

  cookieStr[0] = valuta;
  cookieStr[1] = data.toISOString();
  aggiornaLocalStorage(cookieStr);
  console.log("Cookie created: ", cookieStr); // Debugging
  console.log("Current cookie item:", cookieStr[1]);
}

function aggiornaLocalStorage(cookie) {
  let cookieInMemoria = localStorage.getItem("cookieStr");
  let cookieTrasformato = cookieInMemoria ? JSON.parse(cookieInMemoria) : [];
  cookieTrasformato.push(cookie);
  cookieStr = cookieTrasformato;
  localStorage.setItem("cookieStr", JSON.stringify(cookieStr));
}

function aggiornaCookie(prodotto, valore) {
  if (controlloScadenza(cookieStr[1])) {
    cookieStr = [];
    aggiornaLocalStorage(cookieStr);
    window.location.href = "../html/index.html";
    alert("Sessione scaduta!");
  } else if (prodotto && valore) {
    cookieStr.push(prodotto + "=" + valore);
    aggiornaLocalStorage(cookieStr);
  } else {
    console.log("Nessun prodotto da aggiungere o sessione non iniziata.");
    // Potentially handle the case where no products are added yet
  }
}
function controlloScadenza(dataDacontrollare) {
  var oraAttuale = new Date().getTime();
  var oraScadenza = new Date(dataDacontrollare).getTime();
  if (oraAttuale >= oraScadenza) {
    return true;
  } else return false;
}

function prodottiCaricamento() {
  var h1NelCont = document.querySelector(".cont h1");
  var tipoProdottoH1 = h1NelCont.className;
  var prodottiCookie = "";
  if (prodotto2 > 0) {
    prodottiCookie += tipoProdottoH1 + "prodotto2=" + prodotto2 + ";";
  }
  if (prodotto1 > 0) {
    prodottiCookie += tipoProdottoH1 + "prodotto1=" + prodotto1 + ";";
  }

  if (prodottiCookie) {
    aggiornaCookie(tipoProdottoH1, prodottiCookie);
    alert("prodotti aggiunti al carrello");
    window.location.href = "../homepage.html";
    console.log(localStorage.getItem("cookieStr"));
  } else {
    console.log("Nessun prodotto aggiunto");
  }
}
