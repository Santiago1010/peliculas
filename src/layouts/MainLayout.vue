<template>
	<q-layout view="hHh lpR fff">
		<q-header elevated class="bg-black text-white">
			<q-toolbar>
				<q-toolbar-title>
					<span class="title">Movies</span>
				</q-toolbar-title>

				<q-btn flat to="/">Inicio</q-btn>
				<!--<q-btn flat>películas</q-btn>-->
				<q-btn flat to="/lista">mi lista</q-btn>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>

		<!--<q-footer elevated class="bg-grey-8 text-white">
			<q-toolbar>
				<q-toolbar-title>
					<q-avatar>
						<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
					</q-avatar>
					<div>Title</div>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>-->
	</q-layout>
</template>

<style scoped>
	.title {
		text-transform: uppercase;
		font-size: 3rem;
	}
</style>