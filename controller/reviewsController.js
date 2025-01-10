const connection = require('../db')
function store(req, res){
    const {movie_id, name, vote, text} = req.body;
    const query = `
    INSERT INTO reviews (movie_id, name, vote, text) VALUES
    (?, ?, ?, ?)`;

    connection.query(query, [movie_id, name, vote, text], (err, results)=>{
        if(err){
            return results.status(500).json({ error: 'Database query failed' });
        }
        res.send("inserimento andato a buon fine")
    })
}

module.exports = { store }