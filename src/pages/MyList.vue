<template>
	<h1>Toda mi lista:</h1>
	<Swiper :slides-per-view="5" :space-between="0" class="q-mx-sm">
		<SwiperSlide v-for="movie in moviesStore.favorites" :key="movie.id">
			<MovieCard :title="movie.title + ' (' + movie.release_date.split('-')[0] +')'" :stars="movie.stars" :img="movie.poster_path" :id="movie.id" />
		</SwiperSlide>
	</Swiper>

	<div class="genresList" v-for="genre in moviesStore.genres" :key="genre.id">
		<h1>Mi lista de {{ genre.genre }}:</h1>
		<Swiper :slides-per-view="5" :space-between="0" class="q-mx-sm">
			<SwiperSlide v-for="movie in filterMovieGenre(genre.id)" :key="movie.id">
				<MovieCard :title="movie.title + ' (' + movie.release_date.split('-')[0] +')'" :stars="movie.stars" :img="movie.poster_path" :id="movie.id" />
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { useMoviesStore } from '../assets/scripts/store/moviesStore.js'

	// Import Swiper styles
	import 'swiper/css';

	import MovieCard from '../components/minis/MovieCard.vue'

	const route = useRoute()
	const moviesStore = useMoviesStore()

	const movie = ref(null)

	const verifyGenre = (genres, genre) => {
		return genres.some(g => g.id === genre)
	}

	const filterMovieGenre = (genre) => {
		return moviesStore.favorites.filter(m => verifyGenre(m.genres, genre))
	}

	onMounted(() => {
		moviesStore.favorites = JSON.parse(localStorage.favorites)
	})
</script>