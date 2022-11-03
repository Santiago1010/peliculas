<template>
	<div class="container">
		<div class="box" v-for="genre in genres" :key="genre.espanol" @click="searchGender(genre.english)">
			<div class="imgBox">
				<img :src="genre.image"/>
			</div>
			<div class="content">
				<h6 class="text-h6">{{ genre.espanol }}</h6>
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

	const router = useRouter()

	const filterStore = useFilterStore()

	const genres = ref([
			{
				espanol: 'Acción',
				english: 'action',
				description: 'Persecuciones, tiroteos, enfrentamientos, artes marciales y luchas callejeras, armas, explosiones, agresiones y cualquier situación violenta o intensa.',
				image: 'https://imdb-api.com/API/ResizeImage?apiKey=k_g3j22m60&size=300x300&url=https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_Ratio0.6757_AL_.jpg'
			},
			{
				espanol: 'Aventura',
				english: 'adventure',
				description: 'La acción dramática ocurre alejada de los espacios cotidianos y transitados. Siempre en lugares poco usuales: selvas, desiertos, galaxias, etc.',
				image: 'https://imdb-api.com/API/ResizeImage?apiKey=k_g3j22m60&size=300x300&url=https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.7273_AL_.jpg'
			},
			{
				espanol: 'Animación',
				english: 'animation',
				description: 'Historias con personajes ficiticios animados de distintas formas que abarcan temas tan complejos, como diversos.',
				image: 'https://imdb-api.com/API/ResizeImage?apiKey=k_g3j22m60&size=300x300&url=https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_Ratio0.6757_AL_.jpg'
			},
			{
				espanol: 'Biográfico',
				english: 'bigraphy',
				description: 'Versan sobre la vida de una persona o conjunto de personas. Si bien pueden ser vidas ficcionadas, este género se interpreta siempre como basado en hechos reales.',
				image: 'https://imdb-api.com/API/ResizeImage?apiKey=k_g3j22m60&size=300x300&url=https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_Ratio0.7273_AL_.jpg'
			},
			{
				espanol: 'Comedia',
				english: 'bigraphy',
				description: 'El cine cómico se caracteriza, hasta la aparición del sonoro, por la inclusión de gags, chistes o bromas de carácter fundamentalmente visual.',
				image: 'https://imdb-api.com/API/ResizeImage?apiKey=k_g3j22m60&size=300x300&url=https://m.media-amazon.com/images/M/MV5BMjA0ODYwNzU5Nl5BMl5BanBnXkFtZTcwNTI1MTgxMw@@._V1_Ratio0.6757_AL_.jpg'
			},
			{
				espanol: 'Crimen',
				english: 'crime',
				description: 'Las películas de crimen, en el sentido más amplio, son un género cinematográfico inspirado en la ficción policíaca del género literario. Las películas de este género generalmente implican varios aspectos de actos criminales, como su preparación, ejecución, detección y detención.',
				image: 'https://imdb-api.com/API/ResizeImage?apiKey=k_g3j22m60&size=300x300&url=https://m.media-amazon.com/images/M/MV5BMzE3YzNjMTMtYmEzNC00ZTNkLTkwMWEtNjRhNzk2ZjUxMmMwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6757_AL_.jpg'
			},
			{
				espanol: 'Documental',
				english: 'documentary',
				description: 'El documental se caracteriza por presentar la realidad o unos hechos determinados. Tiene una finalidad informativa y didáctica principalmente e intenta exponer la realidad de forma objetiva. La credibilidad es clave en un documental.',
				image: 'https://imdb-api.com/API/ResizeImage?apiKey=k_g3j22m60&size=300x300&url=https://m.media-amazon.com/images/M/MV5BNTJmZGU5OTktNzllMC00NWNjLThlYjktOTIzNDQ1N2JkMDdjXkEyXkFqcGdeQXVyMTUzODk1Njc@._V1_Ratio1.7838_AL_.jpg'
			},
			{
				espanol: 'Drama',
				english: 'drama',
				description: 'El drama en el cine presenta historias serias, en las que prevalece el dialogo y la acción orientadas a generar tensión y presentar pasiones conflictivas más que generar humor. Se tratan temas trascendentes sin tener siempre que llevar a la muerte de sus protagonistas.',
				image: 'https://imdb-api.com/API/ResizeImage?apiKey=k_g3j22m60&size=300x300&url=https://m.media-amazon.com/images/M/MV5BMTcxNTQ1MzAyOF5BMl5BanBnXkFtZTYwNDg0ODk4._V1_Ratio0.6757_AL_.jpg'
			},
			{
				espanol: 'Familiar',
				english: 'family',
				description: 'Un tono amable y divertido, un final feliz y cerrado, las relaciones personales se sitúan en el centro de la trama y ofrecen aquello que se espera de ellas.',
				image: 'https://imdb-api.com/API/ResizeImage?apiKey=k_g3j22m60&size=300x300&url=https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_Ratio0.6757_AL_.jpg'
			},
	])

	const searchGender = (genres) => {
		router.push('/generos/' + genres)
	}

	const filterGenres = () => {
		console.log(genres.value.filter(g => g.espanol === 'Acción')[0])
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