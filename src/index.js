require('dotenv').config()
'use strict';

// Require process, so we can mock environment variables
const process = require('process');

// [START app]
const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const path = require('path');
const crypto = require('crypto');
const flash = require('connect-flash');
const session = require('express-session'); 
const mysqlStore = require('express-mysql-session');
const passport = require('passport');


//db keys

const app = express();
require('./lib/passport');
const {database} = require('./keys');



//


app.use(session({
    secret: 'seceto',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
  }));
  
  app.use(morgan('dev'));
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(express.json());
  app.use(passport.initialize()); 
  app.use(passport.session());


  // flash middle-ware
app.use(flash());


//Globar Variables
app.use((req,res,next) => {
  //variables para mensajes Flash
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.errores = req.flash('errores');

  // Vairable local de usuario
  app.locals.user = req.user;
  next();
});


//ROUTES
 app.use(require('./routes/'));
 app.use(require('./routes/api'));
 app.use('/users',require('./routes/users'));
 app.use('/auth',require('./routes/auth'));
// app.use(require('./routes/azure'));
// app.use(require('./routes/fbi'));
// app.use(require('./routes/tests'));
// app.use('/auth',require('./routes/auth'));

// Publics
app.use(express.static(path.join(__dirname, '../public/')));


  app.set('port', process.env.PORT); //puerto 
  app.set('views', path.join(__dirname, 'views')); //vistas
  // view engine
  app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers : require ('./lib/handlebars')
  }));
  
app.set('view engine', '.hbs');

var x = app.get('port');  
app.listen(5000, () => {
  app.listen(x, () => {
    console.log(`App listening on port ${app.get('port')}`); 
  });
});