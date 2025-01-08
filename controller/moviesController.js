const connection = require('../db')

function index (req, res){
    let  query= 'SELECT * FROM movies '

    if(req.query.title){
        query+= `WHERE title LIKE '%${req.query.title}%'`
    }

    connection.query(query, (err, result)=>{
        if(err) res.status(500).json({errore: 'query fallita'})
        res.json(result)
    })
}

function show(req, res){
    const id = req.params.id
    let  query= 'SELECT * FROM movies WHERE id = ?'

    connection.query(query, [id], (err, result)=>{
        if(err) res.status(500).json({errore: 'query fallita'})

        let finalResult = result[0]

        let  query = 'SELECT * FROM reviews WHERE movie_id = ?'  

        connection.query(query, [id], (err, result)=>{ 
            if(err) res.status(500).json({errore: 'query fallita'})
            
            finalResult.reviews = result;
            res.json(finalResult)
        })
    })
}
function store(req, res){
    const {title, director, genre, release_year, abstract, image} = req.body;

    const query = `
    INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES
    (?, ?, ?, ?, ?, ?)`;

    connection.query(query, [title, director, genre, release_year, abstract, image], (err, results)=>{
        if(err){
            return results.status(500).json({ error: 'Database query failed' });
        }
        res.send("inserimento andato a buon fine")
    })
}

function remove(req, res){
    const id = req.params.id
    const query = `DELETE FROM movies WHERE id=?`;

    connection.query(query, [id], (err, results)=>{
        if(err){
            return results.status(500).json({ error: 'Database query failed' });
        }
        res.send("eliminazione andata a buon fine")
    })
}

module.exports = {index, show, store, remove}