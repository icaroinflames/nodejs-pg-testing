const express = require('express');

const app = express();

const users = require("./routes/users");

app.use(express.json()); // esto rellena el req.body con lo que viene en el body
//app.use(express.urlencoded({ extended: true })); // para los parametro que vienen con url

let count = 0;

app.get('/', (req, res) =>{
    count ++;
    res.send(`Hello World! this method has been called ${count} times`);
});

app.use('/users', users);

app.listen(5000, ()=> console.log('Server up on port 5000'));