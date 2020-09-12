// index.js is an entry point of vuex
// and combine different modules together
import Vue from 'vue';
import Vuex from 'vuex';
// IMPORT NEEDED MODULES HERE
import BookList from './modules/BookList';
import MovieList from './modules/MovieList';
import User from './modules/User';

// Load Vuex
Vue.use(Vuex);

// Combine different modules and create a Store
// then export so that other components can access the Store
export default new Vuex.Store({
    modules: {
        BookList,
        MovieList,
        User
    }
});