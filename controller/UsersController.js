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

    let  query= `SELECT *
                 FROM users`

    connection.query(query, (err, results)=>{
        if(err){
            return results.status(500).json({ error: 'Database query failed' });
        }

        results.forEach(user => {
          if(user.email == email ){
             return res.send({ error: 'email gia pesente' });
          }  
         })
    });
        //const query = `INSERT INTO users (email, password) VALUES (?, ?)`;       
}

module.exports = { index, store }