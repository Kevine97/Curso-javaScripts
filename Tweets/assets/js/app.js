//variables
const listaTweets = document.getElementById("lista-tweets");

//Event listeners

eventListeners();
function eventListeners() {
  //Cuando se envia al formulario
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  //Borrar Tweets
  listaTweets.addEventListener("click", borrarTweet);

  //Contenido cargado
  document.addEventListener("DOMContentLoaded", localStorageListo);
}
//Funcion que limpia el text area
function limpiar() {
  document.getElementById("tweet").value = "";
}
//Funciones

//Añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  //Leer el valor del text area
  const tweet = document.getElementById("tweet").value;
  //Crear boton de eliminar
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";
  //Crear elemento y añadirle el contenido a la lista
  const li = document.createElement("li");
  li.innerText = tweet;
  //añade el boton de borrar tweet
  li.appendChild(botonBorrar);
  //añade el boton a la lista
  listaTweets.appendChild(li);
  console.log(tweet);
  //Añadir al local Storage
  agregarTweetLocalStorage(tweet);
  limpiar();
}

//Funcion que borra un Tweet
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
    //  alert("Tweet Eliminado");
  }
}

//Eliminar el tweet de localStorage
function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;
  //Elimina la X del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);
  tweets = obtenerTweetLocalStorage();
  tweets.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  });
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetLocalStorage();
  //Añadir el nuevo Tweet
  tweets.push(tweet);
  //Convertir de String a Arreglo
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Comprueba que haya elementos en localStorage.
//Retorna un arreglo
function obtenerTweetLocalStorage() {
  let tweets;

  //Revisamos los valores del local Storage
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

//Mostrar datos de localStorage en la lista
function localStorageListo() {
  let tweets;

  tweets = obtenerTweetLocalStorage();
  tweets.forEach(function (tweet) {
    //Crear boton de eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";
    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement("li");
    li.innerText = tweet;
    //añade el boton de borrar tweet
    li.appendChild(botonBorrar);
    //añade el boton a la lista
    listaTweets.appendChild(li);
  });
}
