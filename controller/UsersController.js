const connection = require('../db')
const {createHash, compareHash, splitEmail, generateString } = require('../middleware/utils.js');

function index (req, res){
    const {email, password} = req.body;
    let  query= `SELECT *
                 FROM users`
    
    connection.query(query, (err, results)=>{
        if(err) return res.status(500).json({errore: 'query fallita'})
        const passwordHash = createHash(password)
        const result = compareHash(password,passwordHash)
        const name = splitEmail(email) 
        
        const user = results.find(user => user.email === email);

        if(user && result){
            return res.status(200).json({loggato: true, code: name});
        }

        res.json({ loggato: false });
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

        const isPresent = results.find(user => user.email == email)
        
        if(isPresent){
           return res.json({ error: 'email gia pesente' });
        }  
        const passwordHash = createHash(password)

        const query = `INSERT INTO users (email, password) VALUES (?, ?)`;   
        connection.query(query,[email, passwordHash], (err, results)=>{
            if(err){
                return res.status(500).json({ error: 'Database query failed' });
            } 
            const name = splitEmail(email) 
            res.status(200).json({ loggato: true, code: name });
        }) 
    });
        
}

module.exports = { index, store }