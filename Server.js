const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');
const cookieParser =require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('flash');
const passport = require('passport'); 
const mongoose=require('mongoose');
const socketIO = require('socket.io');
const {Users} = require('./helpers/UsersClass');
container.resolve(function (users,_,admin,home,group) {

    
    mongoose.Promise =global.Promise;
    mongoose.connect('mongodb+srv://Ujash:ujash7878@cluster0-ode8r.mongodb.net/test?retryWrites=true', {useNewUrlParser: true},function(err){
        if(err){
            console.log("errpe");
        }
        else{
            console.log("sucessfully connected to mongoDB");
        }
    });  
  //  mongoose.connection.on('connected', function(){});
    

    const app = SetupExprss();

    function SetupExprss() {
        const app = express();

        const server = http.createServer(app);
        const io=socketIO(server);
        server.listen(8081, function () {
            console.log('Listing on port  3000');
        });



        ConfigureExpress(app);
        require('./socket/groupchat')(io,Users);
        require('./socket/friend')(io);
        const router = require('express-promise-router')();

        users.SetRouting(router);
        admin.SetRouting(router);
        home.SetRouting(router);
        group.SetRouting(router);
        app.use(router);
        
    }



    function ConfigureExpress(app) {

        require('./passport/passport-local');
        app.use(express.static('public'));


       app.use(cookieParser());
        app.set('view engine', 'ejs');
       app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(validator());
        
 
         app.use(session({
            secret: 'addyourownsecretkey',
            resave: true,
            saveUninitialized: false,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        })); 

      app.use(flash());
       app.use(passport.initialize());
       app.use(passport.session());

       app.locals._=_;
    }

});