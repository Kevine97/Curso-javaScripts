//Variable
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("enviar");
const formularioEnviar = document.getElementById("enviar-mail");
const btnReset = document.querySelector("#resetBtn");
//Evenlistener
evenlisteners();

function evenlisteners() {
  //Inicio de la aplicacion y desahabilitar el boton "enviar"
  document.addEventListener("DOMContentLoaded", inicioApp);

  //Campos del formulario
  email.addEventListener("blur", validarCampo);
  asunto.addEventListener("blur", validarCampo);
  mensaje.addEventListener("blur", validarCampo);

  //Boton enviar
  formularioEnviar.addEventListener("submit", enviarEmail);

  //Bonton reset
  btnReset.addEventListener("click", reset);
}

//Funcion que limpia los formularios
function reset(e) {
  formularioEnviar.reset();
  e.preventDefault();
}

//Funciones
function inicioApp() {
  //Desahabilitar el envio
  btnEnviar.disabled = true;
}

//Valida que los campos tengas algo escritos
function validarCampo() {
  //se valida la longitud del texto y no este vacio
  validarLogitud(this);

  //Validar unicamente el email
  if (this.type === "email") {
    validarEmail(this);
  }
  //Validando que los campos tengas algo escrito para validar el boton enviar

  let errores = document.querySelectorAll(".error");
  if (email.value != "" && asunto.value != "" && mensaje.value != "") {
    if (errores.length === 0) {
      btnEnviar.disabled = false;
    }
  }
}

//Cuando se envia el correo
function enviarEmail(e) {
  //Spiner al  presionar enviar
  const spinerGIF = document.querySelector("#spinner");
  spinerGIF.style.display = "block";

  //GIF que envia email
  const enviado = document.createElement("img");
  enviado.src = "/email/img/mail.gif";
  enviado.style.display = "block";

  //Ocultar Spinner y mostrar el GIF enviado
  setTimeout(function () {
    spinerGIF.style.display = "none";
    document.querySelector("#loaders").appendChild(enviado);
    setTimeout(function () {
      setTimeout(function () {
        enviado.remove();
        let texto = document.querySelector("#texto-emial");
        texto.innerHTML = "<h5> EMAIL ENVIADO</h5>";
        setTimeout(function () {
          texto.remove();
          formularioEnviar.reset();
        }, 2000);
      }, 2000);
    }, 300);
  }, 3000);
  e.preventDefault();
}

//Verifica la longitud del texto en los campos
function validarLogitud(campo) {
  console.log(campo.value.length);
  if (campo.value.length > 0) {
    campo.style.borderBottomColor = "green";
    campo.classList.remove("error");
  } else {
    campo.style.borderBottomColor = "red";
    campo.classList.add("error");
  }
}

function validarEmail(email) {
  const mensaje = email.value;
  if (mensaje.indexOf("@") !== -1) {
    email.style.borderBottomColor = "green";
    email.classList.remove("error");
  } else {
    email.style.borderBottomColor = "red";
    email.classList.add("error");
  }
}
