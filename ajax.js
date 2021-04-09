//console.log('correcto');
document.querySelector('#portfolioModal1').addEventListener('click',traerDatos1)

//document.querySelector('#pagRest').addEventListener('click',mostrarRestaurants)
mostrarRestaurants();

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

//función que trae los datos cuando se pulsa el boton
function traerDatos1(){
   // console.log('dentro de la función');
   const xhttp = new XMLHttpRequest()
    // el true indica que es asincrono, aqui importamos los datos 
    xhttp.open('GET', 'Restaurants.json', true)

    xhttp.send()
    xhttp.onreadystatechange = function(){
        let datos = JSON.parse(xhttp.responseText)
        if(this.readyState==4 && this.status==200){ //esto sale en otro video y parece que siempre es asi
                        
            let geo1 = document.querySelector('#geo1')
            geo1.innerHTML = datos[0].geo1.address

            let horari = document.querySelector('#horari1')
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
            let descripcio = document.querySelector('#descripcio1')
            descripcio.innerHTML = datos[0].descripcio

            let telefono = document.querySelector('#telefono1')
            telefono.innerHTML = datos[0].contacte.telf

            let nombreRestaurante = document.querySelector('#nombreRest1')
            nombreRestaurante.innerHTML = datos[0].nom

            let pagweb = document.querySelector('#paginaweb1')
            pagweb.innerHTML = datos[0].contacte.pagweb
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