const nombreUsuario = document.getElementById("nombreUsuario");
const btnIngreso = document.getElementById("btnIngreso");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const contenidoWeb = document.getElementById("contenidoWeb");
const formulario = document.getElementById("formulario");
const texto = document.getElementById("texto");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    contenidoWeb.innerHTML = "";
    accionCerrarSesion();
    nombreUsuario.innerHTML = user.displayName;
    contenidoChat(user);
  } else {
    accionAcceder();
    nombreUsuario.innerHTML = "CHAT-Firebase-Bootstrap";
  }
});

const contenidoChat = (user) => {
  // ---------------------------------
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(texto.value);

    if (!texto.value.trim()) {
      console.log("texto vacio");
      return;
    }

    firebase
      .firestore()
      .collection("chat")
      .add({
        texto: texto.value,
        uid: user.uid,
        fecha: Date.now(),
      })
      .then((resp) => {
        console.log("Texto agregado a firestore");
      });

    texto.value = "";
  });
  // --------------------------------------

  firebase
    .firestore()
    .collection("chat")
    .orderBy("fecha")
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("chat: ", change.doc.data());
          if (user.uid === change.doc.data().uid) {
            contenidoWeb.innerHTML += `
                <div class="text-end"><span class="badge bg-primary">${
                  change.doc.data().texto
                }</span></div>
                `;
          } else {
            contenidoWeb.innerHTML += `
                <div class="text-start"><span class="badge bg-secondary">${
                  change.doc.data().texto
                }</span></div>
                `;
          }
          contenidoWeb.scrollTo = contenidoWeb.scrollHeight;
        }
      });
    });
};

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
