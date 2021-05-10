/* MAPA */
mapboxgl.accessToken = 'pk.eyJ1IjoiYXNob29rMDA3IiwiYSI6ImNrbnZ4bGg3bzByMTcydnFucWdpcGx6bWEifQ.jHKo86UYDX6fcEVz_VoHZQ';
var map = new mapboxgl.Map({
container: 'mapid', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [2.942477242579887, 39.63623814828035], // starting position [lng, lat]
zoom: 9 // starting zoom
});
map.on('idle',function(){
    map.resize()
});

map.addControl(new mapboxgl.NavigationControl());
    // Add geolocate control to the map.
    map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );
    
var marker;

// Tiempo 

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
 

/* BARRA BUSCADOR */

// si se pulsa enter reacciona igual que si clicas el botón de buscar:
var input = document.getElementById("myInput");
// añade listener si pulsas enter:
input.addEventListener('keyup', function(event) {
    if (event.keyCode  === 13) {
        event.preventDefault();
        document.getElementById("buscar").click();
    }
});

// coger el texto y imprimir los elementos en la consola que se corresponden a la busqueda 
function filtrar() {
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);
           // var galeria, divs, a
            var a, txtValue
            
            var filter = input.value.toUpperCase();
            galeria = document.getElementById("galeriaPortfoli")
            divs = galeria.getElementsByTagName("div");
            for (i = 0; i < datos.length; i++) {
                a = datos[i].nom
                if (a.toUpperCase().indexOf(filter) > -1) {
                    //aqui es donde habria q mostrarlo por pantalla y hacer el array de los datos q queremos mostrar
                    console.log(datos[i].nom + " y el tipo: " + datos[i].tipus);
                } 
            }
        }
    };
    xmlhttp.open("GET", url, true);
            xmlhttp.send();
}

/* BOTÓN DE SCROLL HACIA ARRIBA */
//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    console.log("hello")
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/* FILTRADO */
//Filtrar para diferenciar entre restaurants o supermercats
function Cercador(filtrado) {
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);
            var urlweb = location.search //agafa de la url on hem clicat a partir del '?' inclòs
            var id = urlweb.replace("?", "")
            $("#titolPortfoli").html("")
            $("#descPortfoli").html("")
            if (id == "restaurant") {
                $("#titolPortfoli").append("Restaurants")
                $("#descPortfoli").append("Aquí trobàs la millor secció de restaurants que tenen opcions veganes o vegetarianes.")
            } else {
                $("#titolPortfoli").append("Supermercats")
                $("#descPortfoli").append("Selecció de supermercats i petits comerços que ofereixen productes ecològics.")
            }
            addElement(datos, id, filtrado);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//Afegir elements al portfoli de restaurants o supermercats
