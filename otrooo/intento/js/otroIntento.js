var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'file:///Users/ashook/Library/Mobile%20Documents/com~apple~CloudDocs/VeggieMallorca/jason/restaurants.json');
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.send()
    pageCounter++;
    if(pageCounter>3){
        btn.classList.add("hide-me");
    }
});

function renderHTML(data) {
    var htmlString = "";

    for (i = 0; i< data.length; i++){
        htmlString += "<p>" + data[i].nom + " is a " + data[i].estrelles + ".</p>";

    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}