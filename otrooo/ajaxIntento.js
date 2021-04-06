console.log('correcto');

document.querySelector('#boton').addEventListener('click',traerDatos());


//función que trae los datos cuando se pulsa el boton
function traerDatos(){
    console.log('dentro de la función');

    const xhttp = new XMLHttpRequest();

    // el true indica que es asincrono, aqui importamos los datos 
    xhttp.open('GET', 'jsonBase.json', true);

    xhttp.send();

    //esto sale en otro video y parece que siempre es asi
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            console.log(this.responseText); // esto nos trae todo el archivo json en formato texto

            //el json parse nos permite recibir texto y transformarlo en json

            let datos = JSON.parse(this.responseText);
            console.log(datos);
        }
    }

}