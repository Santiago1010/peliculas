import { defineStore } from 'pinia'
import api from '../axios.js'

export const useMoviesStore = defineStore('movies', {
	state: () => ({
		allMovies: null
	}),
	actions: {
		readMoviesPerGender(id) {
			if (this.allMovies === null) {
				api.get('discover/movie?with_genres=' + id + '&language=es-ES&api_key=' + import.meta.env.VITE_API_KEY).then(response => {
					this.allMovies = response.data.results
				}).catch(error => console.error('Error: ' + error))
			}
		}
	}
});