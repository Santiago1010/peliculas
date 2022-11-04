<template>
	<h4>Todas las películas de {{ route.params.genre }}:</h4>
	<Swiper :slides-per-view="5" :space-between="0" class="q-mx-sm">
		<SwiperSlide v-for="all in moviesStore.allMovies" :key="all.id">
			<MovieCard :title="all.title + ' (' + all.release_date.split('-')[0] +')'" :stars="all.stars" :img="all.poster_path" :id="all.id" />
		</SwiperSlide>
	</Swiper>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import { useMoviesStore } from '../assets/scripts/store/moviesStore.js'
	import { Swiper, SwiperSlide } from 'swiper/vue';

	// Import Swiper styles
	import 'swiper/css';

	// Import components
	import MovieCard from '../components/minis/MovieCard.vue'

	const route = useRoute();

	const allMovies = ref(null)
	const moviesStore = useMoviesStore()

	onMounted(() => {
		moviesStore.readMoviesPerGender(route.params.id)
		allMovies.value = moviesStore.allMovies
	})
</script>