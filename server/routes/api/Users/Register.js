const express = require('express');
const User = require('../../../db.js');
const sha1 = require('sha1');
// CreateToken
const createToken = require('../../../token/CreateToken.js');
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://root:root@bookmovie-kvkhl.mongodb.net/test?retryWrites=true&w=majority';

// 根据用户名查找用户
const findUser = (useremail) => {
    return new Promise((resolve, reject) => {
        User.findOne({ useremail }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};

//注册
router.post('/', async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
        if (err) throw err;

        const db = client.db('BookMovie');

        let user = new User({
            useremail: req.body.email,
            password: sha1(req.body.password), //加密
            token: createToken(this.useremail), //创建token并存入数据库
        });
        // 将objectid转换为用户创建时间(可以不用)
        user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');
        let doc = await findUser(user.useremail);
        if (doc) {
            console.log('用戶名已經存在');
            res.status(200).send({ success: '用戶名已經存在' });
        } else {
            await new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
            console.log('注册成功');
            res.status(200).send({ success: true });
        }

        db.collection('users').insertOne(user);
    })
})

module.exports = router;