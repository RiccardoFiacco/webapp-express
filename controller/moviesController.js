const connection = require('../db')

function index (req, res){
    let  query= `SELECT movies.*, AVG(vote) AS avg_vote 
                 FROM movies
                 JOIN reviews
                 ON movies.id = reviews.movie_id `
    
    if(req.query.title){
        query+= `WHERE title LIKE '%${req.query.title}%'`
    }
    
    query+= ` GROUP BY movies.id`
    
    connection.query(query, (err, result)=>{
        if(err) res.status(500).json({errore: 'query fallita'})
        
        res.json(result)
    })
}
// function index(req, res) {
// 	// recuperiamo l'elenco dei books

// 	let sql = `SELECT movies.*, AVG(vote) AS avg_vote 
//                  FROM movies
//                  JOIN reviews
//                  ON movies.id = reviews.movie_id`

// 	// BONUS: aggiungere eventuali filtri
// 	if (req.query.search) {
// 		sql += ` WHERE title LIKE '%${req.query.search}%' OR director LIKE '%${req.query.search}%' OR abstract LIKE '%${req.query.search}%'`
// 	}

// 	sql += ` GROUP BY movies.id`

// 	// BONUS: aggiungere paginazione
// 	// BONUS: aggiungere ordinamento

// 	connection.query(sql, (err, books) => {
// 		// console.log(err)
// 		if (err) return res.status(500).json({ message: err.message })

// 		// BONUS: se abbiamo l'elenco di libri recuperare la media delle valutazioni di ogni libro

// 		books.forEach((book) => {
// 			book.image = `${process.env.BE_HOST}/img/books/${book.image}`
// 		})

// 		res.json(books)
// 	})
// }

function show(req, res){
    const id = req.params.id
    let  query= `SELECT movies.*, AVG(vote) AS avg_vote 
                 FROM movies
                 JOIN reviews
                 ON movies.id = reviews.movie_id
                 WHERE movies.id = ?
                 GROUP BY movies.id`

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