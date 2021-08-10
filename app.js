const express = require('express')
const app = express()
var cors = require('cors')
var morgan = require('morgan');
require('express-async-errors');

const authMdw= require("./middlewares/auth.mdw");

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/films',require('./routes/film.route'));
app.use('/api/v1/actors',authMdw,require('./routes/actor.route'));
app.use('/api/v1/customers',authMdw,require('./routes/customer.route'));
app.use('/api/v1/users',require('./routes/user.route'));
app.use('/api/v1/auth',require('./routes/auth.route'));

app.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
});

app.use(function (req, res, next) {
    res.status(404).json({
        Message:"Not Found!"
    })
  })

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({
        Message:"Something broke!"
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`run server http://localhost:${PORT}`);
})
 