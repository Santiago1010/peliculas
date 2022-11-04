import { createRouter, createWebHistory } from 'vue-router'

// Importar layouts
import MainLayout from '../../layouts/MainLayout.vue'

// Importar páginas
import Index from '../../pages/Index.vue'
import SearchGender from '../../pages/SearchGender.vue'
import Movie from '../../pages/Movie.vue'
import MyList from '../../pages/MyList.vue'

import NotFound from '../../pages/NotFound.vue'

const routes = [
	{
		path: '/',
		component: MainLayout,
		children: [
			{
				path: '/',
				component: Index
			},
			{
				path: '/generos/:genre/:id',
				component: SearchGender
			},
			{
				path: '/pelicula/:id',
				component: Movie
			},
			{
				path: '/lista',
				component: MyList
			},
		]
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: NotFound
	},
	{
		path: '/:pathMatch(.*)',
		name: 'bad-not-found',
		component: NotFound
	},
]

const router = createRouter({
	routes,
	history: createWebHistory()
})

router.resolve({
	name: 'not-found',
	params: { pathMatch: ['not', 'found'] },
}).href 

export default router;