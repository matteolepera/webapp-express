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

    connection.query(query, [id], (err, movieResult) => {
        if (err) next(err)

        if (movieResult.length === 0) {
            res.status(404)
            return res.json({
                error: "Not Foud",
                message: "Errore del server",
            })
        }
        const reviewQuery = `SELECT * FROM reviews
        WHERE movie_id = ?`
        connection.query(reviewQuery, [id], (err, reviewResult) => {
            if (err) next(err)
            const movie = {
                ...movieResult[0],
                reviews: reviewResult,
            };
            res.json(movie)
        })
    })


}

const controller = {
    index,
    show,
}

export default controller;