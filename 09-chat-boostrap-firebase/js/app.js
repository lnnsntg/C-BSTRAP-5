const nombreUsuario = document.getElementById("nombreUsuario");
const btnIngreso = document.getElementById("btnIngreso");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const contenidoWeb = document.getElementById("contenidoWeb");
const formulario = document.getElementById("formulario");
const texto = document.getElementById("texto");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    accionCerrarSesion();
    nombreUsuario.innerHTML = user.displayName;
  } else {
    accionAcceder();
    nombreUsuario.innerHTML = "CHAT-Firebase-Bootstrap";
  }
});

const accionAcceder = () => {
  console.log("Sin usuario registrado");
  formulario.classList.add("d-none");
  contenidoWeb.innerHTML = `<p class="lead mt-5 text-center">Debes iniciar sesión</p>`;

  btnIngreso.addEventListener("click", async () => {
    console.log("Quieres ingresar");

    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  });
};

const accionCerrarSesion = () => {
  console.log("usuario registrado");
  formulario.classList.remove("d-none");
  btnCerrarSesion.addEventListener("click", () => {
    console.log("Quieres cerrar sesión");
    firebase.auth().signOut();
  });
};
