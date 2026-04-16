require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

// Directus Configuration
const url = process.env.DIRECTUS_URL;
const accessToken = process.env.DIRECTUS_TOKEN;

/**
    @param path  {String}
    @param config {RequestInit}
*/
// Query function for Directus API
async function query(path, config) {
  const res = await fetch(encodeURI(`${url}${path}`), {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    ...config
  });
  return res;
}

// Global query function for routes
app.set('query', query);

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).render('error', { 
    title: '404 - Page Not Found',
    message: 'Oops! The page you are looking for has been tidied away.' 
  });
});

// General Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render('error', { 
    title: 'Error - TidyHands',
    message: 'Something went wrong on our end. We are working on it!' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
