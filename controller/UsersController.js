const connection = require('../db')

function index (req, res){
    let  query= `SELECT *
                 FROM users`
    
    connection.query(query, (err, result)=>{
        if(err) res.status(500).json({errore: 'query fallita'})
        res.json(result)
    })
}

function store(req, res){
    const {email, password} = req.body;



    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    connection.query(query, [title, director, genre, release_year, abstract, image], (err, results)=>{
        if(err){
            return results.status(500).json({ error: 'Database query failed' });
        }
        res.send("inserimento andato a buon fine")
    })
}

module.exports = { index, store }