//En vez del router standard usamos express-promise-router
//para poder usar async await
/*
const express = require('express')
const router = express.Router()
*/
const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

router.get('/', async (req, res) => {
    const query = 'SELECT * FROM users';
    const result = await db.query(query, null);
    res.send(formatSuccessResponse(result.rows));
});

router.post('/', async (req, res)=> {
    const query = 'INSERT INTO users (email, password, timestamp) VALUES ($1, $2, NOW()::timestamp)';
    const result = await db.query(query, [req.body.email, req.body.password]);
    if(result.rows.rowCount > 0){
        res.send(formatSuccessResponse("El usuario se ha agregado correctamente"));
    }else{
        res.send(formatSuccessResponse("No se ha podido agregar al usuario"));
    }
    
} );

router.get('/:id', async (req, res) => {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const result = await db.query(query, [req.params.id]);
    if(result.rows != null && result.rows.length > 0){
        res.send(formatSuccessResponse(result.rows[0]));
    }else{
        res.send(formatSuccessResponse("El usuario no existe"));
    }
    
});

router.put('/:id', async (req, res) => {
    const query = 'UPDATE users SET email=$1, password=$2 WHERE user_id = $3';
    const result = await db.query(query, [req.body.email, req.body.password, req.params.id]);
    const message = `${result.rowCount} filas han sido actualizadas`;
    res.send(formatSuccessResponse(message));
} );

router.delete('/:id', async (req, res) => {
    const query = 'DELETE FROM users WHERE user_id = $1';
    const result = await db.query('DELETE FROM users WHERE user_id = $1', [req.params.id]);
    res.send(formatSuccessResponse("El usuario se ha borrado c"));   
     
});

function formatSuccessResponse(result){
    console.log("el resultado es : " + result);
    return JSON.stringify({responseCode:"OK", resultado: result});
}

module.exports = router;