const jwt = require('jsonwebtoken');
let token = jwt.sign({ foo:'bar' },'shhhhh',{expiresIn:Math.floor(Date.now() / 1000)+24*60*60});

console.log(token)