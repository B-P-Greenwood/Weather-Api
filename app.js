import express from "express";
import {html} from "./config.js";
import weatherRouter from "./routes/weather.js";

const app = express();
const PORT = 3000;

app.use(express.static("frontend"));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(html);
})
app.use("/weather", weatherRouter);
app.listen(PORT);

export default app;