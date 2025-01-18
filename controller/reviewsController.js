const connection = require('../db')
function store(req, res){
    const {movie_id, name, vote, text, user_email} = req.body;
    
    const query = `
    INSERT INTO reviews (movie_id, name, vote, text, user_email) VALUES
    (?, ?, ?, ?, ?)`;

    connection.query(query, [movie_id, name, vote, text, user_email], (err, results)=>{
        if(err){
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.send("inserimento andato a buon fine")
    })
}

function remove(req, res){
    const id = req.params.id
    const query = `DELETE FROM reviews WHERE id=?`;
    
    connection.query(query, [id], (err, results)=>{
        if(err){
            return results.status(500).json({ error: 'Database query failed' });
        }
        res.send('eliminazione completata')
    })
}

module.exports = { store, remove}