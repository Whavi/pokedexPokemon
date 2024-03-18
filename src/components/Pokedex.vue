<script setup>
import { onMounted, ref } from "vue";

const pokemon = ref([]);
const pokemonName = ref("");
const pokemonId = ref(1);
const pokemonImg = ref("");
const pokemonType = ref("");
const pokemonDescription = ref("");
const pokemonWeight = ref("");
const pokemonHeight = ref("");
const pokemonFicheId = ref("");
const pokemonAbilities = ref("");

const fetchPokemonData = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`);
    const data = await response.json();
    pokemon.value = [...data.stats];
    pokemonName.value = data.name;
    pokemonAbilities.value = data.abilities.map((ability) => ability.ability.name);
    pokemonType.value = data.types.map((type) => type.type.name).join(", ");
    pokemonDescription.value = data.description;
    pokemonWeight.value = data.weight;
    pokemonHeight.value = data.height;
    pokemonFicheId.value = data.id;
    pokemonImg.value = data.sprites.front_default;

    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId.value}/`);
    const speciesData = await speciesResponse.json();
    const englishEntry = speciesData.flavor_text_entries.find((entry) => entry.language.name === "fr");
    pokemonDescription.value = englishEntry ? englishEntry.flavor_text : "Description non disponible";

  } catch (error) {
    console.error("Erreur lors de la récupération des données du Pokémon:", error);
  }
};

const changePokemon = (offset) => {
  pokemonId.value = Math.max(1,  parseInt(pokemonId.value, 10) + offset);
  fetchPokemonData();
};

const resetPokemon = () => {
  pokemonId.value = 1;
  fetchPokemonData();
};

const onNext = () => { changePokemon(1); };
const onNextUp = () => { changePokemon(10); };
const onPrevious = () => { changePokemon(-1); };
const onPreviousDown = () => { changePokemon(-10); };
const onEnter = () => { fetchPokemonData(); };
const onUp = () => { onNext();};
const onBigUp = () => { onNextUp(); };
const onDown = () => { onPrevious(); };
const onBigDown = () => { onPreviousDown(); };

onMounted(fetchPokemonData);
</script>

<template>
  <div class="pokedex">
    <div class="pokedex-img">
      <img src="/pokedex_1.png" alt="Pokedex">
    </div>

    <div class="pokedex-id">
      <p>ID :</p>
      <input v-model="pokemonId" @keyup.enter="onEnter" class ="champ-pokemon-id" type="text" name="pokemon-id" placeholder="ID" pattern="[0-9]{4}" maxlength="4">
    </div>

    <div class="pokedex-name">
      <p>Nom :</p>
      <input readonly v-model="pokemonName" class="champ-pokemon-name" type="text" name="pokemon-name" placeholder="Nom du pokémon">
    </div>

    <div class="pokedex-desc">
      <div class="imgPokemon">
        <img :src="pokemonImg" :alt="pokemonName">
      </div>

      <div class="pokeName">
        <p> Nom : {{pokemonName || 'Nom inconnu'}} </p>
      </div>

      <div class="pokeId">
        <p> ID : {{pokemonFicheId || 'ID inconnu'}} </p>
      </div>

      <div class="pokeTypes">
        <h6>Types :</h6>
        <p> {{pokemonType ||'Aucun types'}} </p>
      </div>

      <div class="pokeHeight">
        <p> Taille : {{pokemonHeight || 0 }} m </p>
        </div>

        <div class="pokeWeight">
          <p> Poids : {{pokemonWeight || 0 }} kg </p>
      </div>

      <div class="pokeDesc">
        <h6>Description : </h6>
        <p> {{pokemonDescription ||'Aucune description'}} </p>
      </div>

      <div class="pokeAbi">
        <p> Talents : {{pokemonAbilities || 'Aucun talents'}} </p>
      </div>

      <div class="stats">
        <div class="pokeStats">
          <h6> Statistiques :</h6>
          <li v-for="poke in pokemon">
            <p> {{poke.stat.name}} : {{poke.base_stat || 0}} </p>
          </li>
        </div>
      </div>
    </div>

    <div class="buttons">
      <div class="btn-top-bot">
        <button class="btn-top" @click="onNextUp" @keyup.up="onUp">  </button>
        <button class="btn-bot" @click="onPreviousDown" @keyup.up="onDown"  > </button>
      </div>

      <div class="btn-left-right">
        <button class="btn-left" @click="onPrevious" @keyup.up="onBigDown"> </button>
          <button class="btn-right" @click="onNext" @keyup.up="onBigUp">  </button>
      </div>

      <div class="submit">
        <button class="pokemon-submit" @click="onEnter" value="Rechercher" ></button>
      </div>
      <div class="return">
        <button class="pokemon-return" @click="resetPokemon" value="Retour">  </button>
      </div>
    </div>
    <div class="bgColorDesc"></div>
  </div>
