import connection from "../data/db.js";

function index(req, res, next) {
    const query = "SELECT * FROM movies"
    connection.query(query, (err, result) => {
        if (err) next(err)

        res.json({
            totalMovies: result.length,
            movies: result,
        })
    })
}

function show(req, res) {
    console.log("show")
}

const controller = {
    index,
    show,
}

export default controller;