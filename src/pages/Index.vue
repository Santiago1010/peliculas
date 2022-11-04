<template>
	<h1>¿Qué género te gustaría ver hoy?</h1>

	<Genres />
</template>

<script setup>
	// Importar funciones
	import { ref, onMounted } from 'vue';
	import api from '../assets/scripts/axios.js'

	// Importar componentes
	import Genres from '../components/Genres.vue'

	onMounted(() => {
		/*api.get('discover/movie?with_genres=28&language=es-ES&api_key=' + import.meta.env.VITE_API_KEY).then(response => {
			console.clear()
			console.log(response.data)
		})*/
	})
</script>

<style scoped>
	h1 {
		text-align: center;
	}
</style>