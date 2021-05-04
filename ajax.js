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

        var urlweb = location.search //agafa la url on hem clicat a partir de l'? inclòs
        var id = urlweb.replace("?","")
        if(id == "restaurant"){
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


function addElement (datos, id) {
//filtrar para distinguir entre restaurantes o supermercados
    
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
            newa1.setAttribute('id', "iddeslplegable")

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


function vaciarDesplegable(i) {
    document.getElementById("nomElement").innerHTML = ""; 
    document.getElementById("descripcioElement").innerHTML = ""; 
    document.getElementById("geoposElem").innerHTML = ""; 
    document.getElementById("telElem").innerHTML = ""; 
    document.getElementById("paginawebElem").innerHTML = ""; 
}

function desplegable(i) {
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";

    var arrayHorario = ["Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte","Diumenge"]
    var accesoHorario =["di","dm","dx","dj","dv","ds","dg"]
    
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
            newImg.setAttribute('onclick', "vaciarDesplegable()")
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


            for (var j=0; j< 7;j++){
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
            
            $("#geoposElem").append(datos[i].geo1.address)
            $("#telElem").append(datos[i].contacte.telf)
            $("#paginawebElem").append(datos[i].contacte.xarxes.web)

            $("#paginaAux").append(newDiv);
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
        var id = urlweb.replace("?","")
        if(id == "informacio"){
            addElemTimeLine(datos);
            $("#headingInfo").append("MÉS INFORMACIÓ RELLEVANT")
            $("#subHeadingInfo").append("Segueix descobrint visitant les fires de l'illa, diferents cursos i tot un conjunt de curiositats.")
        } else if(id == "curs"){
            $("#headingInfo").append("CURSOS")
            $("#subHeadingInfo").append("Troba aquí una petita selecció de cursos online i presencials vegetarians o vegans")
            addCurs(datos, id);
        }else if(id == "info"){
            $("#headingInfo").append("DADES INTERESSANTS")
            $("#subHeadingInfo").append("No et perdis les darreres notícies.")
            addCurs(datos, id);
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
    for (var i = 0; i <datos.length; i++){
        if(datos[i].tipus == "curs" || datos[i].tipus == "fira" || datos[i].tipus == "info" ){ 
            if (i%2){
                var newLi = document.createElement("li")
            }else{
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

function addCurs (datos, id) {
    //filtrar para distinguir entre restaurantes o supermercados
        
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
                newa1.setAttribute('href', "#portfolioModal1") //+i)
                newa1.setAttribute('id', "iddeslplegable")
    
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
                $("#portfolioInfo").append(newDiv);
            }
        }
    }



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

marker.bindPopup("<b>Nombre Restaurante</b><br>Calle.").openPopup();*/