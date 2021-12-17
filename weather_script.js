let apiurl = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = "8c5fb5f3eb2951506bf866a3f972385b";
var week = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const values = {
    day : document.getElementById("day-display"),
    date: document.getElementById("date-display"),
    city : document.getElementById("location-display"),
    temprature : document.getElementById("weather-temperature"),
    precipitation : document.getElementById("prec-value"),
    humidity : document.getElementById("humid-value"),
    wind : document.getElementById("wind-value"),
    desc : document.getElementById("weather-type"),
    icon : document.getElementById("weather-icon"),
    bgimage : document.getElementById("weather-display-card"),
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
    jsoncallback(json);
}

async function load_json(str1){
    let promise = await fetch(str1);
    let response =  promise.json();
    return response;
}

async function my_load_json(str){
    let data =  await fetch(str).then((response) => {                
        
        if(!response.ok){
            throw "Please input correct city.";
        }
        
        return response.json();
        })

        .then((data)=>{return data;})
        .catch((err) => alert(err));            
        return data;
}

function display_values(json){
    console.log(json);
    const date = timezone_conversion(json["timezone"]);
    values.city.innerHTML = json["name"];
    values.temprature.innerHTML = Math.round(json["main"]["temp"] - 273.15) + " \xB0" + " C";
    values.desc.innerHTML = json["weather"][0]["main"];
    values.precipitation.innerHTML = json["clouds"]["all"] +" %";
    values.humidity.innerHTML = json["main"]["humidity"] + " %";
    values.wind.textContent = json["wind"]["speed"] + " km/h";
    values.icon.src = `./images/${json["weather"][0]["icon"]}.png`;
    values.bgimage.style.backgroundImage = `url(./images/${json["weather"][0]["icon"]}.jpeg)`;
    values.day.innerHTML = week[date.getDay()-1];
    values.date.innerHTML = date.toLocaleString();
}

async function populate_cityDropdown(){
    
    let data = await my_load_json("./current.city.list.json");
    let dropdown_element = document.getElementById("city-drop");

    for (let i = 0; i < data.length; i++) {
        let element = data[i]["name"];
        let option = document.createElement('option');
        option.innerHTML = element;
        dropdown_element.appendChild(option);
    }

}

async function get_city(){
    var selected_city = document.getElementById("city-name").value;
    let url = apiurl+"?q="+selected_city+"&appid="+apiKey;
    let data = await my_load_json(url);
    
    if(typeof data !== "undefined"){
        display_values(data);
    }
}


function timezone_conversion(offset){
    let date = new Date();
    let mydate = new Date(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds(),date.getUTCMilliseconds());
    let upd_date = new Date(mydate.getTime()+offset*1000);
    return upd_date;
}



populate_cityDropdown();
navigator.geolocation.getCurrentPosition(coordinate_success);
