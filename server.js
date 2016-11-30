var express = require('express');
var path = require('path');
var bp = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3000;

var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body parser Middleware
app.use(bp.json());
app.use(bp.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
    console.log('server started at' +port)
});
 