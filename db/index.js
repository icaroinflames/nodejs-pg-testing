const { Pool } = require('pg');

const pool = new Pool({
    host: 'database',
    database: 'prueba-docker',
    user: 'admin',
    password: 'password',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

module.exports = {
    query: (text, params, callback) => {
        const start = Date.now();
        return pool.query(text, params, (err, res)=> {
            const duration = Date.now() - start;
            if(!err){
                console.log('executed query', {text, duration, rows: res.rowCount}); //esto es un ejemplo de como pondríamos log a todas las consultas
            }            
            callback(err, res);
        });
    },
    getClient: (callback)=> {
        pool.connect((err, client, done) => {
            //aquí podríamos meter codigo para logs también
            callback(err, client, done);
        });
    }
};
