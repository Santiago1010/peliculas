<template>
	<q-card class="movie-card" dark>
		<q-card-section horizontal>
			<q-card-section>
				<span class="text-h6">{{ props.title }}</span>
			</q-card-section>

			<q-img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + props.img" class="col-5"></q-img>
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
	import { ref, onMounted, defineProps } from 'vue'

	const props = defineProps(['title', 'stars', 'id', 'img'])

	//localStorage.setItem('favorites', JSON.stringify(props))
	//console.log(JSON.parse(localStorage.favorites))
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