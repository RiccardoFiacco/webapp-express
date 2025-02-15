const connection = require('../db.js')
const bcrypt = require('bcrypt')
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
    console.log(name, vote)
    req.body.vote = parseInt(vote)

    if(!isNaN(vote) && (vote <= 5 && vote >= 1)){
        if(name.length < 255 && typeof name === 'string'){
            next();
        }else{
            return res.status(500).json({
                error: 'invalid request',
                message: 'nome non corretto',
            })
        }
    }else{
        return res.status(500).json({
            error: 'invalid request',
            message: 'voto non corretto',
        })
    }
}


function trimString(req, res, next){
    const {name, text} = req.body
    req.body.name = name.trim();
    req.body.text = text.trim();
    
    next();
}

//generator string
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString() {
    let result = ' ';
    for ( let i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 10));
    }

    return result;
}



function createHash(password){
    const salt =bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}
function compareHash(raw, hash){
    
    return bcrypt.compare(raw, hash)
}

function splitEmail(email){
  const result = email.split('@');
  return result[0]
}


module.exports = {
    generateString, 
    errorsHandler, 
    notFound, 
    existsId, 
    checkInput, 
    checkInputReviews, 
    checkValueInputReviews, 
    trimString, 
    createHash,
    compareHash,
    splitEmail
}