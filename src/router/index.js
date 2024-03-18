import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Pokedex from "@/components/Pokedex.vue";
import GeneratorPokemon from "@/components/GeneratorPokemon.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: Pokedex
    },
    {
      path: '/generatorPokemon',
      name: 'generator',
      component: GeneratorPokemon
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll 10px above the element #main
    return {
      // could also be
      // el: document.getElementById('main'),
      el: '#main',
      // 10px above the element
      top: 10,
    }
  },
})

export default router
