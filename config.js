var express = require('express');
var handlebars  = require('express-handlebars');
var app = express();
var path = require('path')
const morgan = require('morgan')

app.engine('hbs', handlebars({
	helpers: require("handlebars-helpers")(),
	layoutsDir: __dirname + '/views/layouts',
	extname: 'hbs',
	defaultLayout: "main",
	partialsDir: __dirname + '/views/partials/',
}));

app.set('view engine', 'hbs');
app.use(morgan('dev'));

require("./routes.js")(app);

app.listen(3000);

module.exports = app