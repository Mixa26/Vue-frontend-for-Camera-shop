const express = require('express');
const {sequelize, Users, Questions} = require('../models');
const path = require("path");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const e = require('express');
const Joi = require('joi');
const http = require("http");
const history = require('connect-history-api-fallback');
const { Server } = require("socket.io");
const { response } = require('express');
require('dotenv').config({path: __dirname + '/../.env'});

const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: 'http://127.0.0.1:9000',
        methods: ['GET','POST'],
        credentials: true
    },
    allowEIO3: true
});



const options = {root: path.join(__dirname, "../static")};

function validateUser(user){
    const JoiSchema = Joi.object({
      
        username: Joi.string()
                  .required(),
                    
        email: Joi.string()
               .email()
               .min(5)
               .required(), 
                 
        password: Joi.string()
                    .min(4)
                    .required(),

        admin: Joi.boolean(),
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}

function authToken(req, res, next){
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (token === null || token === undefined) return res.status(401).json({ msg: "You're not authorized." });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, res) => {
        if (err) return res1.status(403).json({ msg: "Something went wrong with authorizing your request." });

        let admin = false;
        Users.findOne({where: {id: res.id}})
            .then(usr => {
                if (!usr.admin){return res.status(401).json({ msg: "You're not authorized." });}
                else {
                    req.user = res;

                    next();
                }
            })
            .catch( err => res.status(500).json(err) );
    })
}

var corsOptions = {
    //origin: 'http://192.168.0.22:9000',
    origin: 'http://127.0.0.1:9000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/auth-login', (req, res) => {
    Users.findOne({where: {username: req.body.username}})
    .then(usr => {
        if (bcrypt.compareSync(req.body.password, usr.password)){
            const obj = {
                id: usr.id,
                username: usr.username,
            }
        
            const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET)

            res.json({ token: token });
        } else {
            res.status(400).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => {res.status(400).json({ msg: "Invalid credentials"})});
});

app.post('/auth-register', (req,res) => {
    const obj = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        admin: req.body.admin
    }

    let response = validateUser(obj)
    
    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Users.create(obj).then(rows => {
            const usr = {
                id: rows.id,
                username: rows.username,
            }

            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET)

            res.json({ token: token });
        }).catch(err => {res.status(400).json({msg: "That username is occupied"})})
    }
});

app.get('/questions', (req,res) => {
    Questions.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err))
})

app.post('/questions', (req,res) => {
    const obj = {
        userId: req.body.userId,
        message: req.body.message
    }

    Questions.create(obj)
        .then(res => {res.json(obj)})
        .catch(err => {res.status(501).json(err)})
});

const staticMdl = express.static(path.join(path.join(__dirname, '..'), 'dist'));

app.use(staticMdl);
app.use(history({index: '/index.html'}));
app.use(staticMdl);

app.use(authToken);

app.get('/users', (req,res) => {
    Users.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err))
})

app.put('/users/:id', (req,res) => {
    Users.findOne({where: {id: req.params.id}})
        .then(user => {
            user.username = req.body.username
            user.email = req.body.email
            user.password = bcrypt.hashSync(req.body.password,10)
            user.admin = req.body.admin

            user.save()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

app.delete('/users/:id', (req, res) => {
    Users.findOne({ where: { id: req.params.id } })
        .then(user => {
            user.destroy()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
});

app.post('/users', (req,res) => {
    const obj = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        admin: req.body.admin
    }

    Users.create(obj).then(rows => {
        const usr = {
            id: rows.id,
            username: rows.username
        }
        
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET)

        res.json({ token: token });
    }).catch(err => {res.status(501).json(err)})
});

function authSocket(msg, next){
    if (msg[1].token == null || msg[1].token == undefined || msg[1].token == ''){
        next(new Error('Not authenticated'));
    }
    else{
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    console.log("CONNECTED");
    socket.use(authSocket);

    socket.on('question', msg => {
        Questions.create({message: msg.message})
            .then( rows=> Questions.findOne({ where: { id: rows.id }}))
            .then( msg => {
                console.log(JSON.stringify(msg));
                io.emit('received', JSON.stringify(msg))} )
            .catch( err => {
                console.log(err);
                io.emit('error')} );
    });

    socket.on('error', err => {
        console.log(err);
        socket.emit('error', err.message)});
})

server.listen({port: 8080}, async() => {
    await sequelize.authenticate();
    console.log("Auth server on port 8080.");
});