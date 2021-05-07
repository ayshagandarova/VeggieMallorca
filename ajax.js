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
/*
function hacerMapa(x) {

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);


            var pointer = document.createElement('div');
            pointer.className = 'marker';

            var marker = new mapboxgl.Marker()
                .setLngLat([datos[x].geo1.long, datos[x].geo1.lat])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 })
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
}*/

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

            var newDiv1 = document.createElement("div");   // crea un nuevo div
            newDiv1.setAttribute('class', "portfolio-item")
            newDiv.appendChild(newDiv1); //añade texto al div creado.

            var newa1 = document.createElement("a");
            //   newa1.setAttribute('onclick', "desplegable("+i+"); this.onclick=null;");
            newa1.setAttribute('class', "portfolio-link");
            newa1.setAttribute('data-toggle', "modal");
            newa1.setAttribute('data-target', "#myModal");
            newa1.setAttribute('onclick', "desplegableDatos(" + i + ");");
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
            //  newimg.className ="img-fluid"
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
    marker.remove();
}

function desplegableDatos(i) {
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
            $("#horariElement").append(newThead);
            $("#horariElement").append(newTbody);

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

   

/*
            var newDiv2 = document.createElement("div");   // crea un nuevo div
            newDiv2.setAttribute('class', "modal-content")
            //newDiv1.appendChild(newDiv2); //añade texto al div creado.

            var newDiv3 = document.createElement("div");   // crea un nuevo div
            newDiv3.setAttribute('class', "close-modal")
            newDiv3.setAttribute('data-dismiss', "modal")
            newDiv2.appendChild(newDiv3); //añade texto al div creado.

            var newImg = document.createElement("img");   // crea un nuevo div
            newImg.setAttribute('src', "assets/img/close-icon.svg")
            newImg.setAttribute('alt', "Close modal")
            //newImg.setAttribute('onclick', "vaciarDesplegable()")
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
            //newH2.setAttribute('id', "nomElement")
            var newContent1 = document.createTextNode(datos[i].nom); //nom Rest
            newH2.appendChild(newContent1)
            newDiv6.appendChild(newH2); //añade texto al div creado.


            var newP = document.createElement("p");   // crea un nuevo div
            newP.setAttribute('class', "item-intro text-mutedg")
            //newP.setAttribute('id', "descripcioElement")
            var newContent2 = document.createTextNode(datos[i].descripcio); //nom Rest
            newP.appendChild(newContent2)
            newDiv6.appendChild(newP); //añade texto al div creado.






            //$("#nomElement").append(datos[i].nom)

            //  $("#descripcioElement").append(datos[i].descripcio)









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

            for (var k = 0; k < datos[i].imatges.length; k++) {
                var newLiK = document.createElement("li");   // crea un nuevo div
                if (k == 0) {
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
            newImg1.setAttribute('class', "0-slide")
            newImg1.setAttribute('src', datos[i].imatges[0])
            newImg1.setAttribute('alt', "0-slide")
            newImg1.setAttribute('style', "object-fit:scale-down; width:500px; height:300px")
            newDiv11.appendChild(newImg1); //añade texto al div creado.

            for (var k = 1; k < datos[i].imatges.length; k++) {
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
            newA.setAttribute('class', "carousel-control-prev")
            newA.setAttribute('href', "#myCarousel")
            newA.setAttribute('role', "button")
            newA.setAttribute('data-slide', "data-slide")
            newDiv9.appendChild(newA); //añade texto al div creado.

            var newSpan = document.createElement("span");   // crea un nuevo div
            newSpan.setAttribute('class', "carousel-control-prev-icon")
            newSpan.setAttribute('aria-hidden', "true")
            newA.appendChild(newSpan); //añade texto al div creado.

            var newSpan1 = document.createElement("span");   // crea un nuevo div
            newSpan1.setAttribute('class', "sr-only")
            newSpan1.setAttribute('id', "num1-slide")
            $("#num1-slide").append("Previous")
            newA.appendChild(newSpan1); //añade texto al div creado.


            var newA1 = document.createElement("a");   // crea un nuevo div
            newA1.setAttribute('class', "carousel-control-next")
            newA1.setAttribute('href', "#myCarousel")
            newA1.setAttribute('role', "button")
            newA1.setAttribute('data-slide', "next")
            newDiv9.appendChild(newA1); //añade texto al div creado.

            var newSpan2 = document.createElement("span");   // crea un nuevo div
            newSpan2.setAttribute('class', "carousel-control-next-icon")
            newSpan2.setAttribute('aria-hidden', "true")
            newA1.appendChild(newSpan2); //añade texto al div creado.

            var newSpan3 = document.createElement("span");   // crea un nuevo div
            newSpan3.setAttribute('class', "sr-only")
            newSpan3.setAttribute('id', "num2-slide")
            $("#num2-slide").append("Next")
            newA1.appendChild(newSpan3); //añade texto al div creado.


            newDiv12.appendChild(newDiv13); //añade texto al div creado.





            // horario + info :
            var newDivRow = document.createElement("div");   // crea un nuevo ul
            newDivRow.setAttribute('id', "informacionElement")
            newDivRow.setAttribute('class', "row justify-content-centert")
            newDiv4.appendChild(newDivRow); //añade texto al div creado.

            var newDivCol1 = document.createElement("div");   // crea un nuevo ul
            newDivCol1.setAttribute('class', "col-lg-6")
            newDivRow.appendChild(newDivCol1); //añade texto al div creado.

            var newTable = document.createElement("table");   // crea un nuevo ul
            newTable.setAttribute('id', "horariElem")
            newDivCol1.appendChild(newTable); //añade texto al div creado.

            var newThead = document.createElement("thead");   // crea un nuevo ul
            newTable.appendChild(newThead); //añade texto al div creado.

            var newTr = document.createElement("tr");   // crea un nuevo ul
            newThead.appendChild(newTr); //añade texto al div creado.

            var newTh1 = document.createElement("th");   // crea un nuevo ul
            var texto = document.createTextNode("Horari:");
            newTh1.appendChild(texto);
            newTr.appendChild(newTh1); //añade texto al div creado.

            var newTh2 = document.createElement("th");   // crea un nuevo ul
            newTr.appendChild(newTh2); //añade texto al div creado.

            var newTh3 = document.createElement("th");   // crea un nuevo ul
            newTr.appendChild(newTh3); //añade texto al div creado.

            var newTbody = document.createElement("tbody");   // crea un nuevo ul
            newTable.appendChild(newTbody); //añade texto al div creado.

            for (var j = 0; j < 7; j++) {
                var newTrJ = document.createElement("tr");   // crea un nuevo ul
                newTbody.appendChild(newTrJ); //añade texto al div creado.

                var newTd = document.createElement("td");   // crea un nuevo ul
                var text = document.createTextNode(arrayHorario[j]);
                newTd.appendChild(text);
                newTrJ.appendChild(newTd); //añade texto al div creado.

                var newTd2 = document.createElement("td");   // crea un nuevo ul
                var text2 = document.createTextNode(datos[i].horari.di[0].in);
                newTd2.appendChild(text2);
                newTrJ.appendChild(newTd2); //añade texto al div creado.

                var newTd3 = document.createElement("td");   // crea un nuevo ul
                var text3 = document.createTextNode(datos[i].horari.di[0].out);
                newTd3.appendChild(text3);
                newTrJ.appendChild(newTd3); //añade texto al div creado.
            }

            var newDivCol2 = document.createElement("div");   // crea un nuevo ul
            newDivCol2.setAttribute('class', "col-lg-6")
            newDivRow.appendChild(newDivCol2); //añade texto al div creado.

            var newUl = document.createElement("ul");   // crea un nuevo ul
            newDivCol2.appendChild(newUl); //añade texto al div creado.

            var newLi2 = document.createElement("li");   // crea un nuevo ul
            var texte1 = document.createTextNode(datos[i].geo1.address)
            newLi2.appendChild(texte1)
            newUl.appendChild(newLi2); //añade texto al div creado.

            var newLi3 = document.createElement("li");   // crea un nuevo ul
            var texte2 = document.createTextNode(datos[i].contacte.telf)
            newLi3.appendChild(texte2)
            newUl.appendChild(newLi3); //añade texto al div creado.

            /*var newLi4 = document.createElement("li");   // crea un nuevo ul
            var texte3 = document.createTextNode(datos[i].contacte.xarxes.web)
            newLi4.appendChild(texte3)
            newUl.appendChild(newLi4); //añade texto al div creado.




            $("#añadirInfoElemento").html("");
            $("#añadirInfoElemento").html(newDiv2)

        */

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
                afegirElemPortfoli(datos, id);
            }

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