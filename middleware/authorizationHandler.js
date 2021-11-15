const config = require("../config.js");

const Auth = {
    simpleAuth: (req, res, next) => {
        var token = req.headers['api-key'];
        if(!token || token != config.API_KEY_GENERAL){//quiere entrar sin token
            res.status(401).send(JSON.stringify({"error":"Valid api-key header required"}));
        }else{
            next();//el token es válido, avanzamos
        }
    }
};

module.exports = Auth;