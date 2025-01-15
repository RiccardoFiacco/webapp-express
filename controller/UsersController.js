const connection = require('../db')

function index (req, res){
    const {email} = req.body;
    let  query= `SELECT *
                 FROM users`
    
    connection.query(query, (err, results)=>{
        if(err) res.status(500).json({errore: 'query fallita'})

        results.forEach(user => {
          if(user.email == email ){
             return res.send('utente presente') //potrei tornare oltre al messaggio un valore che simula un cookie
          }  
        })
        res.status(500).json({ error: 'utente non trovato' });
    })
}

function store(req, res){
    const {email, password} = req.body;

    let  query= `SELECT *
                 FROM users`

    connection.query(query, (err, results)=>{
        if(err){
            return res.status(500).json({ error: 'Database query failed' });
        }

        results.forEach(user => {
          if(user.email == email ){
             return res.status(500).json({ error: 'email gia pesente' });
          }  
        })

        const query = `INSERT INTO users (email, password) VALUES (?, ?)`;   
        connection.query(query,[email, password], (err, results)=>{
            if(err){
                return res.status(500).json({ error: 'Database query failed' });
            } 
            res.send('inserimento riuscito')
        }) 
    });
        
}

module.exports = { index, store }