function addElement(datos, id, filtrado) {
    var datosFiltrados = []
    if (filtrado == 0){ //predeterminado
        for (var i = 0; i < datos.length; i++){
            datosFiltrados.push(i)
        }
    }else if(filtrado == 1){ //Més valorades
        for (var i = 0; i < datos.length; i++) {
            var idPuntuacio = 0;
            var puntuacioAnterior = 0;
            //mira qué actividad és la siguiente con más puntuación
            for(var j = 0; j < datos.length; j++){
              if(datos[j].puntuacio >= puntuacioAnterior && !datosFiltrados.includes(j)){
                idPuntuacio = j;
                puntuacioAnterior = datos[j].puntuacio;
              }
            }
            datosFiltrados.push(idPuntuacio);
          }
    }else if(filtrado == 2){ //Preu ascendent
        for (var i = 0; i < datos.length; i++) {
            var idPreuA = 0;
            var preuAAnterior = 0;
            //mira qué actividad és la siguiente con más puntuación
            for(var j = 0; j < datos.length; j++){
              var preu = datos[j].preu.import;
              preu = preu.replace(" €", "");
              preu = parseFloat(preu); //Convierto el String a Int
              if(preu >= preuAAnterior && !datosFiltrados.includes(j)){
                idPreuA = j;
                preuAAnterior = preu;
              }
            }
            datosFiltrados.push(idPreuA);
          }
    }else if(filtrado == 3){ //Preu descreixent
        for (var i = 0; i < datos.length; i++) {
            var idPreuD = 0;
            var preuDAnterior = 1000;
            //mira qué actividad és la siguiente con más puntuación
            for(var j = 0; j < datos.length; j++){
              var preu = datos[j].preu.import;
              preu = preu.replace(" €", "");
              preu = parseFloat(preu); //Convierto el String a Int
              if(preu < preuDAnterior && !datosFiltrados.includes(j)){
                idPreuD = j;
                preuDAnterior = preu;
              }
            }
            datosFiltrados.push(idPreuD);
          }
    }
    $("#galeriaPortfoli").html("")
    for (var i = 0; i < datos.length; i++) {
        if (datos[datosFiltrados[i]].tipus == id) { //id = "restaurant o sueprmercats"
            var newDiv = document.createElement("div");   // crea un nuevo div
            newDiv.setAttribute('class', "col-lg-4 col-sm-6 mb-4") // definim atributs
            newDiv.setAttribute('id', "elemento-"+i)

            var newDiv1 = document.createElement("div");  
            newDiv1.setAttribute('class', "portfolio-item")
            newDiv.appendChild(newDiv1); //afegim node newDiv1 com a fill del pare newDiv

            var newa1 = document.createElement("a");
            newa1.setAttribute('class', "portfolio-link");
            newa1.setAttribute('data-toggle', "modal");
            newa1.setAttribute('data-target', "#myModal");
            newa1.setAttribute('onclick', "desplegable(" + i + ");");
            newDiv1.appendChild(newa1); 

            

            var newDiv2 = document.createElement("div");   
            newDiv2.setAttribute('class', "portfolio-hover")

            newa1.appendChild(newDiv2);

            var newDiv3 = document.createElement("div");   
            newDiv3.setAttribute('class', "portfolio-hover-content")

            newDiv2.appendChild(newDiv3);

            var newi = document.createElement("i");  
            newi.setAttribute('class', "fas fa-plus fa-3x")

            newDiv3.appendChild(newi);

            var newimg = document.createElement("img"); 
            newimg.setAttribute('class', "img-fluid")
            newimg.setAttribute('src', datos[datosFiltrados[i]].imatges[0])
            newimg.setAttribute('alt', "")

            newa1.appendChild(newimg);

            var newDiv4 = document.createElement("div");  
            newDiv4.setAttribute('class', "portfolio-caption")

            newDiv1.appendChild(newDiv4);

            var newDiv5 = document.createElement("div");   
            newDiv5.setAttribute('class', "portfolio-caption-heading")
            var newContent = document.createTextNode(datos[datosFiltrados[i]].nom); 
            newDiv5.appendChild(newContent)

            newDiv4.appendChild(newDiv5);

            var newDiv6 = document.createElement("div");   
            newDiv6.setAttribute('class', "portfolio-caption-subheading text-muted")
            var newContent2 = document.createTextNode(datos[datosFiltrados[i]].geo1.address); 
            newDiv6.appendChild(newContent2)
            newDiv4.appendChild(newDiv6);

            // añade el elemento creado y su contenido al DOM
            $("#galeriaPortfoli").append(newDiv);
        }
    }
}
/* Función para eliminar los datos del desplegable y que no aparezcan repetidos */
function eliminarDatosElemento(){
    $("#nombreDescripcioElement").html(""); //limpiar la seccion
    $("#carouselElement").html(""); 
    $("#horariElement").html(""); 
    $("#tiempoElemento").html(""); 
    $("#horarioDesplegable").html(""); 
    $("#horario").html(""); 
    $("#horariDll").html("")
    $("#horariDm").html("")
    $("#horariDx").html("")
    $("#horariDj").html("")
    $("#horariDv").html("")
    $("#horariDs").html("")
    $("#horariDg").html("")
    $("#contactoElemento").html(""); 
    if (marker != null){
        marker.remove();
    }
}

