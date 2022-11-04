import { defineStore } from 'pinia'
import api from '../axios.js'

export const useMoviesStore = defineStore('movies', {
	state: () => ({
		allMovies: localStorage.movies === null || localStorage.movies === "null" || localStorage.movies === undefined ? null : JSON.parse(localStorage.movies)
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
		},
		addFavories(id) {
			console.clear()
			if (localStorage.favorites === undefined || localStorage.favorites === null) {
				localStorage.setItem('favorites', JSON.stringify(JSON.parse(localStorage.movies).filter(m => m.id === parseInt(id))))
			} else {
				if (this.verifyFavorites(id) === undefined) {
					let favorites = JSON.parse(localStorage.favorites)
					favorites.push(JSON.parse(localStorage.movies).filter(m => m.id === parseInt(id))[0])
					localStorage.favorites = JSON.stringify(favorites)
				}
			}

			console.log(localStorage.favorites)
		},
		verifyFavorites(id) {
			return localStorage.favorites !== null && localStorage.favorites !== "null" && localStorage.favorites !== undefined ? JSON.parse(localStorage.favorites).filter(m => m.id === parseInt(id))[0] : true
		},
		removeFavorites(id) {
			console.clear()
			let index = JSON.parse(localStorage.favorites).findIndex(m => m.id === parseInt(id))
			JSON.parse(localStorage.favorites).splice(index, 1)
		}
	}
});