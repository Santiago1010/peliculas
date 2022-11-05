<template>
	<q-card class="movie-card q-ma-md q-pa-lg" dark>
		<q-card-section class="both-movie" horizontal>
			<q-img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path" class="col-3"></q-img>

			<q-card-section>
				<span class="text-h1">{{ movie.title }} ({{ movie.release_date.split('-')[0] }})</span>

				<div class="q-pa-md q-gutter-md otherGenres">
					<div v-for="genre in movie.genres">
						<q-chip class="chips-pointer" size="18px" color="primary" text-color="white" clickable @click="goToGenre(genre.name, genre.id)">
							{{ genre.name }}
							<q-tooltip>Haz click para ver más películas de {{ genre.name }}.</q-tooltip>
						</q-chip>
					</div>
				</div>

				<p><b>Fecha de realización</b>: {{ movie.release_date }}</p>

				<p>{{ movie.overview }}</p>

				<q-card-actions>
					<q-btn color="warning" @click="router.go(-1)">regresar</q-btn>
					<q-btn v-if="favorite === true" color="info" @click="removeMyList">elimar de mi lista</q-btn>
					<q-btn v-if="favorite === false" color="info" @click="addMyList">agregar a mi lista</q-btn>
					<q-btn color="negative">eliminar película</q-btn>
				</q-card-actions>
			</q-card-section>
		</q-card-section>
	</q-card>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { useMoviesStore } from '../assets/scripts/store/moviesStore.js'
	import api from '../assets/scripts/axios.js'

	// Import components
	import MovieCard from '../components/minis/MovieCard.vue'
	import { Swiper, SwiperSlide } from 'swiper/vue';

	// Import Swiper styles
	import 'swiper/css';

	const route = useRoute()
	const router = useRouter()
	const moviesStore = useMoviesStore()

	const movie = ref(JSON.parse(localStorage.movies).filter(m => m.id === parseInt(route.params.id))[0])
	const favorite = ref(false)

	const readMovie = () => {
		api.get('movie/' + route.params.id + '?language=es-ES&api_key=' + import.meta.env.VITE_API_KEY).then(response => {
			movie.value = response.data
		})
	}

	const goToGenre = (genre, id) => {
		localStorage.movies = null
		moviesStore.allMovies = null
		router.push('/generos/' + genre + '/' + id)
	}

	const readMyList = () => {
		favorite.value = JSON.parse(localStorage.favorites).find(f => f.id === parseInt(route.params.id)) !== undefined ? true : false
	}

	const addMyList = () => {
		favorite.value = moviesStore.addFavorites(route.params.id)
	}

	const removeMyList = () => {
		favorite.value = moviesStore.removeFavorites(route.params.id)
	}

	readMovie()

	onMounted(() => {
		readMovie()
		readMyList()
	})
</script>

<style scoped>
	.otherGenres {
		display: flex;
	}

	.chips-pointer {
		cursor: pointer;
	}
</style>