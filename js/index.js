//Web Semantica
var info = generarJsonLDIndex();
loadJSON_LD(info);


/**
 * Funció per afegir el JSON-LD a la pàgina web
 */

function loadJSON_LD(info) {
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(info);
  document.head.appendChild(script);
}

var numSuper = 0, numRest = 0, numCursos = 0, numInfo = 0, numFires=0;
var dades = [];

cargarDades();

function cargarDades() {
  var xmlhttp = new XMLHttpRequest();
  var url = "dades.json"
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      dades = JSON.parse(xmlhttp.responseText);
      for (var i = 0; i < dades.length; i++) {
        switch (dades[i].tipus) {
          case 'supermercat':
            numSuper++;
            break;
          case 'restaurant':
            numRest++;
            break;
          case 'curs':
            numCursos++;
            break;
          case 'info':
            numInfo++;
            break;
        }
      }
      contadorFires();
    }   
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function contadorFires() {
  var xmlhttp3 = new XMLHttpRequest();
  var url3 = "https://fires-mallorca.netlify.app/jsonBase_1.json";
  xmlhttp3.onreadystatechange = function () {
      if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
        dadesExt2 = JSON.parse(xmlhttp3.responseText);
        for (var j = 0; j < dadesExt2.length; j++) {
          if ("Vegeteriana" == dadesExt2[j].tipus) {
            numFires++;
            dadesExt2[j].tipus = "fira";
            dades.push(dadesExt2[j]);
          }
        }
        contadorBars();
      }
  };
  xmlhttp3.open("GET", url3, true);
  xmlhttp3.send();
}

function contadorBars(){
  var xmlhttp2 = new XMLHttpRequest();
  var url2 = "https://bares-mallorca.netlify.app/data.json";
  xmlhttp2.onreadystatechange = function () {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
      var dadesExt = JSON.parse(xmlhttp2.responseText);
      for (var j = 0; j < dadesExt.length; j++) {
        if ("vegetariano" == dadesExt[j].tipus) {
            numRest++;
            dadesExt[j].tipus = "restaurant";
            dades.push(dadesExt[j]);
        }
      }
      grafica();

      punteros();
    }
  };
  xmlhttp2.open("GET", url2, true);
  xmlhttp2.send();
}


function grafica(){
  let myChart = document.getElementById('myChart')
  let elements = new Chart(myChart, {
    type: 'horizontalBar', // o bar
    data: {
      labels: ["Restaurants", "Supermercats", "Info", "Cursos", "Fires" ],
      datasets: [{
        axis: 'y',
        data: [
            numRest,numSuper, numInfo,numCursos, numFires
        ],
        fill: false,
        backgroundColor:[
          'rgba(159, 209, 201, 0.2)',
          'rgba(184, 205, 101, 0.2)',
          'rgba(243, 176, 78, 0.2)',
          'rgba(233, 149, 101, 0.2)',
          'rgba(167, 124, 222, 0.2)'],
        borderColor: [
          'rgb(159, 209, 201)',
          'rgb(184, 205, 101)',
          'rgb(243, 176, 78)',
          'rgb(233, 149, 101)',
          'rgba(167, 124, 222)'
        ],
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
            // OR //
            beginAtZero: true   // minimum value will be 0.
          }
        }]
      },
      legend: {
        display: false
      },
    }
  });
}

//crea el jsonld para el indice
function generarJsonLDIndex() {
  let info = {
    "@context": "http://schema.org/",
    "@type": "WebApplication",
    "applicationCategory": "Restaurantes Vegetarianos Mallorca, Supermercados Vegetarianos Mallorca, Información Vegetarianos Mallorca",
    "applicationSubCategory": "Cursos, Ferias",
    "about": "Información vegetariana Mallorca",
    "name": "Veggie Mallorca",
    "description": "MENJAR BÉ TOTS ELS DIES ÉS MÉS SENZILL DEL QUE ET PENSES. Descobreix les meravelles que ofereix el món vegetarià: troba aquí tota la inspiració necessària i troba una nova forma de cuidar-te.",
    "audience": {
      "@type": "Audience",
      "audienceType": "familia, turistas, locales, grupos, amigos",
      "geographicArea": "Mallorca"
    },
    "author": [
      {
        "@type": "Person",
        "givenName": "Aisha",
        "familyName": "Gandarova",
        "gender": "Female",
      },
      {
        "@type": "Person",
        "givenName": "Maria",
        "familyName": "Orell",
        "gender": "Female",
      }
    ],
    "contentLocation":
    {
      "address": "Mallorca, Islas Baleares, Spain",
      "geo":
      {
        "@type": "GeoCoordinates",
        "latitude": "39.69988587628037",
        "longitude": "3.016459872869967"
      }
    },

    "genre": "Restaurants Vegetarians Mallorca, Supermercats Vegetarians Mallorca",
    "operatingSystem": "Windows, MacOS, iOS, Android, Linux",
    "video":
    {
      "@type": "VideoObject",
      "name": "Vídeo Cocina",
      "description": "Video de cocina vegetariana Mallorca",
      "contentUrl": ["assets/img/fotosIndex/videoPortada.mp4", "assets/img/fotosIndex/videoPortada.webm"],
      "uploadDate": "2021-05-15",
      "thumbnailUrl": ["assets/img/fotosIndex/videoPortada.mp4", "assets/img/fotosIndex/videoPortada.webm"],
    }
  }
  return info;
}

  //Get the button
  var mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
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

  // Animación con scroll:

  // Detect request animation frame
  var scroll = window.requestAnimationFrame ||
    // IE Fallback
    function (callback) { window.setTimeout(callback, 1000 / 60) };
  var elementsToShow = document.querySelectorAll('.show-on-scroll');

  function loop() {

    Array.prototype.forEach.call(elementsToShow, function (element) {
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });

    scroll(loop);
  }

  // Call the loop for the first time
  loop();

  // Helper function from: http://stackoverflow.com/a/7557433/274826
  function isElementInViewport(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];

    }
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0
        && rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }

  /* MAPA */
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXNob29rMDA3IiwiYSI6ImNrbnZ4bGg3bzByMTcydnFucWdpcGx6bWEifQ.jHKo86UYDX6fcEVz_VoHZQ';
  var map = new mapboxgl.Map({
    container: 'mapidGran', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [2.942477242579887, 39.63623814828035], // starting position [lng, lat]
    zoom: 8.8 // starting zoom
  });
  map.touchZoomRotate.enable();
  map.on('idle', function () {
    map.resize()
  });
  map.scrollZoom.disable();
  map.addControl(new mapboxgl.NavigationControl());
  // Add geolocate control to the map.
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
  );


  function punteros() {
    dades.forEach(function (marker) { // marker = datos[i]
      // add markers to map
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker-' + marker.tipus;

      var address, long,lat;
      // make a marker for each feature and add to the map
      if (marker.tipus=="fira"){
        address = marker.geoposicionament1.address;
        long = marker.geoposicionament1.long
        lat =marker.geoposicionament1.lat
      }else{
        address = marker.geo1.address;
        long = marker.geo1.long
        lat =marker.geo1.lat
      }
      new mapboxgl.Marker(el)
        .setLngLat([long, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              '<h4>' +
              marker.nom +
              '</h4><p>' +
              address +
              '</p>' +
              '<div class="image-cropper-rectangle"> <img class="img-fluid" src="' + marker.imatges[0] + '"/> </div>' //style="height: 150px;"
            )
        )
        .addTo(map);
    });
}
