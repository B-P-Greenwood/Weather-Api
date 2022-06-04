import {fields, weatherCodes, precipitationType} from "./weatherCodes.js";

const url = "http://localhost:3000";

const wKeys = Object.keys(weatherCodes);
const pKeys = Object.keys(precipitationType);
const clouds = document.querySelector("#clouds");
const windTemp = document.querySelector("#wind-temp");
const tempField = document.querySelector("#tempreture");
const overview = document.querySelector("#overview");

async function getWeather() {
  const response = await fetch(`${url}/weather/`)
  .then(function(response){
    return response.json();
  })
  .then(function(response){
    console.log(response.payload.data.timelines[0].intervals[0]);
    createReport(response.payload.data.timelines[0].intervals[0]);
  });
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

  //sets the values in the clouds ection of webpage
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

  tempField.innerText = `${Math.ceil(tempreture)} \u2103`;

  //sets the weather type title according to weatherCodes object
  for(let i=0; i<wKeys.length; i++){
    if(Number(wKeys[i])=== Number(weather)){
      overview.innerText = weatherCodes[wKeys[i]];
    }
  }

};

getWeather();