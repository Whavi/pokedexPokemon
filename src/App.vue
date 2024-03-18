<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GeneratorPokemon from "@/components/GeneratorPokemon.vue";

</script>

<template>
    <header>
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/pokedex">Pokédex </RouterLink>
        <RouterLink to="/GeneratorPokemon">Generateur de pokemon</RouterLink>
      </nav>
    </header>
<RouterView></RouterView>

</template>

<style scoped>


nav {
  position: absolute;
  display: flex;
  justify-content: center;
  top : 10px;
  left: 110px;
  width: 90%;
  font-size: 10px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  font-size: 25px;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

</style>
