//console.log('correcto');

//document.querySelector('#portfolioModal1').addEventListener('click',mostrarRestaurants)
//mostrarRestaurants();

//función que trae los datos cuando se pulsa el boton
/*
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
*/
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
  

  function Cercador() {
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var datos = JSON.parse(xmlhttp.responseText);
        addElement(datos);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  
  }


function addElement (datos) {
//filtrar para distinguir entre restaurantes o supermercados
    var urlweb = location.search //agafa la url on hem clicat a partir de l'? inclòs
    var id = urlweb.replace("?","")
    if(id == "restaurant"){
        $("#titolPortfoli").append("Restaurants")
        $("#descPortfoli").append("Aquí trobàs la millor secció de restaurants que tenen opcions veganes o vegetarianes.")
    } else {
        $("#titolPortfoli").append("Supermercats")
        $("#descPortfoli").append("Selecció de supermercats i petits comerços que ofereixen productes ecològics.")
    }
    for (var i = 0; i <datos.length; i++){

        if(datos[i].tipus == id){ //id = "restaurant o sueprmercats"
            var newDiv = document.createElement("div");   // crea un nuevo div
            newDiv.setAttribute('class', "col-lg-4 col-sm-6 mb-4")

            var newDiv1 = document.createElement("div");   // crea un nuevo div
            newDiv1.setAttribute('class', "portfolio-item")
            newDiv.appendChild(newDiv1); //añade texto al div creado.

            var newa1 = document.createElement("a");
            newa1.setAttribute('onclick', "desplegable("+i+")");
            newa1.setAttribute('class', "portfolio-link");
            newa1.setAttribute('data-toggle', "modal");
            newa1.setAttribute('href', "#portfolioModal"+i);

            newDiv1.appendChild(newa1); //añade texto al div creado.
        
            var newDiv2 = document.createElement("div");   // crea un nuevo div
            newDiv2.setAttribute('class', "portfolio-hover")

            newa1.appendChild(newDiv2);

            var newDiv3 = document.createElement("div");   // crea un nuevo div
            newDiv3.setAttribute('class', "portfolio-hover-content")

            newDiv2.appendChild(newDiv3);

            var newi = document.createElement("i");   // crea un nuevo div
            newi.setAttribute('class', "fas fa-plus fa-3x")

            newDiv3.appendChild(newi);
            
            var newimg = document.createElement("img");   // crea un nuevo div
            newimg.setAttribute('class', "img-fluid")
            newimg.setAttribute('src', datos[i].imatges[0])
            newimg.setAttribute('alt', "")

            newa1.appendChild(newimg);   
            
            var newDiv2 = document.createElement("div");   // crea un nuevo div
            newDiv2.setAttribute('class', "portfolio-hover")

            newa1.appendChild(newDiv2);
            //

            var newDiv3 = document.createElement("div");   // crea un nuevo div
            newDiv2.setAttribute('class', "portfolio-caption")

            newDiv1.appendChild(newDiv3);

            var newDiv4 = document.createElement("div");   // crea un nuevo div
            newDiv4.setAttribute('class', "portfolio-caption-heading")
            var newContent = document.createTextNode(datos[i].nom); //nom Rest
            newDiv4.appendChild(newContent)

            newDiv3.appendChild(newDiv4);

            var newDiv5 = document.createElement("div");   // crea un nuevo div
            newDiv5.setAttribute('class', "portfolio-caption-subheading text-muted")
            var newContent2 = document.createTextNode(datos[i].geo1.address); //geo Rest
            newDiv5.appendChild(newContent2)
            newDiv3.appendChild(newDiv5);

            // añade el elemento creado y su contenido al DOM
            $("#restaurant1").append(newDiv);
        }
    }
}

// función para extraer datos de restaurantes
   
