const connection = require('../db.js')

//funzione gestione degli errori
function errorsHandler(err, _, res) {
	res.status(500).json({
		message: err.message,
	})
}

//funzione gestione delle rotte non trovate
function notFound(req, res) {
	res.status(404).json({
		error: 'Not found',
		message: 'Pagina non trovata',
	})
} 
//funzione che vede se esiste l'id
function existsId(req, res, next){
    const id =  req.params.id
    const query = `
    select * 
    from movies
    where id = ?`

    connection.query(query, id, (err, results)=>{
        if(err){
            return results.status(500).json({ error: 'Database query failed' });
        }
        if(results.length === 0) { //se il risultato è zero cioè nessun elemento preso mandiamo un messaggio di errore
            return res.status(404).json({
                    error: 'Not Found',
                    message: 'movie not found',
            })
        }
    })

    next();
}

module.exports = {errorsHandler, notFound, existsId }