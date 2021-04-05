var ourRequest= new XMLHttpRequest();
ourRequest.open('GET', 'restaurants.json');
ourRequest.onload = function() {
    var ourRestaurants = JSON.parse(ourRequest.responseText);
    renderHTML(ourRestaurants);
    ourRequest.send();
};

function renderHTML(data) {
    var htmlString = "";

    for (i=0; i < data.length; i++){
        htmlString += "<p>" + data[i].nom + " tiene " + data[i].estrelles + " estrelles.</p>";
    }
}