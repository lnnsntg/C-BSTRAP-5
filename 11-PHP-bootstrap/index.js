const formulario = document.getElementById("formulario");
const usuario = document.getElementById("texto-1");
const correo = document.getElementById("texto-2");
const mensaje = document.getElementById("texto-3");
const boton = document.getElementById("boton");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();
  const data = new FormData(formulario);

  //--------------------------------------------------------------

  if (!data.get("usuario").trim()) {
    console.log("no existe informacion del usuario");
    campoError(usuario);
    return;
  } else {
    campoValido(usuario);
  }

  if (!data.get("correo").trim()) {
    console.log("no existe informacion del correo");
    campoError(correo);
    return;
  } else {
    campoValido(correo);
  }

  if (!data.get("mensaje").trim()) {
    console.log("no existe informacion del mensaje");
    campoError(mensaje);
    return;
  } else {
    campoValido(mensaje);
  }
  console.log("campos completados");

  //--------------------------------------------------------------

  fetch("formulario.php", {
    method: "POST",
    body: data,
  })
    .then((resp) => resp.json())
    .then((datos) => {
      console.log("clg de datos: ", datos);

      if (datos.error && datos.campo === "usuario") {
        campoError(usuario);
        return;
      }
      campoValido(usuario);

      if (datos.error && datos.campo === "correo") {
        campoError(correo);
        return;
      }
      campoValido(correo);

      if (datos.error && datos.campo === "mensaje") {
        campoError(mensaje);
        return;
      }
      campoValido(mensaje);
      if (!datos.error) {
        limpiarFormulario();
      }
    })
    .catch((error) => console.log("clg error en fetch", error));

  //--------------------------------------------------------------
});

//-------------------------------------------------------------

const campoError = (campo) => {
  campo.classList.add("is-invalid");
  campo.classList.remove("is-valid");
};

const campoValido = (campo) => {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
};
//-------------------------------------------------------------

const limpiarFormulario = () => {
  console.log("Mensaje enviado con éxito");
  formulario.reset();
  usuario.classList.remove("is-valid");
  correo.classList.remove("is-valid");
  mensaje.classList.remove("is-valid");
  getText("fetch_info.txt");
};

//-------------------------------------------------------------

/*  
  const getText = (file) => {
    fetch(file).then((data) => {
      data.text()
      .then((texto) => {
        document.getElementById("demo").innerHTML = texto;
      });
    });
  }; 
  */

async function getText(file) {
  let x = await fetch(file);
  let y = await x.text();
  document.getElementById("demo").innerHTML = y;
}
