import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filters', {
	state: () => ({
		genresFilter: null
	})
});