</template>

<style scoped>
.pokedex-img {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32%;
  top : 150px;
  left: 670px;
}

img {
  border-radius: 11px;
  width: 80%;
}

.pokedex-name {
  position: absolute;
  top: 364px;

  display: flex;
}

.pokedex-id{
  position: absolute;
  top: 700px;
  left: 1100px;
  display: flex;
}

.pokedex-id p,
.pokedex-name p {
  color: black;
  font-size: 18px;
  font-weight: bold;
}

.pokedex-name {
  left: 790px;
  top: 700px;
}

.pokedex-desc {
  position: absolute;
  top: 200px;
  left: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 228px;
  align-items: center;
  z-index: 1;

}

.stats {
  position: absolute;
  top: 200px;
  left: 250px;
}

.pokeStats h6 {
  position: absolute;
  color: black;
  text-decoration: underline;
  font-size: 20px;
  top: -45px;
  left: -45px;
}

.pokeStats {
  display: flex;
  flex-direction: column;
  width: 100px;
  text-decoration: none;
  list-style: none;
}

.pokeStats li {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 4px;
}

.imgPokemon {
  position: absolute;
  top: 120px;
  left: -40px;
  width: 350px;
}

.pokedex-desc p {
  color: black;
  font-size: 10px;
  font-weight: bold;
}

.champ-pokemon-id {
  position: absolute;
  left: 40px;
  top: 4px;
  height: 20px;
  width: 40px;
  font-size: 15px;
  border: none;
  background-color: #8dc641;
  outline: none;
  pointer-events: auto;
}

.champ-pokemon-name {
  position: absolute;
  left: 60px;
  top: 4px;
  pointer-events: none;
  font-size: 15px;
  border: none;
  background-color: #8dc641;
  height: 20px;
  width: 80px;
}

.btn-top-bot {
  position: absolute;
  inset: 750px 200px 60px 805px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
}

.btn-top,
.btn-bot {
  height: 30px;
  width: 30px;
  background: transparent;
}

.btn-left-right {
  position: absolute;
  inset: 780px 200px 50px 773px;
  display: flex;
  justify-content: space-between;
  width: 90px;
}

.btn-left,
.btn-right {
  height: 30px;
  width: 30px;
  background: transparent;
}

.return {
  position: absolute;
  top: 750px;
  left: 1122px;
}

.submit {
  position: absolute;
  top: 794px;
  left: 1145px;
}

.pokemon-submit{
  border-radius: 100%;
  height: 40px;
  width: 40px;
  background: transparent;
}

.pokemon-return{
  border-radius: 100%;
  height: 30px;
  width: 30px;
  background: transparent;
}

.pokeName {
  position: absolute;
  top: 95px;
  left: 0px;
}

.pokeId {
  position: absolute;
  top: 110px;
  left: 0px;
}

.pokeTypes {
  position: absolute;
  top: 400px;
  left: 30px;
}

.pokeTypes h6 {
  color: black;
  text-decoration: underline;
  font-size: 10px;
}

.pokeTypes p {
  color: black;
  font-size: 15px;
}

.pokeDesc {
  position: absolute;
  top: 355px;
  left: 191px;
  width: 181px;
  height: 100px;
}

.pokeDesc h6 {
  color: black;
  text-decoration: underline;
  font-size: 12px;
}

.pokeWeight {
  position: absolute;
  top: 90px;
  left: 200px;
  width: 100px;
}

.pokeHeight {
  position: absolute;
  top: 90px;
  left: 280px;
  width: 100px;

}

.pokeAbi {
  position: absolute;
  top: 102px;
  left: 175px;
  width: 200px;
}
</style>