function hacerMapa(x) {
    //********andrea me ha dicho q ellas cargan el json una vez solo cuando se carga la pagina
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
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
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);
            
           
            var pointer = document.createElement('div');
            pointer.className = 'marker';
            
            var marker = new mapboxgl.Marker()
            .setLngLat([datos[x].geo1.long, datos[x].geo1.lat])
            .setPopup(
                new mapboxgl.Popup({offset: 25})
                .setHTML(
                    '<h3>' +
                    datos[x].nom +
                    '</h3><p>' +
                    datos[x].geo1.address +
                    '</p>'
                    )
                )
            .addTo(map);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
/*
    <!-- Modal 1-->
  0      <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
  1          <div class="modal-dialog">
  2              <div class="modal-content">                
   4                  <div class="container">    
    7                    <div class="row justify-content-center">
  
                        </div>


     14                   <div class="row justify-content-center">
     15                       <div class="modal-body">
      16                          <p id="descripcio1"></p>
                                  <ul class="list-inline">
                                    <li>
                                        <!-- puntuació estrelles -->
                                        <form></form>
                                        <p class="clasificacion">
                                            <input id="radio1" type="radio" name="estrellas" value="5">
                                            <!--
                                        --><label for="radio1">★</label>
                                            <!--
                                        --><input id="radio2" type="radio" name="estrellas" value="4">
                                            <!--
                                        --><label for="radio2">★</label>
                                            <!--
                                        --><input id="radio3" type="radio" name="estrellas" value="3">
                                            <!--
                                        --><label for="radio3">★</label>
                                            <!--
                                        --><input id="radio4" type="radio" name="estrellas" value="2">
                                            <!--
                                        --><label for="radio4">★</label>
                                            <!--
                                        --><input id="radio5" type="radio" name="estrellas" value="1">
                                            <!--
                                        --><label for="radio5">★</label>
                                        </p>
                                        </form>
                                    </li>
                                    <li id="horariRest1">Dilluns-Dissabte: 13:00h - 16:00h</li>
                                    <li id="geoposRest1">Carrer Comte de Barcelona, 26</li>
                                    <li id="telRest1">971 28 25 62</li>
                                    <li id="paginawebRest1">www.webRestaurant.com</li>
                                </ul>
                                <button class="btn btn-primary" data-dismiss="modal" type="button">
                                    <i class="fas fa-times mr-1"></i>
                                    Tanca
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
}
*/



