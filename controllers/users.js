const getDb = require('../data/database').getDb;
const { ObjectId } = require('mongodb');

//swagger.tags=['users']
const getAll = async (req, res) => {
  try {
    const db = await getDb();
    const users = await db.collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//swagger.tags=['users']
const getSingle = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate ObjectId format
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//swagger.tags=['users']
const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = await getDb();
    const response = await db.collection('users').insertOne(user);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create user.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//swagger.tags=['users']
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = await getDb();

    const response = await db.collection('users').replaceOne(
      { _id: new ObjectId(userId) },
      user
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found or no changes made.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//swagger.tags=['users']
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const db = await getDb();

    const response = await db.collection('users').deleteOne({
      _id: new ObjectId(userId)
    });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};