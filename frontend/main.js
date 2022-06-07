import {fields, weatherCodes, precipitationType} from "./weatherCodes.js";

const url = "http://localhost:3000";

const wKeys = Object.keys(weatherCodes);
const pKeys = Object.keys(precipitationType);
const clouds = document.querySelector("#clouds");
const windTemp = document.querySelector("#wind-temp");
const tempField = document.querySelector("#tempreture");
const overview = document.querySelector("#overview");
const hourly = document.querySelector("#hourly");
const upcoming = document.querySelector("#upcoming");
const leftButton = document.querySelector("#left-scroll");
const rightButton = document.querySelector("#right-scroll");
const place = document.querySelector("#place-time");
const previous = document.querySelector("#previous");
let wReport ="";
let location = 3;

rightButton.addEventListener("click", scrollRight);
leftButton.addEventListener("click", scrollLeft);

async function getWeather() {
  const response = await fetch(`${url}/weather/`)
  .then(function(response){
    return response.json();
  })
  .then(function(response){
    wReport = response.payload.data;
    createReport(response.payload.data.timelines[2].intervals[0]);
    otherTimes(response.payload.data.timelines[0].intervals[3].values.weatherCode);
    otherTimes(response.payload.data.timelines[0].intervals[4].values.weatherCode);
    otherTimes(response.payload.data.timelines[0].intervals[5].values.weatherCode);

    previousTimes(response.payload.data.timelines[0].intervals[2].values.weatherCode);
    previousTimes(response.payload.data.timelines[0].intervals[1].values.weatherCode);
    previousTimes(response.payload.data.timelines[0].intervals[0].values.weatherCode);

    console.log(response.payload.data);
    console.log(wReport);
  });
 };

function otherTimes(code){
  const weatherImage = document.createElement("object");
  weatherImage.data=setWeatherImage(code);
  weatherImage.width="80";
  weatherImage.height="80";
  upcoming.appendChild(weatherImage);
}

function previousTimes(code){
  const weatherImage = document.createElement("object");
  weatherImage.data=setWeatherImage(code);
  weatherImage.width="80";
  weatherImage.height="80";
  previous.appendChild(weatherImage);  
}

 //scrolls the hour one to the right 
function scrollRight(){
  location +=1;
  refresh();
  createReport(wReport.timelines[0].intervals[location]);
  otherTimes(wReport.timelines[0].intervals[location+1].values.weatherCode);
  otherTimes(wReport.timelines[0].intervals[location+2].values.weatherCode);
  otherTimes(wReport.timelines[0].intervals[location+3].values.weatherCode);

  previousTimes(wReport.timelines[0].intervals[location-3].values.weatherCode);
  previousTimes(wReport.timelines[0].intervals[location-2].values.weatherCode);
  previousTimes(wReport.timelines[0].intervals[location-1].values.weatherCode);
}

 //scrolls the hour one to the left 
function scrollLeft(){
  location -=1;
  refresh();
  createReport(wReport.timelines[0].intervals[location]);
  otherTimes(wReport.timelines[0].intervals[location+1].values.weatherCode);
  otherTimes(wReport.timelines[0].intervals[location+2].values.weatherCode);
  otherTimes(wReport.timelines[0].intervals[location+3].values.weatherCode);

  previousTimes(wReport.timelines[0].intervals[location-3].values.weatherCode);
  previousTimes(wReport.timelines[0].intervals[location-2].values.weatherCode);
  previousTimes(wReport.timelines[0].intervals[location-1].values.weatherCode);
}

function refresh(){
  tempField.innerText ="";
  windTemp.innerText ="";
  clouds.innerText = "";
  overview.innerText = "";
  upcoming.innerText = "";
  hourly.innerText = "";
  previous.innerText = "";
}

 //get appropriate image for weather from code
 function setWeatherImage(code){
  
  if(code === 1000){
    return "./images/Sun.svg";
  }if(code === 1100 || code === 1101){
    return "./images/Sun-Cloud.svg";
  }if(code === 1001 || code === 1102){
    return "./images/Cloudy.svg";
  }if(code === 2000){
    return "./images/Fog.svg";
  }if(code === 2100){
    return "./images/Light-Fog.svg";
  }if(code === 4000 || code === 4200 || code === 4201){
    return "./images/Rain.svg";
  }if(code === 5001 || code === 5101 || code === 6000 || code === 6001 || code === 6200 || code === 6201 || code === 7000 || code === 7101 || code === 7102){
    return "./images/Snow.svg"
  }if(code === 8000){
    return "./images/Thunderstorm.svg";
  };
};
  
function createReport(report) {

  const cloudBase = report.values.cloudBase;
  const cloudCeiling = report.values.cloudCeiling;
  const cloudCover = report.values.cloudCover;
  const rainIntensity = report.values.precipitationIntensity;
  const rainType = report.values.precipitationType;
  const tempreture = report.values.temperature;
  const tempFeeling = report.values.temperatureApparent;
  const weather = report.values.weatherCode;
  const windDirection = report.values.windDirection;
  const windGust = report.values.windGust;
  const windSpeed = report.values.windSpeed;

  
  const weatherImage = document.createElement("object");
  weatherImage.data=setWeatherImage(weather);
  weatherImage.width="150";
  weatherImage.height="150";
  hourly.appendChild(weatherImage);

  const values = [];
  values.push(`${cloudBase} km`);
  values.push(`${cloudCeiling} km`);
  values.push(`${cloudCover} km`);
  values.push(`${rainIntensity} mm/hr`);
  values.push(`${tempreture} \u2103`);
  values.push(`${tempFeeling} \u2103`);
  values.push(`${windDirection} degrees`);
  values.push(`${windGust} km/h`);
  values.push(`${windSpeed} km/h`);

  //sets the values in the clouds section of webpage
  for(let i=0; i<4; i++){
    let p = document.createElement("p");
    p.innerText = fields[i]+values[i];
    clouds.appendChild(p); 
  }
  //sets the values in windTemp section of webpage
  for(let i=4; i<values.length; i++){
    let p = document.createElement("p");
    p.innerText = fields[i+1]+values[i];
    windTemp.appendChild(p); 
  }
  //sets the rain type according to precipitationType
  for(let i=0; i<pKeys.length; i++){
    if(Number(pKeys[i])=== Number(rainType)){
      let p = document.createElement("p");
      p.innerText = `Precipitation Type: ${precipitationType[pKeys[i]]}`;
      clouds.appendChild(p); 
    }
  }

  let currnetTime = wReport.timelines[0].intervals[location].startTime.slice(11,16);
  place.innerText = `Birmingham : ${currnetTime}`
  tempField.innerText = `${Math.ceil(tempreture)} \u2103`;

  //sets the weather type title according to weatherCodes object
  for(let i=0; i<wKeys.length; i++){
    if(Number(wKeys[i])=== Number(weather)){
      overview.innerText = weatherCodes[wKeys[i]];
    }
  }

};

getWeather();