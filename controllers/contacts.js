const getDb = require('../data/database').getDb;
const { ObjectId } = require('mongodb');

// swagger.tags=['contacts']

// GET ALL CONTACTS
const getAll = async (req, res) => {
  try {
    const db = await getDb();

    const contacts = await db
      .collection('contacts')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE CONTACT
const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const db = await getDb();

    const contact = await db.collection('contacts').findOne({
      _id: new ObjectId(contactId)
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE CONTACT
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = await getDb();

    const response = await db.collection('contacts').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create contact.' });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE CONTACT
const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = await getDb();

    const response = await db.collection('contacts').replaceOne(
      { _id: new ObjectId(contactId) },
      contact
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found or no changes made.' });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE CONTACT
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const db = await getDb();

    const response = await db.collection('contacts').deleteOne({
      _id: new ObjectId(contactId)
    });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Contact not found.' });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};