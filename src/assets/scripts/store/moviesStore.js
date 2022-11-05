import { defineStore } from 'pinia'
import api from '../axios.js'

import Action from '../../images/genres/accion.jpg'
import Animation from '../../images/genres/animacion.jpg'
import Belicean from '../../images/genres/belico.jpg'
import Science from '../../images/genres/ciencia.jpg'
import Comedy from '../../images/genres/comedia.jpg'
import Crime from '../../images/genres/crimen.jpg'
import Documentary from '../../images/genres/documental.jpg'
import Drama from '../../images/genres/drama.jpg'
import Family from '../../images/genres/familiar.jpg'
import Fantasy from '../../images/genres/fantasia.jpg'
import History from '../../images/genres/historia.jpg'
import Mistery from '../../images/genres/misterio.jpg'
import Music from '../../images/genres/musical.jpg'
import Romantic from '../../images/genres/romantico.jpg'
import Suspense from '../../images/genres/suspenso.jpg'
import Terror from '../../images/genres/terror.jpg'

export const useMoviesStore = defineStore('movies', {
	state: () => ({
		allMovies: localStorage.movies === null || localStorage.movies === "null" || localStorage.movies === undefined ? null : JSON.parse(localStorage.movies),
		favorites: localStorage.favorites === null || localStorage.favorites === "null" || localStorage.favorites === undefined ? null : JSON.parse(localStorage.favorites),
		newPage: 2,
		genres: [
			{
				id: 28,
				genre: 'Acción',
				description: 'Persecuciones, tiroteos, enfrentamientos, artes marciales y luchas callejeras, armas, explosiones, agresiones y cualquier situación violenta o intensa.',
				image: Action
			},
			{
				id: 16,
				genre: 'Animación',
				description: 'Historias con personajes ficiticios animados de distintas formas que abarcan temas tan complejos, como diversos.',
				image: Animation
			},
			{
				id: 10752,
				genre: 'Bélicos',
				description: 'La acción dramática ocurre alejada de los espacios cotidianos y transitados. Siempre en lugares poco usuales: selvas, desiertos, galaxias, etc.',
				image: Belicean
			},
			{
				id: 878,
				genre: 'Ciencia ficción',
				description: 'Versan sobre la vida de una persona o conjunto de personas. Si bien pueden ser vidas ficcionadas, este género se interpreta siempre como basado en hechos reales.',
				image: Science
			},
			{
				id: 35,
				genre: 'Comedia',
				description: 'El cine cómico se caracteriza, hasta la aparición del sonoro, por la inclusión de gags, chistes o bromas de carácter fundamentalmente visual.',
				image: Comedy
			},
			{
				id: 80,
				genre: 'Crimen',
				description: 'Las películas de crimen, en el sentido más amplio, son un género cinematográfico inspirado en la ficción policíaca del género literario. Las películas de este género generalmente implican varios aspectos de actos criminales, como su preparación, ejecución, detección y detención.',
				image: Crime
			},
			{
				id: 99,
				genre: 'Documental',
				description: 'El documental se caracteriza por presentar la realidad o unos hechos determinados. Tiene una finalidad informativa y didáctica principalmente e intenta exponer la realidad de forma objetiva. La credibilidad es clave en un documental.',
				image: Documentary
			},
			{
				id: 18,
				genre: 'Drama',
				description: 'El drama en el cine presenta historias serias, en las que prevalece el dialogo y la acción orientadas a generar tensión y presentar pasiones conflictivas más que generar humor. Se tratan temas trascendentes sin tener siempre que llevar a la muerte de sus protagonistas.',
				image: Drama
			},
			{
				id: 10751,
				genre: 'Familiares',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Family
			},
			{
				id: 14,
				genre: 'Fantasía',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Fantasy
			},
			{
				id: 36,
				genre: 'Historia',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: History
			},
			{
				id: 9648,
				genre: 'Misterio',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Mistery
			},
			{
				id: 10402,
				genre: 'Musicales',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Music
			},
			{
				id: 10749,
				genre: 'Romance',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Romantic
			},
			{
				id: 53,
				genre: 'Suspenso',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Suspense
			},
			{
				id: 27,
				genre: 'Terror',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Terror
			}
		],
		temporary: null
	}),
actions: {
	readMoviesPerGender(id) {
		if (this.allMovies === null && parseInt(localStorage.genre) !== id) {
			api.get('discover/movie?with_genres=' + id + '&language=es-ES&api_key=' + import.meta.env.VITE_API_KEY).then(response => {
				localStorage.setItem('movies', JSON.stringify(response.data.results))
				this.allMovies = response.data.results
			}).catch(error => console.error('Error: ' + error))
			localStorage.genre = id
		} else if (this.allMovies === null && localStorage.movies !== null) {
			this.allMovies = JSON.parse(localStorage.movies)
		}
	},
	addFavorites(id) {
		api.get('movie/' + id + '?language=es-ES&api_key=' + import.meta.env.VITE_API_KEY).then(response => {
			if (localStorage.favorites === undefined || localStorage.favorites === null || localStorage.favorites === [null] || localStorage.favorites === "null") {
				localStorage.setItem('favorites', JSON.stringify([response.data]))
			} else {
				if (this.verifyFavorites(id) === undefined) {
					let favorites = JSON.parse(localStorage.favorites)
					favorites.push(response.data)
					localStorage.favorites = JSON.stringify(favorites)
				}
			}
		})

		this.favorites = JSON.parse(localStorage.favorites)
		return true;
	},
	verifyFavorites(id) {
		return localStorage.favorites === null || localStorage.favorites === "null" || localStorage.favorites === undefined ? true : JSON.parse(localStorage.favorites).filter(m => m.id === parseInt(id))[0]
	},
	removeFavorites(id) {
		let myList = JSON.parse(localStorage.favorites)
		let index = myList.findIndex(m => m.id === parseInt(id))
		myList.splice(index, 1)
		this.favorites = myList
		localStorage.favorites = JSON.stringify(myList)
		return false
	},
	addNewPage(id) {
		api.get('discover/movie?with_genres=' + id + '&page=' + this.newPage + '&language=es-ES&api_key=' + import.meta.env.VITE_API_KEY).then(response => {
			this.allMovies = this.allMovies.concat(response.data.results)
			console.log(this.allMovies)
			localStorage.movies = null
			localStorage.movies = JSON.stringify(this.allMovies)
			this.newPage++
		}).catch(error => console.error('Error: ' + error))
	},
	removeMovie(id) {
		if (confirm('¿Desea eliminar esta película?')) {
			let movies = JSON.parse(localStorage.movies)
			let index = movies.findIndex(m => m.id === parseInt(id))
			this.temporary = movies.splice(index, 1)
			this.allMovies = movies
			localStorage.movies = JSON.stringify(this.allMovies)
		}
	}
}
});