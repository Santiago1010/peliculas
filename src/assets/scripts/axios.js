import axios from 'axios'

const api = axios.create({
	//baseURL: 'https://imdb-api.com/es/API/',
	baseURL: 'https://api.themoviedb.org/3/'
});

export default api;