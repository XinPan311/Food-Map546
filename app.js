const express = require("express");
const bodyParser = require("body-parser");

//Init App
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const static = express.static(__dirname + '/public');
const flash = require('connect-flash');
const morgan = require('morgan');
const configRoutes = require("./routes");

const exphbs = require('express-handlebars');
const passport = require('passport');

require('./config')
require('./passport')(passport);
const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },
    layoutsDir: 'views',
    partialsDir: [
        'views/partials/'
    ]
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

app.use(morgan('dev'));
app.use("/public", static);

//BodyParser Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(rewriteUnsupportedBrowserMethods);

//Express Session
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));

//Passport Init
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Connect Flash
app.use(flash());

//View Engine
app.set('view engine', 'handlebars');
// require('./routes/index.js')(app, passport);
app.engine('handlebars', handlebarsInstance.engine);
app.set('views', path.join(__dirname, 'views'));
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
