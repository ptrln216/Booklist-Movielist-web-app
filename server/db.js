const mongoose = require('mongoose');

const url = 'mongodb+srv://root:root@bookmovie-kvkhl.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url);

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
db.on('error', function () {
    console.log('數據庫連接錯誤');
});
db.on('open', function () {
    console.log('數據庫連接成功！');
});

//声明schema
const userSchema = mongoose.Schema({
    useremail: String,
    password: String,
    token: String,
    create_time: Date
});

//根据schema生成model
const User = mongoose.model('User', userSchema)
module.exports = User;