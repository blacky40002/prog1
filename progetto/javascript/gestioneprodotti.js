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
    .addEventListener("click", function () {
      var h1NelCont = document.querySelector(".cont h1");
      var tipoProdottoH1 = h1NelCont.className;
      var prodottiCookie = "";
      if (prodotto2 > 0) {
        prodottiCookie += tipoProdottoH1 + "prodotto2=" + prodotto2 + ";";
          aggiornaCookie(tipoProdottoH1, prodottiCookie)
      }
      if (prodotto1 > 0) {
        prodottiCookie += tipoProdottoH1 + "prodotto1=" + prodotto1 + ";";
          aggiornaCookie(tipoProdottoH1, prodottiCookie)
      }
      window.location.href = "../homepage.html";
      if (!!prodottiCookie) {
        throw alert("prodotti aggiunti al carrello");
      }
    });

  /* var tagliePerCategoria = {
    Scarpe: ["37", "38", "39", "40", "41", "43", "44", "45", "46"],
    Magliette: ["S", "M", "L"],
    Pantaloni: ["XS", "S", "M", "l", "XL"],
  };

  function identificaPaginaEImpostaTaglie() {
    var titoloPagina = document.querySelector("h1").className;
    var taglie = tagliePerCategoria[titoloPagina];

    if (taglie) {
      var selectElements = document.querySelectorAll(".taglia");
      selectElements.forEach(function (selectElement) {
        taglie.forEach(function (taglia) {
          var opzione = document.createElement("option");
          opzione.value = taglia;
          opzione.textContent = taglia;
          selectElement.appendChild(opzione);
        });
      });
    }
  }

  window.onload = identificaPaginaEImpostaTaglie; */
});