/* Función que rellena los datos de los desplegables */
function desplegable(i) {
    if ($("#nombreDescripcioElement").html() !== null){
        eliminarDatosElemento();
    }
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);

            
            var arrayHorario = ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"]
            var accesoHorario = ["di", "dm", "dx", "dj", "dv", "ds", "dg"]
        
            // Nombre y descripcion:
            var newTitulo = document.createElement("h2");    
            newTitulo.setAttribute('class', "portfolio-caption-heading")
            var texto1 = document.createTextNode(datos[i].nom);
            newTitulo.appendChild(texto1)
        
            $("#nombreDescripcioElement").append(newTitulo);
        
            var newDescripcio = document.createElement("p");   // Añade la descripción a la ventana emergente
            newDescripcio.setAttribute('class', "item-intro text-mutedg")
            var text2 = document.createTextNode(datos[i].descripcio); 
            newDescripcio.appendChild(text2)
            
            $("#nombreDescripcioElement").append(newDescripcio);

            // Puntero:
            marker = new mapboxgl.Marker()
                .setLngLat([datos[i].geo1.long, datos[i].geo1.lat])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 })
                        .setHTML(
                            '<h4>' +
                            datos[i].nom +
                            '</h4><p>' +
                            datos[i].geo1.address +
                            '</p>'
                        )
                )
                .addTo(map);

            // Carousel:
            var newCarousel1 = document.createElement("div");    
            newCarousel1.setAttribute('class', "carousel slide")
            newCarousel1.setAttribute('id', "myCarousel")
            newCarousel1.setAttribute('data-ride', "carousel")

            var newCarousel2 = document.createElement("ol");    
            newCarousel2.setAttribute('class', "carousel-indicators")
            newCarousel1.appendChild(newCarousel2);  

            for (var k = 0; k < datos[i].imatges.length; k++) {
                var newCarouselLiK = document.createElement("li");    
                if (k == 0) {
                    newCarouselLiK.setAttribute('class', "active")
                }
                newCarouselLiK.setAttribute('data-target', "#myCarousel")
                newCarouselLiK.setAttribute('data-slide-to', k)
                newCarousel2.appendChild(newCarouselLiK);  
            }

            var newCarousel3 = document.createElement("div");    
            newCarousel3.setAttribute('class', "carousel-inner")
            newCarousel1.appendChild(newCarousel3);  

            var newCarousel4 = document.createElement("div");    
            newCarousel4.setAttribute('class', "carousel-item active")
            newCarousel3.appendChild(newCarousel4);  

            var newCarouselImg1 = document.createElement("img");    
            newCarouselImg1.setAttribute('class', "0-slide")
            newCarouselImg1.setAttribute('src', datos[i].imatges[0])
            newCarouselImg1.setAttribute('alt', "0-slide")
            newCarouselImg1.setAttribute('style', "object-fit:scale-down; width:500px; height:300px")
            newCarousel4.appendChild(newCarouselImg1);  

            for (var k = 1; k < datos[i].imatges.length; k++) {
                var newCarouselK = document.createElement("div");    
                newCarouselK.setAttribute('class', "carousel-item")
                newCarousel3.appendChild(newCarouselK);  

                var newCarouselImgK = document.createElement("img");    
                newCarouselImgK.setAttribute('class', k + "-slide")
                newCarouselImgK.setAttribute('src', datos[i].imatges[k])
                newCarouselImgK.setAttribute('alt', k + "-slide")
                newCarouselImgK.setAttribute('style', "object-fit:scale-down; width:500px; height:300px")
                newCarouselK.appendChild(newCarouselImgK);  
            }

            var newCarouselA = document.createElement("a");    
            newCarouselA.setAttribute('class', "carousel-control-prev")
            newCarouselA.setAttribute('href', "#myCarousel")
            newCarouselA.setAttribute('role', "button")
            newCarouselA.setAttribute('data-slide', "prev")
            newCarousel1.appendChild(newCarouselA);  

            var newSpan = document.createElement("span");    
            newSpan.setAttribute('class', "carousel-control-prev-icon")
            newSpan.setAttribute('aria-hidden', "true")
            newCarouselA.appendChild(newSpan);  

            var newSpan1 = document.createElement("span");    
            newSpan1.setAttribute('class', "sr-only")
            newSpan1.setAttribute('id', "num1-slide")
            $("#num1-slide").append("Previous")
            newCarouselA.appendChild(newSpan1);  


            var newCarouselA1 = document.createElement("a");    
            newCarouselA1.setAttribute('class', "carousel-control-next")
            newCarouselA1.setAttribute('href', "#myCarousel")
            newCarouselA1.setAttribute('role', "button")
            newCarouselA1.setAttribute('data-slide', "next")
            newCarousel1.appendChild(newCarouselA1);  

            var newCarouselSpan2 = document.createElement("span");    
            newCarouselSpan2.setAttribute('class', "carousel-control-next-icon")
            newCarouselSpan2.setAttribute('aria-hidden', "true")
            newCarouselA1.appendChild(newCarouselSpan2);  

            var newCarouselSpan3 = document.createElement("span");    
            newCarouselSpan3.setAttribute('class', "sr-only")
            newCarouselSpan3.setAttribute('id', "num2-slide")
            $("#num2-slide").append("Next")
            newCarouselA1.appendChild(newCarouselSpan3);  

            $("#carouselElement").append(newCarousel1);

            // Disponibilidad horaria:
            var date = new Date();
            var d = date.getDay();
            var h = date.getHours();
            var m = date.getMinutes();
            var hora = h+":"+m;
            var disponibilidad;
            // Comprueba si en este momento está abierto el local
            switch (d){
                case 1:
                    if(hora>=datos[i].horari.di[0].in && hora <=datos[i].horari.di[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65"});
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565"});
                    }
                    break;
                case 2:
                    if(hora>=datos[i].horari.dm[0].in && hora <=datos[i].horari.dm[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65" });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565" });
                    }
                    break;
                case 3:
                    if(hora>=datos[i].horari.dx[0].in && hora <=datos[i].horari.dx[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65"});
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565"});
                    }
                    break;
                case 4:
                    if(hora>=datos[i].horari.dj[0].in && hora <=datos[i].horari.dj[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65"});
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565"});
                    }
                    break;
                case 5:
                    if(hora>=datos[i].horari.dv[0].in && hora <=datos[i].horari.dv[0].out){
                        disponibilidado = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65"});
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565"});
                    }
                    break;
                case 6:
                    if(hora>=datos[i].horari.ds[0].in && hora <=datos[i].horari.ds[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65" });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565"});
                    }
                    break;
                case 0:

                    if(hora>=datos[i].horari.dg[0].in && hora <=datos[i].horari.dg[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65" });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565" });
                    }
                    break;
            }

            // Crea el horario desplegable:
            var pDi = document.createElement("p");    
            var textDi = document.createTextNode("Dilluns: " + datos[i].horari.di[0].in +"-" + datos[i].horari.di[0].out +"  "+ datos[i].horari.di[1].in +"-" + datos[i].horari.di[1].out);

            var pDm = document.createElement("p");    
            var textDm = document.createTextNode("Dimarts: " + datos[i].horari.dm[0].in +"-" + datos[i].horari.dm[0].out+"  "+ datos[i].horari.dm[1].in +"-" + datos[i].horari.dm[1].out);

            var pDx = document.createElement("p");    
            var textDx = document.createTextNode("Dimecres: " + datos[i].horari.dx[0].in +"-" + datos[i].horari.dx[0].out+"  "+ datos[i].horari.dx[1].in +"-" + datos[i].horari.dx[1].out);
            
            var pDj = document.createElement("p");    
            var textDj = document.createTextNode("Dijous: " + datos[i].horari.dj[0].in +"-" + datos[i].horari.dj[0].out+"  "+ datos[i].horari.dj[1].in +"-" + datos[i].horari.dj[1].out);
            
            var pDv = document.createElement("p");    
            var textDv = document.createTextNode("Divendres: " + datos[i].horari.dv[0].in +"-" + datos[i].horari.dv[0].out+"  "+ datos[i].horari.dv[1].in +"-" + datos[i].horari.dv[1].out);

            var pDs = document.createElement("p");    
            var textDs = document.createTextNode("Dissabte: " + datos[i].horari.ds[0].in +"-" + datos[i].horari.ds[0].out+"  "+ datos[i].horari.ds[1].in +"-" + datos[i].horari.ds[1].out);

            var pDg = document.createElement("p");    
            var textDg = document.createTextNode("Diumenge: " + datos[i].horari.dg[0].in +"-" + datos[i].horari.dg[0].out+"  "+ datos[i].horari.dg[1].in +"-" + datos[i].horari.dg[1].out);

            pDi.appendChild(textDi);  
            pDm.appendChild(textDm);  
            pDx.appendChild(textDx);  
            pDj.appendChild(textDj);  
            pDv.appendChild(textDv);  
            pDs.appendChild(textDs);  
            pDg.appendChild(textDg); 
             //Añadimos el horario de cada día al div correspondiente con el id = respectivo
            $("#horariDll").append(pDi);
            $("#horariDm").append(pDm);
            $("#horariDx").append(pDx);
            $("#horariDj").append(pDj);
            $("#horariDv").append(pDv);
            $("#horariDs").append(pDs);
            $("#horariDg").append(pDg);
            
            $("#horario").append(disponibilidad);

            var newDeteall = document.createElement("p");    
            newDeteall.setAttribute('class', "item-intro text-mutedg")
            var textoDetall = document.createTextNode(datos[i].detall);
            newDeteall.appendChild(textoDetall)

            var newTelefon = document.createElement("p");    
            newTelefon.setAttribute('class', "item-intro text-mutedg")
            var textoTelef = document.createTextNode("Telèfon: " +datos[i].contacte.telf);
            newTelefon.appendChild(textoTelef)

            $("#datosElemento").append(newDeteall); 
            $("#datosElemento").append(newTelefon); 

            $("#facebookElem").attr('href',datos[i].contacte.xarxes.facebook)
            $("#InstaElem").attr('href',datos[i].contacte.xarxes.instagram)
            $("#TwitterElem").attr('href',datos[i].contacte.xarxes.tripadvisor)
            
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


