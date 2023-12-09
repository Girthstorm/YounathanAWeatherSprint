import { apiKey } from "./apikey.js";

let city = document.getElementById("city");
let Temp = document.getElementById("Temp");
let Far = document.getElementById("Far")
let Cel = document.getElementById("Cel")
let weatherCond = document.getElementById("weatherCond")
let lon;
let lat;
let unit = "imperial";
let fullState;
let search = document.getElementById("search");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");
let windSpeed = document.getElementById("windSpeed");
let humidity = document.getElementById("humidity");
let ForC = "°F";
let windUnits = document.getElementById("windUnits");
let mphms = "MPH";
let favStr = document.getElementById("favStr");
let favors = [];
let currentCity;
let currentState;
let searchBtn = document.getElementById("searchBtn");
let dates = [];
let newSearch;
let weathericon = document.getElementById("weathericon");
let weatherydoo;

function unitcheck() {
    if (unit === "imperial") {
        ForC = "°F"
    } else {
        ForC = "°C"
    }

    if (unit === "imperial") {
        mphms = "MPH"
    } else {
        mphms = "M/S"
    }
}

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
        case 'New Hampshire': return 'NH';
        case 'New Jersey': return 'NJ';
        case 'New Mexico': return 'NM';
        case 'New York': return 'NY';
        case 'New york': return 'NY';
        case 'North Carolina': return 'NC';
        case 'North Dakota': return 'ND';
        case 'Ohio': return 'OH';
        case 'Oklahoma': return 'OK';
        case 'Oregon': return 'OR';
        case 'Pennsylvania': return 'PA';
        case 'Rhode Island': return 'RI';
        case 'South Carolina': return 'SC';
        case 'South Dakota': return 'SD';
        case 'Tennessee': return 'TN';
        case 'Texas': return 'TX';
        case 'Utah': return 'UT';
        case 'Vermont': return 'VT';
        case 'Virginia': return 'VA';
        case 'Washington': return 'WA';
        case 'West Virginia': return 'WV';
        case 'Wisconsin': return 'WI';
        case 'Wyoming': return 'WY';
        case 'Virgin Islands': return 'VI';
        case 'Puerto Rico': return 'PR';
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
    currentCity = data4[0].name;
    currentState = data4[0].state;
    weatherCond.innerText = (data3.weather[0].main)
    weatherydoo = data3.weather[0].main
    unitcheck()
    windUnits.innerText = mphms;
    maxTemp.innerText = `${Math.trunc(data3.main.temp_max)}${ForC}`
    minTemp.innerText = `${Math.trunc(data3.main.temp_min)}${ForC}`
    windSpeed.innerText = Math.trunc(data3.wind.speed)
    humidity.innerText = data3.main.humidity

    const promise6 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`)
    const data6 = await promise6.json();
    console.log(data6);
    checkIfFavorites()
    if(localStorage.getItem('City') != undefined){
        favors = JSON.parse(localStorage.getItem('City'));
    }
    updateWeatherImage(weatherydoo)
}

function checkIfFavorites(){
    if(favors.includes(`${currentCity}, ${currentState}`)) {
        favStr.src = "./assets/star-fill-copy.svg"
        console.log("yipee");
    } else {
        favStr.src = "./assets/star.svg"
    }
}
checkIfFavorites()

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

console.log(favors)

favStr.addEventListener('click', function(event){
    if (favors.includes(`${currentCity}, ${currentState}`)){
        favStr.src = "./assets/star.svg"
        let nameIndex = favors.indexOf(`${currentCity}, ${currentState}`);
        favors.splice(nameIndex , 1)
        console.log(favors);
        
    } else {
        favors.push(`${currentCity}, ${currentState}`);
        favStr.src = "./assets/star-fill-copy.svg"
        localStorage.setItem('City', JSON.stringify(favors))
        console.log(favors);
    }
})





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

async function Search() {
    newSearch = search.value;
    console.log(newSearch);
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newSearch}&appid=${apiKey}&units=${unit}`);
    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${newSearch}&appid=${apiKey}&units=${unit}`);
    const data = await promise.json()
    console.log(data);
    lat = data.coord.lat
    lon = data.coord.lon

    Temp.innerText = Math.trunc(data.main.temp);
    const promise5 = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`)
    const data5 = await promise5.json();
    console.log(data5);
    fullState = data5[0].state;
    console.log(fullState);
    const TOABR = stateNameToAbbreviation(fullState)
    city.innerText = `${data5[0].name}, ${TOABR}`;
    currentCity = data5[0].name;
    currentState = data5[0].state;
    weatherCond.innerText = (data.weather[0].main)
    unitcheck()
    windUnits.innerText = mphms;
    maxTemp.innerText = `${Math.trunc(data.main.temp_max)}${ForC}`
    minTemp.innerText = `${Math.trunc(data.main.temp_min)}${ForC}`
    windSpeed.innerText = Math.trunc(data.wind.speed)
    humidity.innerText = data.main.humidity;
    weatherydoo = data.weather[0].main;
    fiveDayFetch()
    checkIfFavorites()
    updateWeatherImage(weatherydoo);
}

searchBtn.addEventListener('click', function(event){
    Search();
})
async function fiveDayFetch() {
    const promise6 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newSearch}&appid=${apiKey}&units=${unit}`)
    const data6 = await promise6.json();
    console.log(data6);
}


//Ellie helped me a lot with the five day, credit to her :)
async function fiveDay() {
    let date = new Date();
    for(let i = 0; i < dates.length; i++){
        date.setDate(now.getDate()+1);
        let n = date.getDate() // Day of week
        
    }
    
}
fiveDay()

function updateWeatherImage(weatherydoo) {

    switch (weatherydoo) {
        case 'Clouds':
            weathericon.src = "./assets/cloud-sun-fill.svg";
            console.log("1" + weatherydoo + weathericon.src)
            break;
        case 'Clear':
            weathericon.src = "./assets/sun-fill.svg"
            console.log("2" + weatherydoo + weathericon.src)
            break;
        case 'Snow':
            weathericon.src = "./assets/snowflake-bold.svg"
            console.log("3")
            break;
        case 'Drizzle':
            weathericon.src = "./assets/cloud-rain-fill.svg"
            console.log("4")
            break;
        case 'Rain':
            weathericon.src = "./assets/cloud-rain-fill.svg"
            break;
        case 'Thunderstorm':
            weathericon.src = "./assets/cloud-lightning-fill.svg"
            break;
        case 'Atmosphere':
            weathericon.src = "./assets/cloud-fog-fill.svg"
            break;
        default:
            weathericon.src = ""
            break;
    }
}
