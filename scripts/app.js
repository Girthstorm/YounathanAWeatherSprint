import { apiKey } from "./apikey.js";

//calling the daily weather
async function dailyWeather() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Modesto,california&units=imperial&appid=${apiKey}`);
    const data = await promise.json()
    console.log(data);
}
dailyWeather()

//Calling the five day forecast
async function fiveDay() {
    const promise2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Modesto, California&appid=${apiKey}`);
    const data2 = await promise2.json()
    console.log(data2);
}

fiveDay()

