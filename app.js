import express from "express";
import moviesRouters from "./routers/movies.js"

const app = express();
const port = process.env.SERVER_PORT;

app.use("/api/movies", moviesRouters)

app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port} :)`)
})