import dotenv from "dotenv";
dotenv.config();

const apikey = process.env.KEY;  

export async function getWeather(){

      const data = await fetch(`https://api.tomorrow.io/v4/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=1h&units=metric&apikey=$`, {method: "GET", compress: true})
      .then((result) => result.json())
      .catch((error) => console.error("error: " + err));

      return data;
  };