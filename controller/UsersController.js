const connection = require('../db')
const { generateString } = require('../middleware/utils.js');
function index (req, res){
    const {email, password} = req.body;
    let  query= `SELECT *
                 FROM users`
    
    connection.query(query, (err, results)=>{
        if(err) return res.status(500).json({errore: 'query fallita'})

        const user = results.find(user => user.email === email && user.password === password);
        if(user){
            const code = generateString();
            return res.status(200).json({ loggato: code });
        }

        res.send('utente non trovato');
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

        const isPresent = results.find(user.email == email)
        
        if(isPresent){
           return res.status(500).json({ error: 'email gia pesente' });
        }  
       
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