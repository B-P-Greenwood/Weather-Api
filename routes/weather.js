import express from "express";
const router = express.Router();
import {getWeather} from "../models/weather.js";

router.get("/", async function(req, res){
    const data = await getWeather();
    res.json({sucess : true, payload : data});
})

export default router;