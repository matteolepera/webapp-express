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

function show(req, res, next) {
    const id = req.params.id
    const query = `SELECT * FROM movies
    WHERE id = ?`

    connection.query(query, [id], (err, result) => {
        if (err) next(err)

        if (result.length === 0) {
            res.status(404)
            return res.json({
                error: "Not Foud",
                message: "Errore del server",
            })
        }
        const movie = result[0];
        res.json(movie)
    })

}

const controller = {
    index,
    show,
}

export default controller;