function desplegable(i) {
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);
            var newDiv = document.createElement("div");   // crea un nuevo div
            newDiv.setAttribute('class', "portfolio-modal modal fade")
            newDiv.setAttribute('id', "portfolioModal" +i)
            newDiv.setAttribute('tabindex', "-1")
            newDiv.setAttribute('role', "dialog")
            newDiv.setAttribute('aria-hidden', "true")
            
            var newDiv1 = document.createElement("div");   // crea un nuevo div
            newDiv1.setAttribute('class', "modal-dialog")
            newDiv.appendChild(newDiv1); //añade texto al div creado.

            var newDiv2 = document.createElement("div");   // crea un nuevo div
            newDiv2.setAttribute('class', "modal-content")
            newDiv1.appendChild(newDiv2); //añade texto al div creado.

            var newDiv3 = document.createElement("div");   // crea un nuevo div
            newDiv3.setAttribute('class', "close-modal")
            newDiv3.setAttribute('data-dismiss', "modal")
            newDiv2.appendChild(newDiv3); //añade texto al div creado.

            var newImg = document.createElement("img");   // crea un nuevo div
            newImg.setAttribute('src', "assets/img/close-icon.svg")
            newImg.setAttribute('alt', "Close modal")
            newDiv3.appendChild(newImg); //añade texto al div creado.

            var newDiv4 = document.createElement("div");   // crea un nuevo div
            newDiv4.setAttribute('class', "container")
            newDiv2.appendChild(newDiv4); //añade texto al div creado.

            var newDiv5 = document.createElement("div");   // crea un nuevo div
            newDiv5.setAttribute('class', "row justify-content-center")
            newDiv4.appendChild(newDiv5); //añade texto al div creado.

            var newDiv6 = document.createElement("div");   // crea un nuevo div
            newDiv6.setAttribute('class', "modal-body")
            newDiv5.appendChild(newDiv6); //añade texto al div creado.

            var newH2 = document.createElement("h2");   // crea un nuevo div
            newH2.setAttribute('class', "portfolio-caption-heading")
            newH2.setAttribute('id', "nomElement")
            newDiv6.appendChild(newH2); //añade texto al div creado.
            

            var newP = document.createElement("p");   // crea un nuevo div
            newP.setAttribute('class', "item-intro text-mutedg")
            newP.setAttribute('id', "descripcioElement")
            newDiv6.appendChild(newP); //añade texto al div creado.

            var newDiv7 = document.createElement("div");   // crea un nuevo div
            newDiv7.setAttribute('class', "row justify-content-center")
            newDiv4.appendChild(newDiv7); //añade texto al div creado.

            var newDiv8 = document.createElement("div");   // crea un nuevo div
            newDiv8.setAttribute('class', "col-lg-6")
            newDiv7.appendChild(newDiv8); //añade texto al div creado.

            var newDiv9 = document.createElement("div");   // crea un nuevo div
            newDiv9.setAttribute('class', "carousel slide")
            newDiv9.setAttribute('id', "myCarousel")
            newDiv9.setAttribute('data-ride', "carousel")
            newDiv8.appendChild(newDiv9); //añade texto al div creado.

            var newOl = document.createElement("ol");   // crea un nuevo div
            newOl.setAttribute('class', "carousel-indicators")
            newDiv9.appendChild(newOl); //añade texto al div creado.

            for (var k=0; k<datos[i].imatges.length; k++){
                var newLiK = document.createElement("li");   // crea un nuevo div
                if (k==0){
                    newLiK.setAttribute('class', "active")
                }
                newLiK.setAttribute('data-target', "#myCarousel")
                newLiK.setAttribute('data-slide-to', k)
                newOl.appendChild(newLiK); //añade texto al div creado.
            }

            var newDiv10 = document.createElement("div");   // crea un nuevo div
            newDiv10.setAttribute('class', "carousel-inner")
            newDiv9.appendChild(newDiv10); //añade texto al div creado.

            var newDiv11 = document.createElement("div");   // crea un nuevo div
            newDiv11.setAttribute('class', "carousel-item active")
            newDiv10.appendChild(newDiv11); //añade texto al div creado.

            var newImg1 = document.createElement("img");   // crea un nuevo div
            newImg1.setAttribute('class',  "0-slide")
            newImg1.setAttribute('src', datos[i].imatges[0])
            newImg1.setAttribute('alt', "0-slide")
            newImg1.setAttribute('style', "object-fit:scale-down; width:500px; height:300px")
            newDiv11.appendChild(newImg1); //añade texto al div creado.

            for (var k=1; k<datos[i].imatges.length; k++){
                var newDivK = document.createElement("div");   // crea un nuevo div
                newDivK.setAttribute('class', "carousel-item")
                newDiv10.appendChild(newDivK); //añade texto al div creado.

                var newImgK = document.createElement("img");   // crea un nuevo div
                newImgK.setAttribute('class', k + "-slide")
                newImgK.setAttribute('src', datos[i].imatges[k])
                newImgK.setAttribute('alt', k + "-slide")
                newImgK.setAttribute('style', "object-fit:scale-down; width:500px; height:300px")
                newDivK.appendChild(newImgK); //añade texto al div creado.
            }
            
            var newA = document.createElement("a");   // crea un nuevo div
            newA.setAttribute('class',  "carousel-control-prev")
            newA.setAttribute('href', "#myCarousel")
            newA.setAttribute('role', "button")
            newA.setAttribute('data-slide', "data-slide")
            newDiv9.appendChild(newA); //añade texto al div creado.
            
            var newSpan = document.createElement("span");   // crea un nuevo div
            newSpan.setAttribute('class',  "carousel-control-prev-icon")
            newSpan.setAttribute('aria-hidden', "true")
            newA.appendChild(newSpan); //añade texto al div creado.

            var newSpan1 = document.createElement("span");   // crea un nuevo div
            newSpan1.setAttribute('class',  "sr-only")
            newSpan1.setAttribute('id',  "num1-slide")
            $("#num1-slide").append("Previous")
            newA.appendChild(newSpan1); //añade texto al div creado.


            var newA1 = document.createElement("a");   // crea un nuevo div
            newA1.setAttribute('class',  "carousel-control-next")
            newA1.setAttribute('href', "#myCarousel")
            newA1.setAttribute('role', "button")
            newA1.setAttribute('data-slide', "next")
            newDiv9.appendChild(newA1); //añade texto al div creado.
            
            var newSpan2 = document.createElement("span");   // crea un nuevo div
            newSpan2.setAttribute('class',  "carousel-control-next-icon")
            newSpan2.setAttribute('aria-hidden', "true")
            newA1.appendChild(newSpan2); //añade texto al div creado.

            var newSpan3 = document.createElement("span");   // crea un nuevo div
            newSpan3.setAttribute('class',  "sr-only")
            newSpan3.setAttribute('id',  "num2-slide")
            $("#num2-slide").append("Next")
            newA1.appendChild(newSpan3); //añade texto al div creado.

            var newDiv12 = document.createElement("div");   // crea un nuevo div
            newDiv12.setAttribute('class', "col-lg-6")
            newDiv7.appendChild(newDiv12); //añade texto al div creado.

            var newDiv13 = document.createElement("div");   // crea un nuevo div
            newDiv13.setAttribute('id', "map")
            newDiv12.appendChild(newDiv13); //añade texto al div creado.
                    

            // horario + info :
            var newUl = document.createElement("ul");   // crea un nuevo ul
            newUl.setAttribute('class', "list-inline")
            newDiv7.appendChild(newUl); //añade texto al div creado.

            var newLi1 = document.createElement("li");   // crea un nuevo ul
            newLi1.setAttribute('id', "horariElem")
            newUl.appendChild(newLi1); //añade texto al div creado.

            var newLi2 = document.createElement("li");   // crea un nuevo ul
            newLi2.setAttribute('id', "geoposElem")
            newUl.appendChild(newLi2); //añade texto al div creado.

            var newLi3 = document.createElement("li");   // crea un nuevo ul
            newLi3.setAttribute('id', "telElem")
            newUl.appendChild(newLi3); //añade texto al div creado.

            var newLi4 = document.createElement("li");   // crea un nuevo ul
            newLi4.setAttribute('id', "paginawebElem")
            newUl.appendChild(newLi4); //añade texto al div creado.


            $("#nomElement").append(datos[i].nom)
            $("#descripcioElement").append(datos[i].descripcio)
            $("#horariElem").append(
                `
                <h3>Horari:</h3>
                <p>Dilluns: ${datos[i].horari.di[0].in}-${datos[i].horari.di[0].out}</p>
                <p>Dimarts: ${datos[i].horari.dm[0].in}-${datos[i].horari.dm[0].out}</p>
                <p>Dimecres: ${datos[i].horari.dx[0].in}-${datos[i].horari.dx[0].out}</p>
                <p>Dijous: ${datos[i].horari.dj[0].in}-${datos[i].horari.dj[0].out}</p>
                <p>Divendres: ${datos[i].horari.dv[0].in}-${datos[i].horari.dv[0].out}</p>
                <p>Dissabte: ${datos[i].horari.ds[0].in}-${datos[i].horari.ds[0].out}</p>
                <p>Diumenge: ${datos[i].horari.dg[0].in}-${datos[i].horari.dg[0].out}</p>
            `
            )
            $("#geoposElem").append(datos[i].geo1.address)
            $("#telElem").append(datos[i].contacte.telf)
            $("#paginawebElem").append(datos[i].contacte.xarxes.web)

            $("#paginaAux").append(newDiv);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// función para extraer datos de supermercados

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