let prodotto1 = 0;
let prodotto2 = 0;

/*  Questa funzione inizializza gli eventi sui bottoni per incrementare o decrementare la quantità di due prodotti (prodotto1 e prodotto2)
Ogni bottone ha un suo ascoltatore di eventi: 

I bottoni "bottonePiu /1" aumentano la quantità del rispettivo prodotto.
I bottoni "bottoneMeno /1"  riducono la quantità del rispettivo prodotto, con un controllo assicuro che non scendano sotto lo 0.
Il valore aggiornato di ogni prodotto viene visualizzato nei rispettivi box.  
 */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("bottonePiu").addEventListener("click", function () {
    prodotto1 += 1;
    document.getElementById("boxRisultato1").innerText = prodotto1;
  });

  document.getElementById("bottoneMeno").addEventListener("click", function () {
    if (prodotto1 > 0) prodotto1 -= 1;
    document.getElementById("boxRisultato1").innerText = prodotto1;
  });

  document.getElementById("bottonePiu1").addEventListener("click", function () {
    prodotto2 += 1;
    document.getElementById("boxRisultato2").innerText = prodotto2;
  });

  document
    .getElementById("bottoneMeno1")
    .addEventListener("click", function () {
      if (prodotto2 > 0) prodotto2 -= 1;
      document.getElementById("boxRisultato2").innerText = prodotto2;
    });
  // viene aggiunto un ascoltatore per il "bottoneConferma" per gestire il caricamento dei prodotti.
  document
    .getElementById("bottoneConferma")
    .addEventListener("click", prodottiCaricamento);
});
