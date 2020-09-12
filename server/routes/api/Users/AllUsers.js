const express = require('express');
const User = require('../../../db.js');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://root:root@bookmovie-kvkhl.mongodb.net/test?retryWrites=true&w=majority';



//找到所有用户
const findAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};

//获得所有用户信息
router.get('/', async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
        if (err) throw err;

        //查询所有用户信息
        let doc = await findAllUsers();
        res.status(200).send({ success: '成功', result: doc });
    })
})

module.exports = router;