const connection = require('../db')
const {createHash, compareHash } = require('../middleware/utils.js');
const { generateString } = require('../middleware/utils.js');

function index (req, res){
    const {email, password} = req.body;
    let  query= `SELECT *
                 FROM users`
    
    connection.query(query, (err, results)=>{
        if(err) return res.status(500).json({errore: 'query fallita'})
        const passwordHash = createHash(password)
        const result = compareHash(password,passwordHash)
        console.log(result)
        //&& user.password === passwordHash
        const user = results.find(user => user.email === email);
        if(user && result){
            const code = generateString();
            return res.status(200).json({ loggato: true, code: code });
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
        console.log(passwordHash)

        const query = `INSERT INTO users (email, password) VALUES (?, ?)`;   
        connection.query(query,[email, passwordHash], (err, results)=>{
            if(err){
                return res.status(500).json({ error: 'Database query failed' });
            } 
            const code = generateString();
            res.status(200).json({ loggato: true, code: code });
        }) 
    });
        
}

module.exports = { index, store }