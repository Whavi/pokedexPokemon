<script setup>
import {onMounted, ref} from "vue";

const data = ref({
  pokemons: [],
});

onMounted(async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des Pokémon');
    }

    const data = await response.json();
    data.pokemons = data.results;
  } catch (error) {
    console.error('Erreur lors de la récupération des Pokémon :', error.message);
  }
});
</script>

<template>
  <div>
    <h1>Liste des Pokémon</h1>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>