
let villeChoisie;

if("geolocation" in navigator) {
  navigator.geolocation.watchPosition((position) => {
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='
        + position.coords.latitude + '&lon='
        + position.coords.longitude + '&appid=1881a0c7d3f50ffe9d450c2b9c3f024d&units=metric';
    
    let requete = new XMLHttpRequest(); // Création d'un objet qui permettra de faire des requêtes
    requete.open('GET', url); //Récupératin des données uniquement
    requete.responseType = 'json'; // Nous attendons du JSON
    requete.send(); // Nous envoyons notre requête

    // Dès qu'on reçoit une réponse, cette fonction est executée
    requete.onload = function() {
      if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
          let reponse = requete.response;
          // console.log(reponse);
          let temperature = reponse.main.temp;
          let ville       = reponse.name;
          // console.log(temperature);
          document.querySelector('#temperature_label').textContent = Math.round(temperature);
          document.querySelector('#ville').textContent = ville;

          // date 
          let now = new Date();
          let options = {weekday:'long'};

          let year  = now.getFullYear();
          let month = now.getMonth() + 1;
          let day   = now.getDate();
          let date  = (day+"/"+month+"/"+year);

          let dayString = now.toLocaleDateString("en-US", options);

          document.querySelector('#date').textContent = date;
          document.querySelector('#day').textContent = dayString;

          if(temperature <= 10)
          {
            document.querySelector("#image").innerHTML = '<img src="images/cold.png">';
            document.querySelector(".container").style.background= "linear-gradient(#2c8eb8, #364d5d)";
          }
          else if(temperature > 10 && temperature <= 20)
          {
            document.querySelector("#image").innerHTML = '<img src="images/cloud.png">';
            document.querySelector(".container").style.background= "linear-gradient(#2c8eb8, #85c2e1)";
          }
          else if( temperature > 20 && temperature < 30)
          {
            document.querySelector("#image").innerHTML = '<img src="images/sun.png">';
            document.querySelector(".container").style.background= "linear-gradient(#eec93c, #fec055)";
          }
          else
          {
            document.querySelector("#image").innerHTML = '<img src="images/hot.png">';
            document.querySelector(".container").style.background= "linear-gradient(#f79a2a, #f7672a)";
          }
        }
        else {
          alert('Un problème est intervenu, merci de revenir plus tard.');
        }
      }
    }
  }, erreur, options);
  
  var options = {
    enableHighAccuracy: true
  }
}
else {
  villeChoisie = "tunis";
  recevoirTemperature(villeChoisie);
}

let changerDeVille = document.querySelector('#changer');
changerDeVille.addEventListener('click', () => {
  villeChoisie = prompt('Choose a city');
  recevoirTemperature(villeChoisie);
});

function erreur() {
  villeChoisie = "tunis";
  recevoirTemperature(villeChoisie);
}


// without geolocalisation

function recevoirTemperature(ville) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=1881a0c7d3f50ffe9d450c2b9c3f024d&units=metric';

  let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
  requete.open('GET', url); // Nous récupérons juste des données
  requete.responseType = 'json'; // Nous attendons du JSON
  requete.send(); // Nous envoyons notre requête

  // Dès qu'on reçoit une réponse, cette fonction est executée
  requete.onload = function() {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        // console.log(reponse);
        let temperature = reponse.main.temp;
        let ville       = reponse.name;
        // console.log(temperature);
        document.querySelector('#temperature_label').textContent = Math.round(temperature);
        document.querySelector('#ville').textContent = ville;

        // date 
        let now = new Date();
        let options = {weekday:'long'};

        let year  = now.getFullYear();
        let month = now.getMonth() + 1;
        let day   = now.getDate();
        let date  = (day+"/"+month+"/"+year);

        let dayString = now.toLocaleDateString("en-US", options);

        document.querySelector('#date').textContent = date;
        document.querySelector('#day').textContent = dayString;

        if(temperature <= 10)
          {
            document.querySelector("#image").innerHTML = '<img src="images/cold.png">';
            document.querySelector(".container").style.background= "linear-gradient(#2c8eb8, #364d5d)";
          }
          else if(temperature > 10 && temperature <= 20)
          {
            document.querySelector("#image").innerHTML = '<img src="images/cloud.png">';
            document.querySelector(".container").style.background= "linear-gradient(#2c8eb8, #85c2e1)";
          }
          else if( temperature > 20 && temperature < 30)
          {
            document.querySelector("#image").innerHTML = '<img src="images/sun.png">';
            document.querySelector(".container").style.background= "linear-gradient(#eec93c, #fec055)";
          }
          else
          {
            document.querySelector("#image").innerHTML = '<img src="images/hot.png">';
            document.querySelector(".container").style.background= "linear-gradient(#f79a2a, #f7672a)";
          }
      }
      else {
        alert('Un problème est intervenu, merci de revenir plus tard.');
      }
    }
  }
}