//Funcion del desplegable de horario
  /* When the user clicks on the button, 
  toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  

//+ INFORMACIO.HTML
//Crear la timeline dinámicamente:

function buscador() {
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);
            var urlweb = location.search //agafa la url on hem clicat a partir de l'? inclòs
            var id = urlweb.replace("?", "")
            if (id == "informacio") {
                $("#headingInfo").append("MÉS INFORMACIÓ RELLEVANT")
                $("#subHeadingInfo").append("Segueix descobrint visitant les fires de l'illa, diferents cursos i tot un conjunt de curiositats.")
                addElemTimeLine(datos);
            } else if (id == "curs") {
                $("#headingInfo").append("CURSOS")
                $("#subHeadingInfo").append("Troba aquí una petita selecció de cursos online i presencials vegetarians o vegans")
                afegirElemPortfoli(datos, id);
            } else if (id == "info") {
                $("#headingInfo").append("DADES INTERESSANTS")
                $("#subHeadingInfo").append("No et perdis les darreres notícies.")
                afegirElemPortfoli(datos, id);
            } else if (id == "fira") {
                $("#headingInfo").append("FIRES VEGETARIANES I VENAGES DE L'ILLA")
                $("#subHeadingInfo").append("Descobreix l'illa visitant aquestes fires.")
                buscadorFires();
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//cas de fires
function buscadorFires() {
    var xmlhttp = new XMLHttpRequest();
    var url = "fires.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var dadesFires = JSON.parse(xmlhttp.responseText);
            var id = "Vegeteriana";
               // $("#headingInfo").append("FIRES VEGETARIANES I VENAGES DE L'ILLA")
              //  $("#subHeadingInfo").append("Descobreix l'illa visitant aquestes fires.")
            afegirElemPortfoli(dadesFires, id);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

/*
<li>
     <div class="timeline-image" data-toggle="modal" href="#portfolioModal1">
         <img class="rounded-circle img-fluid" src="assets/img/about/1.jpg" alt="" /></div>
     <div class="timeline-panel">
        <div class="timeline-heading" data-toggle="modal" href="#portfolioModal1">
             <h4>Fira Vegana Inca</h4>
            <h4 class="subheading">30 octubre de 2019</h4>
         </div>
        <div class="timeline-body" data-toggle="modal" href="#portfolioModal1">
            <p class="text-muted">«Va a haber stands de comida vegana, y el domingo haremos un
                 concurso, además de platos condimentados y talleres, haremos charlas para explicar
                 qué significa ser vegano y como vive un vegano». </p>
         </div>
     </div>
  </li>
  */




   // aqui molaria tb poner el caso de los datos fira de miquel, pero no termino de ver como hacerlo todo en uno
