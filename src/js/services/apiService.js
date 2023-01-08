import axios from 'axios';

const API_KEY = '1aa8151ecc72e8e6dae871e3aeaed3b2';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  getTrendingMovies() {
    const tredingFilms = axios
      .get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${this.page}`)
      .then(({ data }) => data);
    return tredingFilms;
  }

  getMovieByQuery() {
    const filmsByQuery = axios
      .get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`,
      )
      .then(({ data }) => data);

    return filmsByQuery;
  }
  getMovieById() {
    const genresIds = axios
      .get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then(({ data }) => data.genres);

    return genresIds;
  }


  getTrendingMoviesPage(page) {
    const tredingFilms = axios
      .get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`)
      .then(({ data }) => data);
    return tredingFilms;
  }


  getModalMovie(movieId) {
    const movieById = axios
      .get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
      .then(({ data }) => data);
    return movieById;
  }
  // вызываем apiService.getModalMovie(id-фильма);


  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get pageNum() {
    return this.page;
  }
  set pageNum(newPageNum) {
    this.page = newPageNum;
  }
}
