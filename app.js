const express = require('express');
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json()); // esto rellena el req.body con lo que viene en el body
//app.use(express.urlencoded({ extended: true })); // para los parametro que vienen con url

let count = 0;

app.get('/', (req, res) =>{
    count ++;
    res.send(`Hello World! this method has been called ${count} times`);
});

app.use('/users', usersRouter);

module.exports = app;