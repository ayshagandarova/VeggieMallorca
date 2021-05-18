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
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll'); 

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
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
console.log("holaa");
var marker;

var xmlhttp = new XMLHttpRequest();
var url = "dades.json"
 xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var datos = JSON.parse(xmlhttp.responseText);
    console.log(datos);
    for (var i=0; i<datos.length; i++){
      // Puntero:
      if (datos[i].geo1.long != ""){
        marker = new mapboxgl.Marker()
        .setLngLat([datos[i].geo1.long, datos[i].geo1.lat])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    '<h4>' +
                    datos[i].tipus +
                  '</h4><h4>'  +
                    datos[i].nom +
                    '</h4><p>' +
                    datos[i].geo1.address +
                    '</p>'+
                    '<img src="' + datos[i].imatges[0]+ '" style="height: 150px;"/>'
                    
                )
        )
        .addTo(map);
      }
    }
  }
}
xmlhttp.open("GET", url, true);
    xmlhttp.send();

