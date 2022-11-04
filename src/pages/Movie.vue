<template>
	{{ movie.title }}
</template>

<script setup>
	import { ref } from 'vue'
	import { useRoute } from 'vue-router'
	import { useMoviesStore } from '../assets/scripts/store/moviesStore.js'
	import api from '../assets/scripts/axios.js'

	const route = useRoute()
	const moviesStore = useMoviesStore()

	const movie = ref(JSON.parse(localStorage.movies).filter(m => m.id === parseInt(route.params.id))[0])
</script>