function addElemTimeLine(datos) {
    //antes de empezar el for, hacer un push de las fires dentro de datos
    for (var i = 0; i < datos.length; i++) {
        if (datos[i].tipus == "curs" || datos[i].tipus == "fira" || datos[i].tipus == "info") {
            if (i % 2) {
                var newLi = document.createElement("li")
            } else {
                var newLi = document.createElement("li")
                newLi.setAttribute('class', "timeline-inverted")

            }
            var newDiv = document.createElement("div")  // crea un nuevo div
            newDiv.setAttribute('class', "timeline-image")
            newDiv.setAttribute('data-toggle', "modal")
            newDiv.setAttribute('data-target', "#myModal");
            newDiv.setAttribute('onclick', "desplegable(" + i + ");");
            newLi.appendChild(newDiv)//añade texto al div creado.

            var newimg = document.createElement("img");   // crea un nuevo div
            newimg.setAttribute('class', "rounded-circle img-fluid")
            newimg.setAttribute('src', datos[i].imatges[0]) // datos[i].imatges[0]
            newimg.setAttribute('alt', "")
            newDiv.appendChild(newimg)

            var newDiv1 = document.createElement("div")  // crea un nuevo div
            newDiv1.setAttribute('class', "timeline-panel")
            newLi.appendChild(newDiv1)//añade texto al div creado.

            var newDiv2 = document.createElement("div")  // crea un nuevo div
            newDiv2.setAttribute('class', "timeline-heading")
            newDiv2.setAttribute('data-toggle', "modal")
            newDiv2.setAttribute('data-target', "#myModal");
            newDiv2.setAttribute('onclick', "desplegable(" + i + ");");
            newDiv1.appendChild(newDiv2)//añade texto al div creado.

            var newh4 = document.createElement("h4")
            var newContent = document.createTextNode(datos[i].nom); //nom Rest datos[i].nom
            newh4.appendChild(newContent)
            newDiv2.appendChild(newh4)

            var newh4_2 = document.createElement("h4")
            newh4_2.setAttribute('class', "subheading")
            var newContent2 = document.createTextNode(datos[i].calendari.startDataEvent);
            newh4_2.appendChild(newContent2)
            newDiv2.appendChild(newh4_2)

            var newDiv3 = document.createElement("div")  // crea un nuevo div
            newDiv3.setAttribute('class', "timeline-body")
            newDiv3.setAttribute('data-toggle', "modal")
            newDiv3.setAttribute('href', "#portfolioModal1")
            newDiv1.appendChild(newDiv3)//añade texto al div creado.

            var newp = document.createElement("p")
            newp.setAttribute('class', "text-muted")
            var newContent3 = document.createTextNode(datos[i].descripcio); //«Va a haber stands de comida vegana, y el domingo haremos unconcurso, además de platos condimentados y talleres, haremos charlas para explicar qué significa ser vegano y como vive un vegano».
            newp.appendChild(newContent3)
            newDiv3.appendChild(newp)


            // añade el elemento creado y su contenido al DOM
            $("#timeLineInfo").append(newLi);
        }
    }
    var newLi2 = document.createElement("li")
    var newDiv4 = document.createElement("div")  // crea un nuevo div
    newDiv4.setAttribute('class', "timeline-image")
    newDiv4.setAttribute('data-toggle', "modal")
    newDiv4.setAttribute('href', "#portfolioModal1")
    newLi2.appendChild(newDiv4)//añade texto al div creado.

    var newh4_2 = document.createElement("h4")
    var newContent4 = document.createTextNode("Continua\n"); //nom Rest datos[i].nom
    newh4_2.appendChild(newContent4)
    var newContent5 = document.createTextNode("descobrint \r"); //nom Rest datos[i].nom
    newh4_2.appendChild(newContent5)
    var newContent6 = document.createTextNode("\naquí!\n"); //nom Rest datos[i].nom
    newh4_2.appendChild(newContent6)

    newDiv4.appendChild(newh4_2)
    $("#timeLineInfo").append(newLi2);
}

