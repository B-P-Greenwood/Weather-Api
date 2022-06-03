import express from "express";
const app = express();
const PORT = 3000;
import weatherRouter from "./routes/weather.js";

app.get("/", function (req, res){
    res.send("Welcome to my weather app");
});

app.use(express.json());
app.use("/weather", weatherRouter);
app.listen(PORT);

export default app;