let day = document.getElementById("day-display");
let date = document.getElementById("date-display");
let loc = document.getElementById("location-display");
let apiurl = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = "8c5fb5f3eb2951506bf866a3f972385b";
day.innerHTML = "Friday";
console.log(day.innerHTML);


function coordinate_success(position){

    var coordinate = position.coords;
    var latitude = coordinate.latitude;
    var longitude = coordinate.longitude;

    console.log("Latitude : " + latitude);
    console.log("Longitude : " + longitude);
    get_weather_by_coordinates(latitude,longitude);

}
async function get_weather_by_coordinates(lat,lon){
    let url = apiurl+"?lat="+lat+"&lon="+lon+"&appid="+apiKey;
    console.log(url);
    let response = await fetch(url);
    let json =  await response.json();
    console.log(json);
}



navigator.geolocation.getCurrentPosition(coordinate_success);
get_weather_by_coordinates(21.170240,72.831062);
//let fetchRes = fetch("https://jsonplaceholder.typicode.com/todos/1");

//fetchRes.then(response => response.json()).then(data => console.log(data));