let cookieStr = [];


function inizializza() {
  document.getElementById("avvisoValuta").classList.add("avviso-nascosto");
}

function procedi() {
  var valuta = document.getElementById("valuta").value;
  var avvisoValuta = document.getElementById("avvisoValuta");

  if (valuta === "-") {
    avvisoValuta.classList.remove("avviso-nascosto");
  } else {
    avvisoValuta.classList.add("avviso-nascosto");
    creaCookie(valuta);
    window.location.href = "../html/homepage.html";
  }
}

function aggiornaLocalStorage(cookie) {
  let cookieInMemoria = localStorage.getItem("cookieStr");
  let cookieTrasformato = cookieInMemoria ? JSON.parse(cookieInMemoria) : [];
  cookieTrasformato.push(cookie);
  cookieStr = cookieTrasformato;
  localStorage.setItem("cookieStr", JSON.stringify(cookieStr));
}


function creaCookie(valuta) {
  var scadenzaMilliSecondi = 15 * 60 * 1000; // 15 minuti
  var data = new Date();
  data.setTime(data.getTime() + scadenzaMilliSecondi);

  cookieStr[0] = valuta;
  cookieStr[1] = data.toISOString(); // scadenza
  aggiornaLocalStorage(cookieStr);
}

function aggiornaCookie(prodotto, valore) {
  if (cookieStr.length > 2) {
    if (controlloScadenza(cookieStr[1])) {
      cookieStr = [];
      aggiornaLocalStorage(cookieStr);
      window.location.href = "../html/index.html";
      alert("Sessione scaduta!");
    } else {
      if (prodotto && valore) {
        cookieStr.push(prodotto + "=" + valore);
        aggiornaLocalStorage(cookieStr);
      }
    }
  } else {
    window.location.href = "../index.html";
    alert("C'è stato un errore inaspettato ricominciare la sessione!");
  }
}
function controlloScadenza(dataDacontrollare) {
  var oraAttuale = new Date().getTime();
  var oraScadenza = new Date(dataDacontrollare).getTime();

  if (oraAttuale >= oraScadenza) {
    return false;
  } else return true;
}

