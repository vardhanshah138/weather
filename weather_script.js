let apiurl = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = "8c5fb5f3eb2951506bf866a3f972385b";


async function load_json(str1){
    let promise = await fetch(str1);
    let response =  promise.json();
    return response;
}

async function populate_cityDropdown(){
    
    let data = await load_json("./current.city.list.json");
    let dropdown_element = document.getElementById("city-drop");

    for (let i = 0; i < data.length; i++) {
        let element = data[i]["name"];
        let option = document.createElement('option');
        option.innerHTML = element;
        dropdown_element.appendChild(option);
    }

}

function get_city(){
    var div = document.getElementById("city-name");
    console.log(div.value);
}

populate_cityDropdown();



