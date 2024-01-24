let prodotto1 = 0;
let prodotto2 = 0;

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

  document
    .getElementById("bottoneConferma")
    .addEventListener("click", prodottiCaricamento);
});
