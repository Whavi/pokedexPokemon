<script setup>
import { ref } from 'vue';


const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const pokemon = ref({
  hp: 0,
  imgSrc: "",
  pokeName: "",
  types: [],
  statAttack: 0,
  statDefense: 0,
  statSpeed: 0,
});


const getPokeData = () => {
  let id = Math.floor(Math.random() * 150) + 1;
  const finalUrl = url + id;
  fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        pokemon.value.hp = data.stats[0].base_stat;
        pokemon.value.imgSrc = data.sprites.front_default;
        pokemon.value.pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        pokemon.value.statAttack = data.stats[1].base_stat;
        pokemon.value.statDefense = data.stats[2].base_stat;
        pokemon.value.statSpeed = data.stats[5].base_stat;
        pokemon.value.types = data.types.map(type => type.type.name);
      });
};

const onNextUp = () => {
  getPokeData();
};
</script>

<template>
  <div class="container">
    <div id="card">
      <p class="hp">
        <span>HP</span>
        {{ pokemon.hp }}
      </p>
      <img :src="pokemon.imgSrc" />
      <h2 class="poke-name">{{ pokemon.pokeName }}</h2>
      <div class="types">
        <span v-for="(type, index) in pokemon.types" :key="index" :style="{ backgroundColor: typeColor[type] }">{{ type }}</span>
      </div>
      <div class="stats">
        <div>
          <h3>{{ pokemon.statAttack }}</h3>
          <p>Attack</p>
        </div>
        <div>
          <h3>{{ pokemon.statDefense }}</h3>
          <p>Defense</p>
        </div>
        <div>
          <h3>{{ pokemon.statSpeed }}</h3>
          <p>Speed</p>
        </div>
      </div>
    </div>
    <button id="btn" @click="onNextUp">Generate</button>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Gill Sans", sans-serif;
}
body {
  background-color: #eff3ff;
}
.container {
  width: 350px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
#card {
  position: relative;
  width: 100%;
  padding: 30px 20px;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.4);
  border-radius: 10px;
}
#card img {
  display: block;
  width: 180px;
  max-height: 200px;
  position: relative;
  margin: 20px auto;
}
.hp {
  width: 80px;
  background-color: green;
  text-align: center;
  padding: 8px 0;
  border-radius: 30px;
  margin-left: auto;
  font-weight: 400;
}
.poke-name {
  text-align: center;
  font-weight: 600;
}
.types {
  display: flex;
  justify-content: space-around;
  margin: 20px 0 40px 0;
}
.hp span,
.types span {
  font-size: 12px;
  letter-spacing: 0.4px;
  font-weight: 600;
}
.types span {
  padding: 5px 20px;
  border-radius: 20px;
  color: #ffffff;
}
.stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}
.stats p {
  color: #404060;
}
#btn {
  display: block;
  padding: 15px 60px;
  font-size: 18px;
  background-color: #101010;
  color: #ffffff;
  position: relative;
  margin: 30px auto;
  border: none;
  border-radius: 5px;
}

#btn:hover{
  background-color: #8dc641;
  transition: 0.8s;
  color: black;
}

</style>
