const express = require('express');
router = express.Router();

const db = require('../db');

router.get('/', (req, res, next) => {
    db.query('SELECT * FROM users', null, (err, result) => {
        if(err) {
            return next(err);
        }
        res.send(result.rows);
    });
});

router.post('/', (req, res, next)=> {
    db.query('INSERT INTO users (email, password, timestamp) VALUES ($1, $2, NOW()::timestamp)', [req.body.email, req.body.password], (err, result) => {
        if(err) {
            return next(err);
        }
        res.send(result.rows);
    });
} );

router.get('/:id', (req, res, next) => {
    console.log('entra en /:id ');
    console.log('req.params.id = ' + req.params.id);
    if(req.params.id != undefined && req.params.id != null){
        db.query('SELECT * FROM users WHERE user_id = $1', [req.params.id], (err, result) => {
            if(err) {
                return next(err);
            }
            res.send(result.rows[0]);
        });
    }else{
        res.send({});
    }   
});



router.put('/:id', (req, res, next)=> {
    db.query('UPDATE users SET email=$1, password=$2 WHERE user_id = $3', [req.body.email, req.body.password, req.params.id], (err, result) => {
        if(err) {
            return next(err);
        }
        res.send(result.rows);
    });
} );

router.delete('/:id', (req, res, next) => {
    db.query('DELETE FROM users WHERE user_id = $1', [req.params.id], (err, result) => {
        if(err) {
            return next(err);
        }
        res.send(result.rows[0]);
    });
});

module.exports = router;