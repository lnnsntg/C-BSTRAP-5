console.log("funcionando");

const formulario = document.querySelector("#formulario");
const btnEnviar = document.querySelector("#btnEnviar");
const btnCargando = document.querySelector("#btnCargando");
const toast = document.querySelector(".toast");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const datos = new FormData(formulario);

  console.log("Clg Campo del Email: ", datos.get("email"));
  console.log("Clg Campo del Pass: ", datos.get("password"));
  console.log("Clg Campo del Checkbox: ", datos.get("checkbox"));
  btnEnviar.classList.add("d-none");
  btnCargando.classList.remove("d-none");

  setTimeout(() => {
    btnCargando.classList.add("d-none");
    btnEnviar.classList.remove("d-none");
    const eventoToast = new bootstrap.Toast(toast);
    eventoToast.show();
  }, 1000);
  formulario.reset();
});
