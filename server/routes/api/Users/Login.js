const express = require('express');
const User = require('../../../db.js');
const sha1 = require('sha1');
// CreateToken
const createToken = require('../../../token/CreateToken.js');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient
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

// 登錄
router.post('/', async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
        if (err) throw err;

        // 拿到账号和密码
        let useremail = req.body.email;
        let password = sha1(req.body.password);  //解密
        let doc = await findUser(useremail);

        if (!doc) {
            res.status(200).send({ info: false });
        } else if (doc.password === password) {
            console.log('密碼一致!');
            //生成一个新的token,并存到数据库
            let token = createToken(useremail);
            console.log(token);
            doc.token = token;
            await new Promise((resolve, reject) => {
                doc.save((err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
            res.status(200).send({
                success: true,
                useremail,
                token, //登录成功要创建一个新的token,应该存入数据库
                create_time: doc.create_time
            })
        } else {
            console.log('密碼错误!');
            res.status(200).send({ success: false });
        }
    })
})

module.exports = router;