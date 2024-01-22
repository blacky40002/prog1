document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("procedi").addEventListener("click", procedi);
  inizializza();
  /*  estraiCookie(); */
  /*   generaElementiHTML(); */
});
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
