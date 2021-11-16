const express = require('express');
const usersRouter = require("./routes/users");
const auth = require('./middleware/authorizationHandler');

const app = express();

app.use(express.json()); // esto rellena el req.body con lo que viene en el body
//app.use(express.urlencoded({ extended: true })); // para los parametro que vienen con url

let count = 0;

app.get('/', (req, res) =>{
    count ++;
    res.send(`Hello World! this method has been called ${count} times`);
});

app.use(auth.simpleAuth);//para pasar de aquí se requiere autorización

app.use('/users', usersRouter);


//cualquier error que suceda en la app y no sea manejado por otro middleware
//acabará aquí
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

module.exports = app;