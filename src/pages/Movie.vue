<template>
	<q-card class="movie-card q-ma-md q-pa-lg" dark>
		<q-card-section class="both-movie" horizontal>
			<q-img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path" class="col-3"></q-img>

			<q-card-section>
				<span class="text-h1">{{ movie.title }} ({{ movie.release_date.split('-')[0] }})</span>

				<div class="q-pa-md q-gutter-md otherGenres">
					<div v-for="genre in movie.genre_ids">
						<!--<q-chip class="chips-pointer" size="18px" color="primary" text-color="white" clickable @click="goToGenre(readGenre(genre).genre, readGenre(genre).id)">
							{{ readGenre(genre).genre }}
							<q-tooltip>Haz click para ver más películas de {{ readGenre(genre).genre }}.</q-tooltip>
						</q-chip>-->
					</div>
				</div>

				<p><b>Fecha de realización</b>: {{ movie.release_date }}</p>

				<p>{{ movie.overview }}</p>

				<q-card-actions>
					<q-btn color="warning" @click="router.go(-1)">regresar</q-btn>
					<q-btn v-if="favorite === true" color="info" @click="removeMyList">elimar de mi lista</q-btn>
					<q-btn v-if="favorite === false" color="info" @click="addMyList">agregar de mi lista</q-btn>
					<q-btn color="negative">eliminar película</q-btn>
				</q-card-actions>
			</q-card-section>
		</q-card-section>

		<q-card-section>
			<h3>Películas similares:</h3>
			<Swiper :slides-per-view="5" :space-between="0" class="q-mx-sm">
				<SwiperSlide v-for="m in similar" :key="m.id">
					<MovieCard :title="m.title + ' (' + m.release_date.split('-')[0] +')'" :img="m.poster_path" :id="m.id" />
				</SwiperSlide>
			</Swiper>
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
	const similar = ref(null)
	const favorite = ref(false)

	const readGenre = (id) => {
		return moviesStore.genres.filter(g => g.id === parseInt(id))[0]
	}

	const readSimilars = () => {
		api.get('movie/' + route.params.id + '/similar?api_key=' + import.meta.env.VITE_API_KEY + '&language=es-ES&page=1').then(response => {
			similar.value = response.data.results
		}).catch(error => console.error(error))
	}

	const goToGenre = (genre, id) => {
		//localStorage.movies = null
		//moviesStore.allMovies = null
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

	onMounted(() => {
		readSimilars()
		readMyList()

		console.log(movie.value)
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