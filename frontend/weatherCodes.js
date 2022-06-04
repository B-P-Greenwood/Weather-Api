export const weatherCodes ={
    0: "Unknown",
    1000: "Clear, Sunny",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    1001: "Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm"
}

export const fields = [
    "Cloud Base: ",
    "Cloud Ceiling: ",
    "Cloud Cover: ",
    "Precipitation Intensity: ",
    "Precipitation Type: ",
    "Temperature: ",
    "Temperature Apparent: ",
    "Wind Direction: ",
    "Wind Gust: ",
    "Wind Speed: "
]

export const precipitationType = {
    "0": "N/A",
    "1": "Rain",
    "2": "Snow",
    "3": "Freezing Rain",
    "4": "Ice Pellets"
  }


/*
{
"startTime": yyyy-mm-ddThh:mm:ss+increment,
"values": {
"cloudBase": height in km,
"cloudCeiling": height in km,
"cloudCover": percentage,
"precipitationIntensity": mm/hr,
"precipitationType": {
      "0": "N/A",
      "1": "Rain",
      "2": "Snow",
      "3": "Freezing Rain",
      "4": "Ice Pellets"
    },
"temperature": celcius,
"temperatureApparent": celcius,
"weatherCode": see above,
"windDirection": 64.53,
"windGust": 10.6,
"windSpeed": 4.57
}
*/