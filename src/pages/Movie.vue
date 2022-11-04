<template>
	{{ movie.title }}
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { useMoviesStore } from '../assets/scripts/store/moviesStore.js'
	import api from '../assets/scripts/axios.js'

	const route = useRoute()
	const moviesStore = useMoviesStore()

	const movie = ref(null)

	onMounted(() => {
		console.clear()
		movie.value = moviesStore.allMovies.filter(m => m.id === parseInt(route.params.id))[0]
	})
</script>