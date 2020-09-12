const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/booklist', require('./routes/api/BookList.js'));
app.use('/api/movielist', require('./routes/api/MovieList.js'));
// 登錄
app.use('/api/login', require('./routes/api/Users/Login.js'));
// 注冊
app.use('/api/register', require('./routes/api/Users/Register.js'));
// 獲取所有用戶
app.use('/api/users', require('./routes/api/Users/AllUsers.js'));
// 刪除用戶
app.use('/api/delUser', require('./routes/api/Users/DelUser.js'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));