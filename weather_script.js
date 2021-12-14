let apiurl = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = "8c5fb5f3eb2951506bf866a3f972385b";

const values = {
    day : document.getElementById("day-display"),
    date: document.getElementById("date-display"),
    city : document.getElementById("location-display"),
    temprature : document.getElementById("weather-temperature"),
    precipitation : document.getElementById("prec-value"),
    humidity : document.getElementById("humid-value"),
    wind : document.getElementById("wind-value"),
    desc : document.getElementById("weather-type")
}

function coordinate_success(position){

    var coordinate = position.coords;
    var latitude = coordinate.latitude;
    var longitude = coordinate.longitude;
    get_weather_by_coordinates(latitude,longitude,display_values);

}

async function get_weather_by_coordinates(lat,lon,jsoncallback){
    let url = apiurl+"?lat="+lat+"&lon="+lon+"&appid="+apiKey;
    json = await load_json(url);
    //console.log(json);
    jsoncallback(json);
}

async function load_json(str1){
    let promise = await fetch(str1);
    let response =  promise.json();
    return response;
}

function display_values(json){
    console.log(json);
    values.city.innerHTML = json["name"];
    values.temprature.innerHTML = json["main"]["temp"] + " C";
    values.desc.innerHTML = json["weather"][0]["main"];
    values.precipitation.innerHTML = json["clouds"]["all"] +" %";
    values.humidity.innerHTML = json["main"]["humidity"] + " %";
    values.wind.textContent = json["wind"]["speed"] + " km/h";
    //values.date.innerHTML = (new Date()).toString();
}

navigator.geolocation.getCurrentPosition(coordinate_success);
//get_weather_by_coordinates(21.170240,72.831062,display_values);
