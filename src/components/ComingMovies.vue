<template>
	<div v-for="coming in comingMovies" :key="coming.key">
		<q-card class="my-card">
			<img :src="coming.image">

			<q-card-section>
				<div class="text-h6">{{ coming.fullTitle }}</div>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat round color="red" icon="favorite" />
				<q-btn flat round color="info" icon="add" />
			</q-card-actions>
		</q-card>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import api from '../assets/scripts/axios.js'

	const comingMovies = ref(null);
	const slide = ref(null)

	const readMovies = () => {
		api.get('/ComingSoon/' + import.meta.env.VITE_API_KEY).then(response => {
			comingMovies.value = response.data.items;
			slide.value = response.data.items[0].id;

			console.log(comingMovies.value)
		})
	}

	onMounted(() => {
		//readMovies()
	})
</script>

<style scoped>
	.my-card {
		max-width: 300px;
		text-align: center;
	}

	.my-card div {
		line-height: 1.1;
	}
</style>