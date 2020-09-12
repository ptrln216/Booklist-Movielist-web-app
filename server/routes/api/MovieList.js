const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://root:root@bookmovie-kvkhl.mongodb.net/test?retryWrites=true&w=majority';

router.get('/', (req, res) => {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;

        const db = client.db('BookMovie');

        db.collection('movielist').find().toArray((err, result) => {
            if (err) throw err;

            res.send(result);
        })
    })
});

router.post('/', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;

        const db = client.db('BookMovie');

        const newMovie = {
            date: req.body.date,
            title: req.body.title,
            director: req.body.director,
            rating: req.body.rating
        }
        db.collection('movielist').insertOne(newMovie);
        res.status(201).send();
    })
})

router.put('/:id', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;

        const db = client.db('BookMovie');

        const updMovie = {
            date: req.body.date,
            title: req.body.title,
            director: req.body.director,
            rating: req.body.rating,
            _id: new mongodb.ObjectID(req.params.id)
        }
        db.collection('movielist').updateOne({ _id: updMovie._id }, {
            $set: {
                date: updMovie.date,
                title: updMovie.title,
                director: updMovie.director,
                rating: updMovie.rating
            }
        });
        res.status(200).send();
    })
})

router.delete('/:id', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;

        const db = client.db('BookMovie');
        db.collection('movielist').deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
        res.status(200).send();
    })
})

module.exports = router;