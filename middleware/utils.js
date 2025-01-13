const connection = require('../db.js')

//funzione gestione degli errori
function errorsHandler(err, _, res, _) {
	res.status(500).json({
		message: err.message,
	})
}

//funzione gestione delle rotte non trovate
function notFound(req, res, _) {
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

function checkInput(req, res, next){
    const { title, director, genre, release_year, abstract, image } = req.body

    if( !title || !director || !genre || !release_year || !abstract || !image){
        return res.status(500).json({
            error: 'invalid request',
            message: 'dati incompleti',
    })
    }

    next();
}
function checkInputReviews(req, res, next){
    const { movie_id, name, vote, text} = req.body
    req.body.vote = parseInt(vote)
    if( !movie_id || !name || !vote || !text){
        return res.status(500).json({
            error: 'invalid request',
            message: 'dati incompleti',
        })
    }

    next();
}
function checkValueInputReviews(req, res, next){
    const { name, vote} = req.body
    req.body.vote = parseInt(vote)
    if( isNaN(vote)||(vote > 5 || vote < 0)|| name.length > 255 || typeof name!== 'string'){
        return res.status(500).json({
            error: 'invalid request',
            message: 'dati non corretti',
        })
    }

    next();
}

function trimString(req, res, next){
    const {name, text} = req.body
    req.body.name = name.trim();
    req.body.text = text.trim();
    
    next();
}
module.exports = {errorsHandler, notFound, existsId, checkInput, checkInputReviews, checkValueInputReviews,trimString}