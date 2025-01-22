const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
        //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
        //#swagger.tags = ['Users']
    const user = {
        firstname: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        favcolor: req.body.favcolor,
        birthdate: req.body.birthdate
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(200).send('User created');
    } else {
        res.status(500).send('Error creating user');
    }
};

const updateUser = async (req, res) => {
        //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstname: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        favcolor: req.body.favcolor,
        birthdate: req.body.birthdate
    };
    const response = await mongodb.getDatabase().db().collection('users').updateOne({ _id: userId }, { $set: user });
    if (response.modifiedCount > 0) {
        res.status(200).send('User updated');
    } else {
        res.status(500).send('Error updating user');
    }
};

const deleteUser = async (req, res) => {
        //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(200).send('User deleted');
    } else {
        res.status(500).send('Error deleting user');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};