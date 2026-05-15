const router = require('express').Router();

// Swagger
router.use('/', require('./swagger'));

// Home route
router.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

// Contacts routes (MongoDB CRUD)
router.use('/contacts', require('./contacts'));

// Users routes
router.use('/users', require('./users'));

module.exports = router;