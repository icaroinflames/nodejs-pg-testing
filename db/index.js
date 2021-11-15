const { query } = require('express');
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
    async query(text, params){
        const start = Date.now();
        const res = pool.query(text, params);
        const duration = Date.now() - start;
        console.log('executed query', { text, duration, rows: res.rowCount });
        return res;
    },
    async getClient() {
        const client = await pool.connect();

        //Esto de abajo es solo para imprimir las consultas que duran mucho
        const query = client.query;
        const release = client.release;

        const timeout = setTimeout(() => {
          console.error('Un cliente ha tardado más de 5 segundos en ejecutar una consulta!');
          console.error(`La última consulta ha sido: ${client.lastQuery}`);
        }, 5000);
        
        // monkey patch the query method to keep track of the last query executed
        client.query = (...args) => {
          client.lastQuery = args;
          return query.apply(client, args);
        };
        client.release = () => {
          // clear our timeout
          clearTimeout(timeout);
          // set the methods back to their old un-monkey-patched version
          client.query = query;
          client.release = release;
          return release.apply(client);
        };
        return client;
      }    
};
