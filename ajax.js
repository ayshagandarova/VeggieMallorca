//console.log('correcto');
document.querySelector('#restaurants').addEventListener('click',traerDatos)



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
            restaurants.innerHTML = `<div class="row">`
            for(let item of datos){
                restaurants.innerHTML += `
                    <div class="col-lg-4 col-sm-6 mb-4">
                        <div class="portfolio-item">
                        <!--  <a class="portfolio-link" data-toggle="modal" id="rest1">-->  
                            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1"> 
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src=${item.imatges[0]} alt="" />
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading" id=${item.nom}></div>
                                <div class="portfolio-caption-subheading text-muted" id=${item.geo1}></div>
                            </div>
                        </div>
                    </div>  
                `
            }
            restaurants.innerHTML += `</div> `






            /*
            let geo1 = document.querySelector('#geo1')
            geo1.innerHTML = datos[0].geo1.address
            
            let nombreRestaurante = document.querySelector('#nombreRestaurante')
            nombreRestaurante.innerHTML = datos[0].nom
            console.log(nombreRestaurante)

            */
        }
    }
}


/*
function traerDatosBasicos(){
    const xhttp = new XMLHttpRequest();

    // el true indica que es asincrono, aqui importamos los datos 
    xhttp.open('GET', 'Restaurants.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){ //esto sale en otro video y parece que siempre es asi
         
            let geo1 = document.querySelector('#geo1')
            geo1.innerHTML = datos[0].geo1.address
            
            let nombreRestaurante = document.querySelector('#nombreRestaurante')
            nombreRestaurante.innerHTML = datos[0].nom
        }
    }
}

*/
//función que trae los datos cuando se pulsa el boton
function traerDatos(){
   // console.log('dentro de la función');
   console.log('estamos en la función traer datos')
   
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){ //esto sale en otro video y parece que siempre es asi
            

            
            let geo1 = document.querySelector('#geo1')
            geo1.innerHTML = datos[0].geo1.address

            let horari = document.querySelector('#horari')
            horari.innerHTML += `
                <p>Horari:</p>
                <ul>
                    <li>Dilluns: ${datos[0].horari.di[0].in}-${datos[0].horari.di[0].out}</li>
                    <li>Dimarts: ${datos[0].horari.dm[0].in}-${datos[0].horari.document[0].out}</li>
                    <li>Dimecres: ${datos[0].horari.dx[0].in}-${datos[0].horari.dx[0].out}</li>
                    <li>Dijous: ${datos[0].horari.dj[0].in}-${datos[0].horari.dj[0].out}</li>
                    <li>Divendres: ${datos[0].horari.dv[0].in}-${datos[0].horari.dv[0].out}</li>
                    <li>Dissabte: ${datos[0].horari.ds[0].in}-${datos[0].horari.ds[0].out}</li>
                    <li>Diumenge: ${datos[0].horari.dg[0].in}-${datos[0].horari.dg[0].out}</li>
                </ul>
                `
            let descripcio = document.querySelector('#descripcio')
            descripcio.innerHTML = datos[0].descripcio

            let telefono = document.querySelector('#telefono')
            telefono.innerHTML = datos[0].contacte.telf



            let nombreRestaurante = document.querySelector('#nombreRestaurante')
            nombreRestaurante.innerHTML = datos[0].nom
            console.log('se ha guardado el valor de nombrerestaurante');

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