// a lo mejor llamarlo Info o algo, para no confundir
function afegirElemPortfoli(datos, id) {
    for (var i = 0; i < datos.length; i++) {
        if (datos[i].tipus == id) { //id = "restaurant o sueprmercats"

            console.log(id)
            var newDiv = document.createElement("div");   // crea un nuevo div
            newDiv.setAttribute('class', "col-lg-4 col-sm-6 mb-4")

            var newDiv1 = document.createElement("div");   // crea un nuevo div
            newDiv1.setAttribute('class', "portfolio-item")
            newDiv.appendChild(newDiv1); //añade texto al div creado.

            var newa1 = document.createElement("a");
            //newa1.setAttribute('onclick', "desplegable("+i+")");
            //newa1.setAttribute('onclick', "test()");
            newa1.setAttribute('class', "portfolio-link");
            newa1.setAttribute('data-toggle', "modal")
            newa1.setAttribute('data-target', "#myModal");
            newa1.setAttribute('onclick', "desplegable(" + i + ");");
            // newa1.setAttribute('id', "iddeslplegable")

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
            //newimg.setAttribute('class', "img-fluid")
            newimg.setAttribute('width', 348)
            newimg.setAttribute('height', 350)
            newimg.setAttribute('margin-righ', 30)
            newimg.setAttribute('src', datos[i].imatges[0])
            newimg.setAttribute('alt', "")

            newa1.appendChild(newimg);

            var newDiv4 = document.createElement("div");   // crea un nuevo div
            newDiv4.setAttribute('class', "portfolio-caption")

            newDiv1.appendChild(newDiv4);

            var newDiv5 = document.createElement("div");   // crea un nuevo div
            newDiv5.setAttribute('class', "portfolio-caption-heading")
            var newContent = document.createTextNode(datos[i].nom); //nom Rest
            newDiv5.appendChild(newContent)

            newDiv4.appendChild(newDiv5);

            var newDiv6 = document.createElement("div");   // crea un nuevo div
            newDiv6.setAttribute('class', "portfolio-caption-subheading text-muted")
            var newContent2 = document.createTextNode(datos[i].geo1.address); //geo Rest
            newDiv6.appendChild(newContent2)
            newDiv4.appendChild(newDiv6);

            // añade el elemento creado y su contenido al DOM
            $("#portfolioInfo").append(newDiv);
        }
    }
}


// para el filtrado:

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

/* FUNCIONES JQUERY */

(function ($) {
    "use strict"; // Start of use strict

    $("#selectOrdenar").change(function () {
        if ($(this).val() ==0) {
          Cercador(0); //predeterminat
        } 
        if($(this).val() == 1){
          Cercador(1); //més valorat
        } 
        if($(this).val() == 2){
          Cercador(2); //preu ascendent
        } 
        if($(this).val() == 3){
            Cercador(3); //preu ascendent
          } 
      });



  })(jQuery); // End of use strict
