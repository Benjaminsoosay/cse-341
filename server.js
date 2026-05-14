const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');  
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/', require('./routes'));
app.use('/users', require('./routes/users'));

// Database init and server start
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database is connected and listening');
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  }
});