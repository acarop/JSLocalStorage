// Variables
// Paso 1
const listaTweets = document.getElementById('lista-tweets'); 




// Event Listeners
enventsListeners();




function enventsListeners(){
    // 2 Cuando se envía el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    // Borrar tweets
    listaTweets.addEventListener('click',borrarTweet);

    // Contenido cargado (mostrar el contenido de local storage)
    document.addEventListener('DOMContentLoaded', localStorageListo);

}


// Funciones

// 3 Añadir tweet del formulario

function agregarTweet(e){
    e.preventDefault();

    // 4 leer el valor del text area
    const tweet = document.getElementById('tweet').value;
    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList  = 'borrar-tweet';
    botonBorrar.textContent = 'X';


    
    // 5 Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // Agrego el boton borrar al enlace
    li.appendChild(botonBorrar)
    // Agrego el tweet a la lista
    listaTweets.appendChild(li);

    // Añadir a local storage
    agregarTweetLocalStorage(tweet);
}

// Elimina el tweet del DOM
function borrarTweet(e){
    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent);
      
    }
}

// Mostrar datos de local storage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        // crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList  = 'borrar-tweet';
        botonBorrar.textContent = 'X';


        
        // 5 Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // Agrego el boton borrar al enlace
        li.appendChild(botonBorrar)
        // Agrego el tweet a la lista
        listaTweets.appendChild(li);
    });
    
}

// Agrega tweet a local storage
function agregarTweetLocalStorage(tweet){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    // Añadir el nuevo tweet
    tweets.push(tweet);

    // Convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

// Se encarga de comprobar que haya elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;

    // revisamos los valores de local storage
    if(localStorage.getItem('tweets') ==null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;

    // Elimina la x del tweet 
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}