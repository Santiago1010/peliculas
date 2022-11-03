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
</script>

<style scoped>
	h1 {
		text-align: center;
	}
</style>