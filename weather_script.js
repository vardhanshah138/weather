let day = document.getElementById("day-display");
let date = document.getElementById("date-display");
let loc = document.getElementById("location-display");


day.innerHTML = "Friday";
console.log(day.innerHTML);


function coordinate_success(position){

    var coordinate = position.coords;
    var latitude = coordinate.latitude;
    var longitude = coordinate.longitude;

    console.log("Latitude : " + latitude);
    console.log("Longitude : " + longitude);
}

function coordinate_error(error){
    console.log(error);
}

navigator.geolocation.getCurrentPosition(coordinate_success);
