<template>
	<div class="container">
		<div class="box" v-for="genre in genres" :key="genre.id" @click="searchGender(genre.genre, genre.id)">
			<div class="imgBox">
				<img :src="genre.image"/>
			</div>
			<div class="content">
				<h6 class="text-h6">{{ genre.genre }}</h6>
				<p>{{ genre.description }}</p>
			</div>
		</div>
	</div>

	<q-input outlined v-model="filterStore.genresFilter" @update:model-value="filterGenres" label="¿No encuentras lo que buscas?" class="q-mt-xl q-pb-sm search" dark>
		<template v-slot:append>
         	<q-icon name="search" />
        </template>
	</q-input>
</template>

<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	// Importar stores
	import { useFilterStore } from '../assets/scripts/store/filtersStore.js'
	import { useMoviesStore } from '../assets/scripts/store/moviesStore.js'

	const router = useRouter()

	const filterStore = useFilterStore()
	const moviesStore = useMoviesStore()

	const genres = ref(moviesStore.genres)

	const searchGender = (genre, id) => {
		localStorage.movies = null
		moviesStore.allMovies = null
		router.push('/generos/' + genre + '/' + id)
	}

	const filterGenres = () => {
		let indexes = moviesStore.genres.map((g, i) => {
			if (g.genre.toLowerCase().includes(filterStore.genresFilter.toLowerCase())) {
				return i
			}
		})

		genres.value = []

		for (let i = 0; i < indexes.length; i++) {
			if (indexes[i] !== undefined) {
				genres.value.push(moviesStore.genres[indexes[i]])
			}
		}
	}
</script>

<style scoped>
	.container {
		position: relative;
		width: 95%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: auto;
	}

	.container .box {
		position: relative;
		width: 300px;
		height: 300px;
		overflow: hidden;
		transition: 0.5s;
		border-radius: 5px;
		cursor: pointer;
	}

	.container .box:hover {
		z-index: 1;
		transform: scale(1.25);
		box-shadow: 0 25px 40px rgba(0, 0, 0, 0.5);
	}

	.container .box .imgBox {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.container .box .imgBox::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background: linear-gradient(188deg, #F00, #000);
		mix-blend-mode: multiply;
		opacity: 0;
		transition: 0.5s;
	}

	.container .box:hover .imgBox::before {
		opacity: 1;
	}

	.container .box .imgBox img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center center;
	}

	.container .box .content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		/*display: flex;
		align-items: flex-end;*/
		padding: 20px;
	}

	.container .box .content .text-h6 {
		color: #FFFFFF;
		transition: 0.5s;
		text-transform: uppercase;
		margin-bottom: 5px;
		font-size: 20px;
		transform: translateY(300px);
	}

	.container .box:hover .content .text-h6 {
		transform: translateY(0);
		transition-delay: 0.3s;
	}

	.container .box .content p {
		color: #FFFFFF;
		transform: translateY(300px);
		transition: 0.5s;
		font-size: 14px;
	}

	.container .box:hover .content p {
		transform: translateY(0);
		transition-delay: 0.4s;
	}

	.search {
		max-width: 50%;
		margin-left: 25%;
	}
</style>