const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');

const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = 4444;

/********** Maintenance **********/
const ONGOING_MAINTENANCE = false;
app.use('/*', (req, res, next) => {
    if (ONGOING_MAINTENANCE) {
        res.send("Gym Rat is currently down for maintenance!");
    } else {
        next();
    }
})
/********** End Maintenance **********/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// This tells the app look in the "public" folder for static items (js, css, images).
app.use(express.static(path.join(__dirname, 'public')));

// Allowing mongoose to use the global promise functionality (resolves an error)
mongoose.Promise = global.Promise;

// Making the database connection to MongoDB
// Database container -> port 27017 -> database "Gym-Rat"
mongoose.connect('mongodb://localhost:27017/Gym-Rat', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(db => {
        console.log('Database connected');
    }).catch(err => {
        console.log('Database connection failed');
    });

// This tells the app to use the handlebars engine to render our views.
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    helpers: {},
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

// Setting up session
app.use(session({
    secret: 'chrisisbest',
    resave: true,
    saveUninitialized: true
}));

// Adding passport for auth.
app.use(passport.initialize());
app.use(passport.session());

// This lets us use variables across routes
app.use((req, res, next) => {
    // Give the user a variable, make it null if no user
    res.locals.user = req.user || null;
    next();
});

// Telling the server what directory the view files are located in.
app.set('views', __dirname + '/views');

// This variable points to the directory where the route files are.
const __routesdir = __dirname + "/routes/"

// Setting up the various routes for the pages.
const index = require(__routesdir + 'index');
app.use('/', index);

const about = require(__routesdir + 'about');
app.use('/about', about);

const news = require(__routesdir + 'news');
app.use('/news', news);

const stop = require(__routesdir + 'stop');
app.use('/stop', stop);

const info = require(__routesdir + 'info');
app.use('/info', info);

const profile = require(__routesdir + 'profile');
app.use('/profile', profile);

app.listen(port, () => {
    console.log("Listening on port: " + port);
});