import { defineStore } from 'pinia'
import api from '../axios.js'

export const useMoviesStore = defineStore('movies', {
	state: () => ({
		allMovies: null
	}),
	actions: {
		readMoviesPerGender(id) {
			if (this.allMovies === null && localStorage.movies === null || localStorage.movies === "null") {
				api.get('discover/movie?with_genres=' + id + '&language=es-ES&api_key=' + import.meta.env.VITE_API_KEY).then(response => {
					localStorage.setItem('movies', JSON.stringify(response.data.results))
					this.allMovies = JSON.parse(localStorage.movies)
				}).catch(error => console.error('Error: ' + error))
			} else if (this.allMovies === null && localStorage.movies !== null) {
				this.allMovies = JSON.parse(localStorage.movies)
			}
		}
	}
});