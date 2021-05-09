//console.log('correcto');

//document.querySelector('#portfolioModal1').addEventListener('click',mostrarRestaurants)
//mostrarRestaurants();

//función que trae los datos cuando se pulsa el boton

// mapa:

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNob29rMDA3IiwiYSI6ImNrbnZ4bGg3bzByMTcydnFucWdpcGx6bWEifQ.jHKo86UYDX6fcEVz_VoHZQ';
var map = new mapboxgl.Map({
container: 'mapid', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [2.651537069816233, 39.570644797011795], // starting position [lng, lat]
zoom: 9 // starting zoom
});
map.on('idle',function(){
    map.resize()
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
    
var marker;


//resultats seria el equivalente a donde ponemos nuestras en row  columnas 

var input = document.getElementById("myInput");
// añade listener si pulsas enter:
input.addEventListener('keyup', function(event) {
    if (event.keyCode  === 13) {
        event.preventDefault();
        document.getElementById("buscar").click();
    }
});

//*** maria: que es esto ayshaaaa???? */
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
                    console.log(datos[i].nom + " y el tipo: " + datos[i].tipus);
                } 
            }
        }
    };
    xmlhttp.open("GET", url, true);
            xmlhttp.send();
}
// Botón para subir arriba;

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


function Cercador() {
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);

            var urlweb = location.search //agafa la url on hem clicat a partir de l'? inclòs
            var id = urlweb.replace("?", "")
            if (id == "restaurant") {
                $("#titolPortfoli").append("Restaurants")
                $("#descPortfoli").append("Aquí trobàs la millor secció de restaurants que tenen opcions veganes o vegetarianes.")
            } else {
                $("#titolPortfoli").append("Supermercats")
                $("#descPortfoli").append("Selecció de supermercats i petits comerços que ofereixen productes ecològics.")
            }
            addElement(datos, id);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function addElement(datos, id) {
    //filtrar para distinguir entre restaurantes o supermercados

    for (var i = 0; i < datos.length; i++) {

        if (datos[i].tipus == id) { //id = "restaurant o sueprmercats"
            var newDiv = document.createElement("div");   // crea un nuevo div
            newDiv.setAttribute('class', "col-lg-4 col-sm-6 mb-4")
            newDiv.setAttribute('id', "elemento-"+i)

            var newDiv1 = document.createElement("div");   // crea un nuevo div
            newDiv1.setAttribute('class', "portfolio-item")
            newDiv.appendChild(newDiv1); 

            var newa1 = document.createElement("a");
            newa1.setAttribute('class', "portfolio-link");
            newa1.setAttribute('data-toggle', "modal");
            newa1.setAttribute('data-target', "#myModal");
            newa1.setAttribute('onclick', "desplegable(" + i + ");");
            newDiv1.appendChild(newa1); 

            var newDiv2 = document.createElement("div");   // crea un nuevo div
            newDiv2.setAttribute('class', "portfolio-hover")

            newa1.appendChild(newDiv2);

            var newDiv3 = document.createElement("div");   
            newDiv3.setAttribute('class', "portfolio-hover-content")

            newDiv2.appendChild(newDiv3);

            var newi = document.createElement("i");  
            newi.setAttribute('class', "fas fa-plus fa-3x")

            newDiv3.appendChild(newi);

            var newimg = document.createElement("img"); 
           // newimg.setAttribute('width', 355)
          //  newimg.setAttribute('height', 250)
           // newimg.setAttribute('margin-righ', 30)
            newimg.setAttribute('class', "img-fluid")
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
            $("#galeriaPortfoli").append(newDiv);
        }
    }
}
function eliminarDatosElemento(){
    $("#nombreDescripcioElement").html(""); //limpiar la seccion
    $("#carouselElement").html(""); //limpiar la seccion
    $("#horariElement").html(""); //limpiar la seccion
   // $("#informació").html(""); //limpiar la seccion
    $("#tiempoElemento").html(""); //limpiar la seccion
    $("#horarioDesplegable").html(""); //limpiar la seccion
    $("#horario").html(""); //limpiar la seccion
    if (marker != null){
        marker.remove();
    }
}

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
            var newTitulo = document.createElement("h2");   // Añade el título a la ventana emergente
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
            newCarouselA.setAttribute('data-slide', "data-slide")
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
                        $("#horario").css({"background-color": "#B8CD65", "border-color": "#627760" });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565", "border-color": "#E26C5C" });
                    }
                    break;
                case 2:
                    if(hora>=datos[i].horari.dm[0].in && hora <=datos[i].horari.dm[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65", "border-color": "#627760" });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565", "border-color": "#E26C5C" });
                    }
                    break;
                case 3:
                    if(hora>=datos[i].horari.dx[0].in && hora <=datos[i].horari.dx[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65", "border-color": "#627760" });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565", "border-color": "#E26C5C" });
                    }
                    break;
                case 4:
                    if(hora>=datos[i].horari.dj[0].in && hora <=datos[i].horari.dj[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65", "border-color": "#627760" });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565", "border-color": "#E26C5C" });
                    }
                    break;
                case 5:
                    if(hora>=datos[i].horari.dv[0].in && hora <=datos[i].horari.dv[0].out){
                        disponibilidado = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65", "border-color": "#627760" });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565", "border-color": "#E26C5C" });
                    }
                    break;
                case 6:
                    if(hora>=datos[i].horari.ds[0].in && hora <=datos[i].horari.ds[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65", "border-color": "#627760"  });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565", "border-color": "#E26C5C" });
                    }
                    break;
                case 0:

                    if(hora>=datos[i].horari.dg[0].in && hora <=datos[i].horari.dg[0].out){
                        disponibilidad = document.createTextNode("Abierto");
                        $("#horario").css({"background-color": "#B8CD65", "border-color": "#627760" });
                    }else{
                        disponibilidad = document.createTextNode("Cerrado");
                        $("#horario").css({"background-color": "#E99565", "border-color": "#E26C5C" });
                    }
                    break;

            }

            // Crea el horario desplegable:

            var pDi = document.createElement("p");    
            var textDi = document.createTextNode("Dilluns: " + datos[i].horari.di[0].in +"-" + datos[i].horari.di[0].out);

            var pDm = document.createElement("p");    
            var textDm = document.createTextNode("Dimarts: " + datos[i].horari.dm[0].in +"-" + datos[i].horari.dm[0].out);

            var pDx = document.createElement("p");    
            var textDx = document.createTextNode("Dimecres: " + datos[i].horari.dx[0].in +"-" + datos[i].horari.dx[0].out);
            
            var pDj = document.createElement("p");    
            var textDj = document.createTextNode("Dijous: " + datos[i].horari.dj[0].in +"-" + datos[i].horari.dj[0].out);
            
            var pDv = document.createElement("p");    
            var textDv = document.createTextNode("Divendres: " + datos[i].horari.dv[0].in +"-" + datos[i].horari.dv[0].out);

            var pDs = document.createElement("p");    
            var textDs = document.createTextNode("Dissabte: " + datos[i].horari.ds[0].in +"-" + datos[i].horari.ds[0].out);

            var pDg = document.createElement("p");    
            var textDg = document.createTextNode("Diumenge: " + datos[i].horari.dg[0].in +"-" + datos[i].horari.dg[0].out);

            pDi.appendChild(textDi);  
            pDm.appendChild(textDm);  
            pDx.appendChild(textDx);  
            pDj.appendChild(textDj);  
            pDv.appendChild(textDv);  
            pDs.appendChild(textDs);  
            pDg.appendChild(textDg);  
            //Añadimos el horario de cada día al div correspondiente con el id = horarioDesplegable
           /* $("#horarioDesplegable").append(pDi);
            $("#horarioDesplegable").append(pDm);
            $("#horarioDesplegable").append(pDx);
            $("#horarioDesplegable").append(pDj);
            $("#horarioDesplegable").append(pDv);
            $("#horarioDesplegable").append(pDs);
            $("#horarioDesplegable").append(pDg);*/

            // Añade un listener en el botón, cuando se pulse se muestra el horario, si se vuelve a pulsar lo esconde

            $("#horario").append(disponibilidad);
            // Al clicar se despliega el horario:
          /* $("#horario").click(function(){
                if($("#horarioDesplegable").style.display == "none"){
                    $("#horarioDesplegable").slideDown();
                }else{
                    $("#horarioDesplegable").slideDown();
                }
             });

            $("#horario").dbclick(function(){
                  if($("#horarioDesplegable").style.display == "none"){
                      $("#horarioDesplegable").slideUp();
                  }else{
                      $("#horarioDesplegable").slideDown();
                  }
              });  */



            /*
            // Horario:
           

            var newThead = document.createElement("thead");    

            var newTr = document.createElement("tr");    
            newThead.appendChild(newTr);  

            var newTh1 = document.createElement("th");    
            var texto = document.createTextNode("Horari:");
            newTh1.appendChild(texto);
            newTr.appendChild(newTh1);  

            var newTh2 = document.createElement("th");    
            newTr.appendChild(newTh2);  

            var newTh3 = document.createElement("th");    
            newTr.appendChild(newTh3);  

            var newTbody = document.createElement("tbody");    

            // hay que cambiar para que aparezca para cada dida de la semana
            for (var j = 0; j < 7; j++) {
                var newTrJ = document.createElement("tr");    
                newTbody.appendChild(newTrJ);  

                var newTd = document.createElement("td");    
                var text = document.createTextNode(arrayHorario[j]);
                newTd.appendChild(text);
                newTrJ.appendChild(newTd);  

                var newTd2 = document.createElement("td");    
                var text2 = document.createTextNode(datos[i].horari.di[0].in);
                newTd2.appendChild(text2);
                newTrJ.appendChild(newTd2);  

                var newTd3 = document.createElement("td");    
                var text3 = document.createTextNode(datos[i].horari.di[0].out);
                newTd3.appendChild(text3);
                newTrJ.appendChild(newTd3);  
            }
           // $("#horariElement").append(newThead);
           // $("#horariElement").append(newTbody);
*/
           // Comentarios:
            /*
            var newScript = document.createElement('script');
            newScript.setAttribute('src', datos[i].dadesPropies.scriptComentaris);

            var newDivComentari = document.createElement('div');
            newDivComentari.setAttribute('class',datos[i].dadesPropies.divComentaris)
            $("#comentaris").append(newScript);
            $("#comentaris").append(newDivComentari);
            */
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
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
    var url = "https://fires-mallorca.netlify.app/jsonBase_1.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);
            var id = "Vegeteriana";
               // $("#headingInfo").append("FIRES VEGETARIANES I VENAGES DE L'ILLA")
              //  $("#subHeadingInfo").append("Descobreix l'illa visitant aquestes fires.")
            afegirElemPortfoli(datos, id);
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
            newDiv.setAttribute('href', "#portfolioModal1")
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
            newDiv2.setAttribute('href', "#portfolioModal1")
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
            var newDiv = document.createElement("div");   // crea un nuevo div
            newDiv.setAttribute('class', "col-lg-4 col-sm-6 mb-4")

            var newDiv1 = document.createElement("div");   // crea un nuevo div
            newDiv1.setAttribute('class', "portfolio-item")
            newDiv.appendChild(newDiv1); //añade texto al div creado.

            var newa1 = document.createElement("a");
            //newa1.setAttribute('onclick', "desplegable("+i+")");
            //newa1.setAttribute('onclick', "test()");
            newa1.setAttribute('class', "portfolio-link");
            newa1.setAttribute('data-toggle', "modal");
            newa1.setAttribute('href', "#portfolioModal1") //+i)
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