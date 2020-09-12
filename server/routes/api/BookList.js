const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://root:root@bookmovie-kvkhl.mongodb.net/test?retryWrites=true&w=majority';

router.get('/', (req, res) => {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;

        const db = client.db('BookMovie');

        db.collection('booklist').find().toArray((err, result) => {
            if (err) throw err;

            res.send(result);
        })
    })
});

router.post('/', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;

        const db = client.db('BookMovie');

        const newBook = {
            date: req.body.date,
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
            // categories: req.body.categories
        }
        db.collection('booklist').insertOne(newBook);
        res.status(201).send();
    })
})

router.put('/:id', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;

        const db = client.db('BookMovie');

        const updBook = {
            date: req.body.date,
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
            // categories: req.body.categories,
            _id: new mongodb.ObjectID(req.params.id)
        }
        db.collection('booklist').updateOne({ _id: updBook._id }, {
            $set: {
                date: updBook.date,
                title: updBook.title,
                author: updBook.author,
                rating: updBook.rating,
                // categories: updBook.categories
            }
        });
        res.status(200).send();
    })
})

router.delete('/:id', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;

        const db = client.db('BookMovie');
        db.collection('booklist').deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
        res.status(200).send();
    })
})

module.exports = router;