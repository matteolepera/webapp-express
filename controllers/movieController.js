import connection from "../data/db.js";

function index(req, res, next) {
    const query = `
    SELECT movies.*, CAST(AVG(reviews.vote) AS FLOAT) AS avg_vote FROM movies
    LEFT JOIN reviews
    ON movie_id = movies.id
    GROUP BY movies.id`
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

function storeReview(req, res, next) {
    const data = req.body
    const movieId = req.params.id

    const query = "SELECT * FROM movies WHERE id = ?"
    connection.query(query, [movieId], (err, result) => {
        if (err) return next(err)
        if (result.length === 0) {
            res.status(404)
            return res.json({
                error: "Not Foud",
                message: "Errore del server",
            })
        }

        if (!data.name || !data.vote || !data.vote > 5 || !data.vote < 1) {
            res.status(400)
            return res.json({
                error: "Bad Request",
                message: "Il nome e/o il voto non sono validi.",
            })
        }

        const sql = "INSERT INTO reviews (movie_id, name, vote, text ) VALUES (?, ?, ?, ?);"

        connection.query(sql, [movieId, data.name, data.vote, data.text], (err, sqlResult) => {
            if (err) next(err);

            console.log(sqlResult);


            res.status(201).json({
                message: "recensione inviata correttamente",
            })

        })


    })



}

const controller = {
    index,
    show,
    storeReview,
}

export default controller;