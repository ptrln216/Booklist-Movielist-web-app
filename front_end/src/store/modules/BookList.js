import axios from "axios";

const url = 'http://localhost:5000/api/booklist/'

const state = {
    bookList: [],
    bookListVisible: false,
    addBookFormVisible: false,
    editBookVisible: false
};

const getters = {
    allBooks: (state) => state.bookList,
    addBookFormVisible: (state) => state.addBookFormVisible,
    editBookVisible: (state) => state.editBookVisible
};

const actions = {
    async fetchBookList({ commit }) {
        const response = await axios.get(url);
        commit('setBookList', response.data);
    },
    async addBook({ commit }, bookInfo) {
        const newBook = {
            date: `${bookInfo.date.getFullYear()} / ${bookInfo.date.getMonth() + 1} / ${bookInfo.date.getDate()}`,
            title: bookInfo.bookTitle,
            author: bookInfo.author,
            rating: bookInfo.rating,
        };
        const response = await axios.post(url, newBook);
        commit('newBook', response.data);
    },
    async deleteBook({ commit }, bookId) {
        await axios.delete(`${url}${bookId}`);
        commit('removeBook', bookId);
    },
    async updateBook({ commit }, updBook) {
        const editBook = state.bookList[updBook.index];
        editBook.title = updBook.info.title;
        editBook.author = updBook.info.author;
        editBook.date = `${updBook.info.date.getFullYear()} / ${updBook.info.date.getMonth() + 1} / ${updBook.info.date.getDate()}`;
        editBook.rating = updBook.info.rating;
        const response = await axios.put(`${url}${editBook._id}`, editBook);
        commit('updateBook', response.data);
    }
};

const mutations = {
    setBookList: (state, bookList) => state.bookList = bookList,
    newBook: (state, newBook) => state.bookList.push(newBook),
    removeBook: (state, bookId) => state.bookList = state.bookList.filter(book => book.id !== bookId),
    set_addBookFormVisible: (state, trueOrFalse) => state.addBookFormVisible = trueOrFalse,
    set_bookListVisible: (state, trueOrFalse) => state.bookListVisible = trueOrFalse,
    set_editBookVisible: (state, trueOrFalse) => state.editBookVisible = trueOrFalse,
    updateBook: (state, updBook) => {
        state.bookList.splice(updBook.index, 1, updBook);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};