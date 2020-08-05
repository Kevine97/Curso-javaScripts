//Variables
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");

//Listenerur
cargarEvenlistener();
function cargarEvenlistener() {
  //Dispara cuando se presiona agregar carrito
  cursos.addEventListener("click", comprarCurso);

  //Cuando se elimina un curso en el carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar todos los cursos del carrito

  vaciarCarrito.addEventListener("click", vaciarCursos);

  //Mostrar el contenido del local Storage
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}
//Funciones
//Funcion que añade el curso al carrito
function comprarCurso(e) {
  e.preventDefault();
  //Delegation para agregar Carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    //Enviamos el curso seleccionado para tomar sus datos
    leerCurso(curso);
  }
}

//Lee los datos del curso
function leerCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
  };
  //Muestra el curso seleccionado en el carrito
  insertarCarrito(infoCurso);
}

function insertarCarrito(infocurso) {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>
      <img src="${infocurso.imagen}" width=100>
      </td>
      <td>
      ${infocurso.titulo}
      </td>
      <td>
      ${infocurso.precio}
      </td>
      <td>
      <a href="#" class="borrar-curso" data-id="${infocurso.id}">X</a>
      </td>
`;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(infocurso);
  alert("Curso agregado al carrito");
}

//Elimina el curso del carrito en el dom

function eliminarCurso(e) {
  e.preventDefault();
  let curso, cursoid;
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoid = curso.querySelector("a").getAttribute("data-id");
  }
  eliminarCursoLocalStorag(cursoid);
}

//Elimina los cursos del carrito en el dom
function vaciarCursos() {
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }

  vaciarLocalStorage();
  return false;
}

//Almacena curso en localStorage
function guardarCursoLocalStorage(infocurso) {
  let cursos;
  cursos = obetenerCursoLocalStorage();
  //el curso seleccionado se agrega al arreglo
  cursos.push(infocurso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
}

//Comprueba que haya elementos en el local storage
function obetenerCursoLocalStorage() {
  let cursoLS;

  //Comprovamos si hay datos en localStorage
  if (localStorage.getItem("cursos") === null) {
    cursoLS = [];
  } else {
    cursoLS = JSON.parse(localStorage.getItem("cursos"));
  }
  return cursoLS;
}

//Cargando contenido de local Storage

function leerLocalStorage() {
  let cursoLS;
  cursoLS = obetenerCursoLocalStorage();
  cursoLS.forEach(function (infocurso) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src="${infocurso.imagen}" width=100>
        </td>
        <td>
        ${infocurso.titulo}
        </td>
        <td>
        ${infocurso.precio}
        </td>
        <td>
        <a href="#" class="borrar-curso" data-id="${infocurso.id}">X</a>
        </td>
  `;
    listaCursos.appendChild(row);
  });
}

//Elimiina el curso de localStorage
function eliminarCursoLocalStorag(cursoid) {
  let cursosLS;
  //Obtenemos el arreglo del curso
  cursosLS = obetenerCursoLocalStorage();
  cursosLS.forEach(function (cursoLS, index) {
    if (cursoLS.id === cursoid) {
      cursosLS.splice(index, 1);
    }
  });
  localStorage.setItem("cursos", JSON.stringify(cursosLS));
}

//Elimina todos los cursos del local storage
function vaciarLocalStorage() {
  localStorage.clear();
}
