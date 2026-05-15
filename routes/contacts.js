const router = require('express').Router();

const contactsController = require('../controllers/contacts');

// GET all contacts
router.get('/', contactsController.getAll);

// GET single contact
router.get('/:id', contactsController.getSingle);

// CREATE contact
router.post('/', contactsController.createContact);

// UPDATE contact
router.put('/:id', contactsController.updateContact);

// DELETE contact
router.delete('/:id', contactsController.deleteContact);

module.exports = router;