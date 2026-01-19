import express from "express";
import moviesRouters from "./routers/movies.js"
import handledError from "./middlewares/handledError.js";
import notFoud from "./middlewares/notFound.js"

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.static("public"));

app.use("/api/movies", moviesRouters)
app.use(notFoud)
app.use(handledError)

app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port} :)`)
})