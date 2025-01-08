const connection = require('../db.js')

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
        if(results.length === 0) {
            return res.status(404).json({
                    error: 'Not Found',
                    message: 'movie not found',
            })
        }
    })

    next();
}

module.exports = {existsId}