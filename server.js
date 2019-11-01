const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = 4444;

const __routesdir = __dirname + "/routes/"

app.use(express.static(path.join(__dirname, 'views')));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    helpers: {},
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const index = require(__routesdir + 'index');
app.use('/', index);

const stop = require(__routesdir + 'stop');
app.use('/stop', stop);

const info = require(__routesdir + 'info');
app.use('/info', info)

app.listen(port, () => {
    console.log("Listening on port: " + port);
});