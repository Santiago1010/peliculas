<template>
	<q-card class="movie-card" dark>
		<q-card-section class="both-movie" horizontal>
			<q-card-section>
				<span class="text-h6">{{ props.title }}</span>
			</q-card-section>

			<q-img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + props.img" class="col-5"></q-img>
		</q-card-section>

		<q-card-actions align="around">
			<q-btn v-if="favorite === false" rounded flat @click="addFavorites(props.id)">
				<q-icon  name="add" />
				<q-tooltip>Haz click para agregarlo a tu lista.</q-tooltip>
			</q-btn>

			<q-btn v-else rounded flat @click="removeFavorites(props.id)">
				<q-icon  name="remove" />
				<q-tooltip>Haz click para eliminarlo de tu lista.</q-tooltip>
			</q-btn>

			<q-btn rounded flat @click="moreMovie(props.id)">
				<q-icon  name="search" />
				<q-tooltip>Haz click para saber más de esta película.</q-tooltip>
			</q-btn>

			<q-btn rounded flat>
				<q-icon  name="delete" @click="removeMovie(props.id)" />
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
	import { useRouter } from 'vue-router'
	import { useMoviesStore } from '../../assets/scripts/store/moviesStore.js'

	const router = useRouter()
	const moviesStore = useMoviesStore()

	const props = defineProps(['title', 'stars', 'id', 'img'])

	const favorite = ref(false)

	const moreMovie = (id) => {
		console.log(id)
		router.push('/pelicula/' + id)
	}

	const addFavorites = (id) => {
		favorite.value = moviesStore.addFavorites(id)
	}

	const removeFavorites = (id) => {
		favorite.value = moviesStore.removeFavorites(id)
	}

	const removeMovie = (id) => {
		moviesStore.removeMovie(id)
	}

	onMounted(() => {
		favorite.value = moviesStore.verifyFavorites(props.id) === undefined ? false : true
	})
</script>

<style scoped>
	.movie-card {
		max-width: 300px;
		text-align: center;
		max-height: 240px;
	}

	.movie-card .titleSection {
		overflow: hidden;
	}

	.movie-card .both-movie {
		max-height: 188px;
		overflow: hidden;
	}

	.movie-card h6,
	.movie-card p {
		color: #000000;
		line-height: 1;
	}
</style>