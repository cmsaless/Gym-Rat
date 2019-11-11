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

// Allowing mongoose to use the global promise functionality (resolves an error)
mongoose.Promise = global.Promise;

// Making the database connection to MongoDB
// Database container -> port 27017 -> database "dopat"
// 'mongodb' gets resolved by the internal docker network to the mongodb container
mongoose.connect('mongodb://localhost:27017/Gym-Rat', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => {
        console.log('Database connected');
    }).catch(err => {
        console.log('Database connection failed');
    });

// This tells the app to serve static HTML files from the server as our views.
app.use(express.static(path.join(__dirname, 'views')));

// This tells the app to use the handlebars engine to render our views.
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    helpers: {},
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

// Telling the server what directory the view files are located in.
app.set('views', __dirname + '/views');

// This variable points to the directory of the routes.
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
app.use('/info', info)

app.listen(port, () => {
    console.log("Listening on port: " + port);
});