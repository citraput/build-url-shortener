require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const index = require('./routes/index');
const url = require('./routes/url');
const user = require('./routes/user')
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');


// Connect to database
mongoose.set('useCreateIndex', true);
connectDB();


app.set('views', path.join(__dirname, 'views/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false}))



app.use(express.json({ extended: false}));

// Define Routes
app.use('/', index);
app.use('/', url);
app.use('/', user);
// const PORT = 3000;

app.get('*', function(req, res) {  res.render('error');});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

// app.listen(port, () => console.log(`Server running on port ${port}`))

//===========
// Require static assets from public folder
// app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
// app.set('views', path.join(__dirname, 'views'));

// // Set view engine as EJS
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
