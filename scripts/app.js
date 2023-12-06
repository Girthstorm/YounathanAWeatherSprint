import { apiKey } from "./apikey.js";

let city = document.getElementById("city");
let Temp = document.getElementById("Temp");
let Far = document.getElementById("Far")
let Cel = document.getElementById("Cel")
let weatherCond = document.getElementById("weatherCond")
let lon;
let lat;
let unit = "imperial"
let fullState;



function stateNameToAbbreviation(fullStateName) {

    switch (fullStateName) {
        case 'Alabama': return 'AL';
        case 'Alaska': return 'AK';
        case 'Arizona': return 'AZ';
        case 'Arkansas': return 'AR';
        case 'California': return 'CA';
        case 'Colorado': return 'CO';
        case 'Connecticut': return 'CT';
        case 'Delaware': return 'DE';
        case 'Florida': return 'FL';
        case 'Georgia': return 'GA';
        case 'Hawaii': return 'HI';
        case 'Idaho': return 'ID';
        case 'Illinois': return 'IL';
        case 'Indiana': return 'IN';
        case 'Iowa': return 'IA';
        case 'Kansas': return 'KS';
        case 'Kentucky': return 'KY';
        case 'Louisiana': return 'LA';
        case 'Maine': return 'ME';
        case 'Maryland': return 'MD';
        case 'Massachusetts': return 'MA';
        case 'Michigan': return 'MI';
        case 'Minnesota': return 'MN';
        case 'Mississippi': return 'MS';
        case 'Missouri': return 'MO';
        case 'Montana': return 'MT';
        case 'Nebraska': return 'NE';
        case 'Nevada': return 'NV';
        case 'New hampshire': return 'NH';
        case 'New jersey': return 'NJ';
        case 'New mexico': return 'NM';
        case 'New york': return 'NY';
        case 'North carolina': return 'NC';
        case 'North dakota': return 'ND';
        case 'Ohio': return 'OH';
        case 'Oklahoma': return 'OK';
        case 'Oregon': return 'OR';
        case 'Pennsylvania': return 'PA';
        case 'Rhode island': return 'RI';
        case 'South carolina': return 'SC';
        case 'South dakota': return 'SD';
        case 'Tennessee': return 'TN';
        case 'Texas': return 'TX';
        case 'Utah': return 'UT';
        case 'Vermont': return 'VT';
        case 'Virginia': return 'VA';
        case 'Washington': return 'WA';
        case 'West virginia': return 'WV';
        case 'Wisconsin': return 'WI';
        case 'Wyoming': return 'WY';
        default: return null;
    }
}

//RUN ON LOAD
async function loadWeather() {
    const promise3 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`)
    const data3 = await promise3.json();
    console.log(data3);

    Temp.innerText = Math.trunc(data3.main.temp);
    const promise4 = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`)
    const data4 = await promise4.json();
    console.log(data4);
    fullState = data4[0].state;
    console.log(fullState);
    const TOABR = stateNameToAbbreviation(fullState)
    city.innerText = `${data4[0].name}, ${TOABR}`;
    weatherCond.innerText = (data3.weather[0].main)
    
}

//Farenheit or however you spell that
Far.addEventListener('click', function(event){
    if(unit !== "imperial"){
    console.log('click')
    unit = "imperial"
    loadWeather()
    }
})
//Celcius BTN
Cel.addEventListener('click', function(event){
    if(unit !== "metric"){
    console.log('click')
    unit = "metric"
    loadWeather()
    }
})



//calling the daily weather
async function dailyWeather() {
    console.log(apiKey);
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=${unit}`);
    const data = await promise.json()
    console.log(data);
}
dailyWeather()

// set date get date 
//Calling the five day forecast
// async function fiveDay() {
//     const promise2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Modesto,California&appid=${apiKey}`);
//     const data2 = await promise2.json()
//     console.log(data2);
// }

// fiveDay()

navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    loadWeather()
}

//Where it says error and position it can be anything, its basically a variable name. Prob safe to keep it the same future Aidan
function errorFunc(error) {
    console.log(error.message)
}

