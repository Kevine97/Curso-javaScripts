//Generando el año actual
const max = new Date().getFullYear();
const min = max - 20;

//Generando los años en el select
const selectAnio = document.getElementById("anio");

//Recorriendo el for e imprimiendo cada año en el select
for (let i = max; i >= min; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  selectAnio.appendChild(option);
}

//Constructor para seguro
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  /*
        1 Americano = 1.15
        2 Asiatico = 1.05
        3 Europeo = 1.35

    */

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
  }

  //leer año
  const diferencia = new Date().getFullYear() - this.anio;

  //Cada año de diferencia hey que reducir 3% el valor del seguro
  cantidad -= diferencia * 0.03 * cantidad;

  /*
        Si el seguro es basico se multiplica por 30% mas
        si el seguro es completo se multiplica por 50% mas
   */
  if (this.tipo === "basico") {
    cantidad += cantidad * 0.3;
  } else {
    cantidad += cantidad * 0.5;
  }

  return cantidad;
};

//Constructor UX
function UX() {}

//Mensaje que se muestra en el HTML
UX.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }
  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector(".form-group"));

  setTimeout(function () {
    document.querySelector(".mensaje").remove();
  }, 4000);
};

//Imprime el resultado de la cotizacion
UX.prototype.mostrarResultado = function (seguro, cantidad) {
  const resultado = document.getElementById("resultado");
  let marca;

  switch (seguro.marca) {
    case "1":
      marca = "Americano";
      break;
    case "2":
      marca = "Asiatico";
      break;
    case "3":
      marca = "Europeo";
      break;
  }

  //Crear div

  const div = document.createElement("div");
  div.innerHTML = `
       <p class="header">TU RESUMEN</p>
       <p>Marca = ${marca}</p>
       <p>Año = ${seguro.anio}</p>
       <p>Tipo de Seguro = ${seguro.tipo}</p>
       <p>Total = $ ${cantidad}</p>
    `;

  const spiner = document.querySelector("#cargando img");
  spiner.style.display = "block";
  setTimeout(function () {
    spiner.style.display = "none";
    //spiner.remove();
    resultado.appendChild(div);
  }, 4000);
};

//evenlistener

const formulario = document.getElementById("cotizar-seguro");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  //Leer la marca seleccionada
  const marca = document.getElementById("marca");
  const maracSeleccionada = marca.options[marca.selectedIndex].value;

  //Leer el año seleccionado
  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  //leer los radios buton
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  //objeto ux
  const ux = new UX();

  //Comprobar que los campo no esten vacios

  if (maracSeleccionada === "" || anioSeleccionado === "" || tipo === "") {
    ux.mostrarMensaje("¡ATENCION! Falta datos, revise los campos.", "error");
  } else {
    //Limpiar resultado anteriores

    const resultados = document.querySelector("#resultado div");

    if (resultados != null) {
      resultados.remove();
    }

    const seguro = new Seguro(maracSeleccionada, anioSeleccionado, tipo);
    //Cotizar el segruo
    const cantidad = seguro.cotizarSeguro();

    //Mostrar el resultaado
    ux.mostrarResultado(seguro, cantidad);
    ux.mostrarMensaje("Cotizando ...", "Exito");
  }
});
