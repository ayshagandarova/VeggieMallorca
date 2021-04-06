//console.log('correcto');

document.querySelector('#rest1').addEventListener('click',traerDatos);


//función que trae los datos cuando se pulsa el boton
function traerDatos(){
   // console.log('dentro de la función');

    const xhttp = new XMLHttpRequest();

    // el true indica que es asincrono, aqui importamos los datos 
    xhttp.open('GET', 'Restaurants.json', true);

    xhttp.send();

    
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){ //esto sale en otro video y parece que siempre es asi
            //console.log(this.responseText); // esto nos trae todo el archivo json en formato texto
            //nos devuelve texto
            //el json parse nos permite recibir texto y transformarlo en json

            let datos = JSON.parse(this.responseText);
            //console.log(datos); //nos devuelve array
 
            let respuesta = document.querySelector('#respuesta');
            respuesta.innerHTML = ''; //para que vacie el array siempre
            //para acceder a los nombres

            let nombreRestaurante = document.querySelector('#nombreRestaurante')
            nombreRestaurante.innerHTML = datos[1].nom;
            console.log(nombreRestaurante);

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
                `
            
                */
        }
    }

}

/*
                    <div class="col-md-6">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                                    <ol class="carousel-indicators">
                                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                                        <li data-target="#myCarousel" data-slide-to="1"></li>
                                        <li data-target="#myCarousel" data-slide-to="2"></li>
                                        <li data-target="#myCarousel" data-slide-to="2"></li>
                                        <li data-target="#myCarousel" data-slide-to="2"></li>
                                    </ol>
                                    <div class="carousel-inner">
                                            <div class="carousel-item active">
                                            <img class="first-slide" src="assets/img/portfolio/01-full.jpg" alt="First slide" 
                                            style="object-fit:scale-down;
                                            width:500px;
                                            height:300px;
                                            border: solid 1px #CCC"/>
                                            </div>
                                            <div class="carousel-item">
                                            <img class="second-slide" src="assets/img/carousel/restaurante2.jpg" alt="Second slide" style="object-fit:scale-down;
                                            width:500px;
                                            height:300px;
                                            border: solid 1px #CCC"/>
                                            </div>
                                            <div class="carousel-item">
                                            <img class="third-slide" src="assets/img/carousel/restaurante3.jpg" alt="Third slide" style="object-fit:scale-down;
                                            width:500px;
                                            height:300px;
                                            border: solid 1px #CCC"/>
                                            </div>
                                        </div>
                                    <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                                        
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                    </div>
                            </div>
                            <!-- <div class="col-lg-6">
                            <img class="img-fluid d-block mx-auto" src="assets/img/portfolio/01.1-full.jpg" alt="" /> 
                            </div>-->
                        </div>
                    </div>
                    */