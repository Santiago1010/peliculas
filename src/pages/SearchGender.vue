<template>
	<h4>Todas las películas:</h4>
	<q-card class="movie-card">
		<q-img src="https://images3.alphacoders.com/118/thumb-1920-1185634.jpg"></q-img>

		<q-card-section>
			<span class="text-h6">The Batman</span>
			<p>con Robert pattinson</p>
		</q-card-section>

		<q-card-actions align="around">
			<q-btn rounded flat>
				<q-icon  name="add" />
				<q-tooltip>Haz click para agregarlo a tu lista.</q-tooltip>
			</q-btn>

			<q-btn rounded flat>
				<q-icon  name="search" />
				<q-tooltip>Haz click para saber más de esta película.</q-tooltip>
			</q-btn>

			<q-btn rounded flat>
				<q-icon  name="delete" />
				<q-tooltip>Haz click para eliminar esta película.</q-tooltip>
			</q-btn>

			<q-btn rounded flat>
				<q-icon  name="share" />
				<q-tooltip>Haz click para compartir esta película.</q-tooltip>
			</q-btn>
		</q-card-actions>
	</q-card>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import api from '../assets/scripts/axios.js'

	const route = useRoute();

	const allMovies = ref(null)

	const readMoviesPerGender = () => {
		api.get('/AdvancedSearch/' + import.meta.env.VITE_API_KEY +  '?genres=' + route.params.genres).then(response => {
			allMovies.value = response.data.results
		}).catch(error => console.error('Error: ' + error))
	}

	onMounted(() => {
		//readMoviesPerGender()
	})
</script>

<style scoped>
	.movie-card {
		max-width: 300px;
		text-align: center;
	}

	.movie-card h6,
	.movie-card p {
		color: #000000;
		line-height: 1;
	}
</style>