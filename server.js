const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// middleware routes
app.use('/', require('./routes'));
app.use('/users', require('./routes/users'));

// database connection and server start
const initDb = require('./data/database').initDb;
initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database is connected and listening');
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  }
});