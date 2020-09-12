const express = require('express');
const User = require('../../../db.js');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://root:root@bookmovie-kvkhl.mongodb.net/test?retryWrites=true&w=majority';

//删除某个用户
const delUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findOneAndRemove({ _id: id }, err => {
            if (err) {
                reject(err);
            }
            console.log('刪除用户成功');
            resolve();
        });
    });
};

//删除某个用户
router.delete('/:id', async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
        if (err) throw err;

        // 拿到要删除的用户id
        let id = req.params.id;
        await delUser(id);
        res.status(200).send({ success: '刪除成功' });
    })
})

module.exports = router;