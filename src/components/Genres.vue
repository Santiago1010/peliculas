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

	import Action from '../assets/images/genres/accion.jpg'
	import Animation from '../assets/images/genres/animacion.jpg'
	import Belicean from '../assets/images/genres/belico.jpg'
	import Science from '../assets/images/genres/ciencia.jpg'
	import Comedy from '../assets/images/genres/comedia.jpg'
	import Crime from '../assets/images/genres/crimen.jpg'
	import Documentary from '../assets/images/genres/documental.jpg'
	import Drama from '../assets/images/genres/drama.jpg'
	import Family from '../assets/images/genres/familiar.jpg'
	import Fantasy from '../assets/images/genres/fantasia.jpg'
	import History from '../assets/images/genres/historia.jpg'
	import Mistery from '../assets/images/genres/misterio.jpg'
	import Music from '../assets/images/genres/musical.jpg'
	import Romantic from '../assets/images/genres/romantico.jpg'
	import Suspense from '../assets/images/genres/suspenso.jpg'
	import Terror from '../assets/images/genres/terror.jpg'

	const router = useRouter()

	const filterStore = useFilterStore()
	const moviesStore = useMoviesStore()

	const genres = ref([
			{
				id: 28,
				genre: 'Acción',
				description: 'Persecuciones, tiroteos, enfrentamientos, artes marciales y luchas callejeras, armas, explosiones, agresiones y cualquier situación violenta o intensa.',
				image: Action
			},
			{
				id: 16,
				genre: 'Animación',
				description: 'Historias con personajes ficiticios animados de distintas formas que abarcan temas tan complejos, como diversos.',
				image: Animation
			},
			{
				id: 12,
				genre: 'Bélico',
				description: 'La acción dramática ocurre alejada de los espacios cotidianos y transitados. Siempre en lugares poco usuales: selvas, desiertos, galaxias, etc.',
				image: Belicean
			},
			{
				id: 878,
				genre: 'Ciencia ficción',
				description: 'Versan sobre la vida de una persona o conjunto de personas. Si bien pueden ser vidas ficcionadas, este género se interpreta siempre como basado en hechos reales.',
				image: Science
			},
			{
				id: 35,
				genre: 'Comedia',
				description: 'El cine cómico se caracteriza, hasta la aparición del sonoro, por la inclusión de gags, chistes o bromas de carácter fundamentalmente visual.',
				image: Comedy
			},
			{
				id: 80,
				genre: 'Crimen',
				description: 'Las películas de crimen, en el sentido más amplio, son un género cinematográfico inspirado en la ficción policíaca del género literario. Las películas de este género generalmente implican varios aspectos de actos criminales, como su preparación, ejecución, detección y detención.',
				image: Crime
			},
			{
				id: 99,
				genre: 'Documental',
				description: 'El documental se caracteriza por presentar la realidad o unos hechos determinados. Tiene una finalidad informativa y didáctica principalmente e intenta exponer la realidad de forma objetiva. La credibilidad es clave en un documental.',
				image: Documentary
			},
			{
				id: 18,
				genre: 'Drama',
				description: 'El drama en el cine presenta historias serias, en las que prevalece el dialogo y la acción orientadas a generar tensión y presentar pasiones conflictivas más que generar humor. Se tratan temas trascendentes sin tener siempre que llevar a la muerte de sus protagonistas.',
				image: Drama
			},
			{
				id: 10751,
				genre: 'Familiar',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Family
			},
			{
				id: 14,
				genre: 'Fantasía',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Fantasy
			},
			{
				id: 36,
				genre: 'Historia',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: History
			},
			{
				id: 9648,
				genre: 'Misterio',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Mistery
			},
			{
				id: 10402,
				genre: 'Musical',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Music
			},
			{
				id: 10749,
				genre: 'Romántico',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Romantic
			},
			{
				id: 53,
				genre: 'Suspenso',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Suspense
			},
			{
				id: 27,
				genre: 'Terror',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: Terror
			},
	])

	const searchGender = (genre, id) => {
		localStorage.movies = null
		moviesStore.allMovies = null
		router.push('/generos/' + genre + '/' + id)
	}

	const filterGenres = () => {
		console.log(genres.value.filter(g => g.genre === 'Acción')[0])
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