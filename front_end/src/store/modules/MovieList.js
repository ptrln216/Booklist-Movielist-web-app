import axios from "axios";

const url = 'http://localhost:5000/api/movielist/'

const state = {
    movieList: [],
    movieListVisible: false,
    addMovieFormVisible: false,
    editMovieVisible: false
};

const getters = {
    allMovies: (state) => state.movieList,
    addMovieFormVisible: (state) => state.addMovieFormVisible,
    editMovieVisible: (state) => state.editMovieVisible
};

const actions = {
    async fetchMovieList({ commit }) {
        const response = await axios.get(url);
        commit('setMovieList', response.data);
    },
    async addMovie({ commit }, movieInfo) {
        const newMovie = {
            date: `${movieInfo.date.getFullYear()} / ${movieInfo.date.getMonth() + 1} / ${movieInfo.date.getDate()}`,
            title: movieInfo.movieTitle,
            author: movieInfo.director,
            rating: movieInfo.rating
        };
        const response = await axios.post(url, newMovie);
        commit('newMovie', response.data);
    },
    async deleteMovie({ commit }, movieId) {
        await axios.delete(`${url}${movieId}`);
        commit('removeMovie', movieId);
    },
    async updateMovie({ commit }, updMovie) {
        const editMovie = state.movieList[updMovie.index];
        editMovie.title = updMovie.info.title;
        editMovie.director = updMovie.info.director;
        editMovie.date = `${updMovie.info.date.getFullYear()} / ${updMovie.info.date.getMonth() + 1} / ${updMovie.info.date.getDate()}`;
        editMovie.rating = updMovie.info.rating;
        const response = await axios.put(`${url}${editMovie._id}`, editMovie);
        commit('updateMovie', response.data);
    }
};

const mutations = {
    setMovieList: (state, movieList) => state.movieList = movieList,
    newMovie: (state, newMovie) => state.movieList.push(newMovie),
    removeMovie: (state, movieId) => state.movieList = state.movieList.filter(movie => movie.id !== movieId),
    set_addMovieFormVisible: (state, trueOrFalse) => state.addMovieFormVisible = trueOrFalse,
    set_movieListVisible: (state, trueOrFalse) => state.movieListVisible = trueOrFalse,
    set_editMovieVisible: (state, trueOrFalse) => state.editMovieVisible = trueOrFalse,
    updateMovie: (state, updMovie) => {
        state.movieList.splice(updMovie.index, 1, updMovie);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};