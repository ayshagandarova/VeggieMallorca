//console.log('correcto');

//document.querySelector('#portfolioModal1').addEventListener('click',mostrarRestaurants)
//mostrarRestaurants();

//función que trae los datos cuando se pulsa el boton

// mapa:
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNob29rMDA3IiwiYSI6ImNrbnZ4bGg3bzByMTcydnFucWdpcGx6bWEifQ.jHKo86UYDX6fcEVz_VoHZQ';

    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [2.651537069816233, 39.570644797011795],
    zoom: 13,
    });
    map.addControl(new mapboxgl.NavigationControl());
    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })  
    );

// Botón para subir arriba;

    //Get the button
    var mybutton = document.getElementById("myBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }
  
// función para extraer datos de restaurantes
   
function leerRestaurantes() {
    var xmlhttp = new XMLHttpRequest();
    var url = "Restaurants.json";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);
            
            //rest1
           // var nombreRestaurante = document.getElementById("nomRest1")
            //nombreRestaurante.innerHTML = datos[0].nom
            $("#nomRest1").append(datos[0].nom)
            var geo1 = document.getElementById("geoRest1")
            geo1.innerHTML = datos[0].geo1.address


            var pointer = document.createElement('div');
            pointer.className = 'marker';
            
            var marker = new mapboxgl.Marker()
            .setLngLat([datos[0].geo1.long, datos[0].geo1.lat])
            .setPopup(
                new mapboxgl.Popup({offset: 25})
                .setHTML(
                    '<h3>' +
                    datos[0].nom +
                    '</h3><p>' +
                    datos[0].geo1.address +
                    '</p>'
                    )
                )
            .addTo(map);

            //rest2
            var nombreRestaurante = document.getElementById("nomRest2")
            nombreRestaurante.innerHTML = datos[1].nom
            var geo1 = document.getElementById("geoRest2")
            geo1.innerHTML = datos[1].geo1.address
            //rest3
             var nombreRestaurante = document.getElementById("nomRest3")
             nombreRestaurante.innerHTML = datos[2].nom
             var geo1 = document.getElementById("geoRest3")
             geo1.innerHTML = datos[2].geo1.address
            //rest4
            var nombreRestaurante = document.getElementById("nomRest4")
            nombreRestaurante.innerHTML = datos[3].nom
            var geo1 = document.getElementById("geoRest4")
            geo1.innerHTML = datos[3].geo1.address
            
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// función para extraer datos de supermercados

function leerSupermercats() {
    var xmlhttp = new XMLHttpRequest();
    var url = "Supermercats.json";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);
            //super1
            var nombre = document.getElementById("nomSuper1")
            nombre.innerHTML = datos[0].nom
            var geo = document.getElementById("geoSuper1")
            geo.innerHTML = datos[0].geo1.address
            //super2
            var nombre = document.getElementById("nomSuper2")
            nombre.innerHTML = datos[1].nom
            var geo = document.getElementById("geoSuper2")
            geo.innerHTML = datos[1].geo1.address
            //super3
             var nombre = document.getElementById("nomSuper3")
             nombre.innerHTML = datos[2].nom
             var geo = document.getElementById("geoSuper3")
             geo.innerHTML = datos[2].geo1.address
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/*

// TWITTER ***
const Twit = require('twit');
const notifier = require('node-notifier');
const open = require('open');
const franc = require ('franc');

const apiKey = '0blFCwydwm7VV088tL852RcGL';
const apiSecretKey = '1flgnZZx1yoQcRwOD0KsS522E6Qtv6i3IxMieNqm7xMHgXo4MU';
//const bearerToken = AAAAAAAAAAAAAAAAAAAAAHZ%2FOwEAAAAAx4YsVYPWMA%2Bxgy9hz00qU%2F1H61M%3DoCS8coprls6FmieJblOIjMoR1eRz5kLx2jhSCGpm1wUWX22yrD;
const accessToken = '911228614380855297-92l1HsihKFewmKabBs7gM9QJEC1khd3';
const accessTokenSecret = 'q1zkDKB9QHC2GK95TRu3N7XxfWsrWNjsfa4Dptlp04YF9';

var T = new Twit({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
});

var params = {
    q: '#tesla since:2020-04-15',
    count: 2
}

(async () => {
    //get recent tweets
    T.get('search/tweets', params, gotData);
})


function gotData(err, data, response){
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++){
        console.log(tweets[i].text);
    }
}
/
function updateTweets(tweets) { 
    var tweetSelection = document.getElementById("tweets");

    for (var i = 0; i < tweets.length; i++) {
      tweet = tweets[i];
      var option = document.createElement("option");
      option.text = tweet.text;
      option.value = tweet.text.replace(""", "'");
      console.log("The option is: " + option);

      tweetSelection.options.add(option);
    }

    tweetsSelection.selectedIndex = 0;
  }
*/









/*
var map = L.map('mapid').setView([51.505, -0.09], 13);
'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Nombre <br> Calle')
    .openPopup();
/*
const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
let myMap = L.map('myMap').setView([39.583796, 2.623672], 15);

L.tileLayer(tilesProvider, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(myMap)
    
let marker = L.marker([39.583796, 2.623672]).addTo(myMap)//[39.5695, 2.65002]

marker.bindPopup("<b>Nombre Restaurante</b><br>Calle.").openPopup();
  
*/
/*
   const xhttp = new XMLHttpRequest()
    // el true indica que es asincrono, aqui importamos los datos 
    xhttp.open('GET', 'Restaurants.json', true)

    xhttp.send()
    xhttp.onreadystatechange = function(){
        
    let datos = JSON.parse(xhttp.responseText)


    if(this.readyState==4 && this.status==200){ //esto sale en otro video y parece que siempre es asi
        
        let geo1 = document.querySelector('#geoRest1')
        geo1.innerHTML = datos[0].geo1.address

        let nombreRestaurante = document.querySelector('#nomRest1')
        nombreRestaurante.innerHTML = datos[0].nom

        let geopos1 = document.querySelector('#geoposRest1')
        geopos1.innerHTML = datos[0].geo1.address

        let horari = document.querySelector('#horariRest1')
        horari.innerHTML += `
            <ul>
                <li>Horari:</li>
                <li>Dilluns: ${datos[0].horari.di[0].in}-${datos[0].horari.di[0].out}</li>
                <li>Dimarts: ${datos[0].horari.dm[0].in}-${datos[0].horari.dm[0].out}</li>
                <li>Dimecres: ${datos[0].horari.dx[0].in}-${datos[0].horari.dx[0].out}</li>
                <li>Dijous: ${datos[0].horari.dj[0].in}-${datos[0].horari.dj[0].out}</li>
                <li>Divendres: ${datos[0].horari.dv[0].in}-${datos[0].horari.dv[0].out}</li>
                <li>Dissabte: ${datos[0].horari.ds[0].in}-${datos[0].horari.ds[0].out}</li>
                <li>Diumenge: ${datos[0].horari.dg[0].in}-${datos[0].horari.dg[0].out}</li>
            </ul>
            `
        let descripcio = document.querySelector('#descripcioRest1')
        descripcio.innerHTML = datos[0].descripcio

        let telefono = document.querySelector('#telRest1')
        telefono.innerHTML = datos[0].contacte.telf

        

        let nomRestaurante = document.querySelector('#nombreRest1')
        nomRestaurante.innerHTML = datos[0].nom

        let pagweb = document.querySelector('#paginawebRest1')
        pagweb.innerHTML = datos[0].contacte.pagweb

        }
    }

/*
function mostrarRestaurants(){
    const xhttp = new XMLHttpRequest()
    // el true indica que es asincrono, aqui importamos los datos 
    xhttp.open('GET', 'Restaurants.json', true)

    xhttp.send()

    xhttp.onreadystatechange = function(){
        let datos = JSON.parse(xhttp.responseText)

        //tenemos todos los restaurantes

        if(this.readyState==4 && this.status==200){ //esto sale en otro video y parece que siempre es asi
            let restaurants = document.querySelector('#restaurants')
            restaurants.innerHTML = ''
            restaurants.innerHTML += `<div class="row">`
            for(let item of datos){
                
                /*
                restaurants.innerHTML += `
                    <div class="col-lg-4 col-sm-6 mb-4">
                        <div class="portfolio-item">
                            <a class="portfolio-link" data-toggle="modal" id="restaurant1" href="#portfolioModal1"> 
                            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src=${item.imatges[0]} alt="" />
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">${item.nom}</div>
                                <div class="portfolio-caption-subheading text-muted">${item.geo1.address}</div>
                            </div>
                        </div>
                    </div>  
                `
            }
            restaurants.innerHTML += `</div> `
        }
    }
}

/*

<a class="portfolio-link" data-toggle="modal" id="restaurants" href="#plantillaFlotante"> 


 <div class="portfolio-modal modal fade" id="plantillaFlotante" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="modal-body">
                        <h2 class="text-uppercase">${item.nom}</h2>
                        <!-- aquí poner lo que viene dentro de la página flotante -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
*/



    /*
            let carouselRestaurant = document.querySelector('#carouselRestaurant')

            for(let fotos in datos[1].imatges){
                carouselRestaurant += ``
                
            }
            respuesta.innerHTML += `
                    
                        <p>${item.nom}</p>
                        <p>${item.descripcio}</p>
                        <p>${item.tipus}</p>
                        <p>${item.puntuacio}</p>
                `*/