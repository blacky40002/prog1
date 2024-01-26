/* 
funzione che aggiunge un Listener alla pagina da dove viene richiamata e che
 all'elemento con id "provedi" assenga al click l'esecuzione della funzione procedi.
*/
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("procedi").addEventListener("click", procedi);
});
