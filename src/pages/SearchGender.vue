<template>
	<h4>Todas las películas de {{ route.params.genre }}:</h4>
	<div class="row">
		<q-input v-model="filterStore.moviesNumber" type="number" class="col-12 q-mb-md" dark outlined label="Ver cantidad de resultados" color="primary" @update:model-value="filterInput"></q-input>
	</div>

	<Swiper :slides-per-view="5" :space-between="0" class="q-mx-sm desktop-only">
		<SwiperSlide v-for="all in moviesStore.allMovies" :key="all.id">
			<MovieCard :title="all.title + ' (' + all.release_date.split('-')[0] +')'" :stars="all.stars" :img="all.poster_path" :id="all.id" />
		</SwiperSlide>

		<SwiperSlide>
			<q-card dark class="more-card" @click="newPage(route.params.id)">
				<q-card-section>
					<h4>MOSTRAR MÁS</h4>
				</q-card-section>
			</q-card>
		</SwiperSlide>
	</Swiper>

	<Swiper :slides-per-view="1.2" :space-between="0" class="q-mx-sm mobile-only">
		<SwiperSlide v-for="all in moviesStore.allMovies" :key="all.id">
			<MovieCard :title="all.title + ' (' + all.release_date.split('-')[0] +')'" :stars="all.stars" :img="all.poster_path" :id="all.id" />
		</SwiperSlide>

		<SwiperSlide>
			<q-card dark class="more-card" @click="newPage(route.params.id)">
				<q-card-section>
					<h4>MOSTRAR MÁS</h4>
				</q-card-section>
			</q-card>
		</SwiperSlide>
	</Swiper>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import { useMoviesStore } from '../assets/scripts/store/moviesStore.js'
	import { useFilterStore } from '../assets/scripts/store/filtersStore.js'
	import { Swiper, SwiperSlide } from 'swiper/vue';

	// Import Swiper styles
	import 'swiper/css';

	// Import components
	import MovieCard from '../components/minis/MovieCard.vue'

	const route = useRoute();

	const allMovies = ref(null)
	const moviesStore = useMoviesStore()
	const filterStore = useFilterStore()

	const disableFilter = ref(false)

	const newPage = (id) => {
		moviesStore.addNewPage(id)
		filterStore.moviesNumber = moviesStore.allMovies.length - 1
	}

	const filterInput = () => {
		if (filterStore.moviesNumber > 0 && filterStore.moviesNumber < moviesStore.allMovies.length) {
			allMovies.value = moviesStore.allMovies.splice(filterStore.moviesNumber)
		}else {
			moviesStore.allMovies = null
			moviesStore.readMoviesPerGender(route.params.id)
			allMovies.value = moviesStore.allMovies
		}
	}

	onMounted(() => {
		moviesStore.allMovies = null
		moviesStore.readMoviesPerGender(route.params.id)
		allMovies.value = moviesStore.allMovies
		filterStore.moviesNumber = parseInt(JSON.parse(localStorage.movies).length - 1)
	})
</script>

<style scoped>
	.more-card {
		background-color: rgba(0, 0, 0, 0.4);
		cursor: pointer;
		height: 240px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 0.5s;
	}
</style>