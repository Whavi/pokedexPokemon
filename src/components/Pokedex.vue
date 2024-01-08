<script setup>
import {onMounted, ref, computed} from "vue";

const pokemon = ref([]);
const pokemonName = ref("");
const pokemonId = ref("");
const pokemonImg = ref("");
const pokemonType =ref ("");
const pokemonDescription = ref("");
const pokemonWeight = ref("");
const pokemonHeight = ref("");
const pokemonFicheId = ref("");
const pokemonAbilities = ref("");
const computedPokemonId = computed(() => pokemonId);


const getInfoPokemon = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`);
    const data = await response.json();
    pokemon.value = [...data.stats];
    pokemonName.value = data.name;
    pokemonImg.value = data.sprites.front_default;
    pokemonAbilities.value = data.abilities.map(ability => ability.ability.name);
    pokemonType.value = data.types.map(type => type.type.name).join(", ");
    pokemonDescription.value = data.description;
    pokemonWeight.value = data.weight;
    pokemonHeight.value = data.height;
    pokemonFicheId.value = data.id;

    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId.value}/`);
    const speciesData = await speciesResponse.json();

// Trouver la première entrée en anglais (ou une autre langue de votre choix)
    const englishEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "fr");

// Récupérer la description
    pokemonDescription.value = englishEntry ? englishEntry.flavor_text : "Description non disponible";

    console.log(data.name);
  } catch (error) {
    console.error("Erreur lors de la récupération des données du Pokémon:", error);
  }
};

const changePokemonUp = (offset) => {
    pokemonId.value += offset;
    getInfoPokemon();
};

const resetPokemon = () => {
    pokemonId.value = 0;
    getInfoPokemon();
};

const changePokemonDown = (offset) => {
    pokemonId.value -= offset;
    getInfoPokemon();
};
const onNext = () => {
  changePokemonUp(1);
};

const onNextUP = () => {
    changePokemonUp(10);
};


const onPrevious = () => {
  changePokemonDown(1);
};

const onPreviousDOWN = () => {
    changePokemonDown(10);
};
const onEnter = () => {
  getInfoPokemon(); // Appeler la fonction d'ajout lorsque "Enter" est pressé
};

onMounted(getInfoPokemon);





</script>

<template>
  <div class="pokedex">
    <div class="pokedex-img">
      <img src="/pokedex_1.png" alt="Pokedex">
    </div>

    <div class="pokedex-id">
      <p>ID :</p>
      <input v-model="pokemonId" @keyup.enter="onEnter" class ="champ-pokemon-id" type="text" name="pokemon-id" placeholder="ID pokemon" pattern="[0-9]{4}" maxlength="4">
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
        <p>
          Name : {{pokemonName}}
        </p>
      </div>
      <div class="pokeId">
        <p>
          ID : {{pokemonFicheId}}
        </p>
      </div>

      <div class="pokeTypes">
        <h6>Types :</h6>
        <p> {{pokemonType}} </p>
      </div>
      <div class="pokeHeight">
        <p>
          Taille : {{pokemonHeight}} m
        </p>
        </div>
        <div class="pokeWeight">
          <p>
            Poids : {{pokemonWeight}} kg
          </p>
      </div>
      <div class="pokeDesc">
        <h6>Description : </h6>
        <p>
          {{pokemonDescription}}
        </p>
      </div>
      <div class="pokeAbi">
        <p>
          Abilité : {{pokemonAbilities}}
        </p>
      </div>
      <div class="pokeStats">
        <li v-for="poke in pokemon">
          <p>
            {{poke.stat.name}} : {{poke.base_stat}}
          </p>
        </li>
      </div>

    </div>

    <div class="buttons">
      <div class="btn-top-bot">
        <button class="btn-top" @click="onNextUP">  </button>
        <button class="btn-bot" @click="onPreviousDOWN"> </button>
      </div>

      <div class="btn-left-right">
        <button class="btn-left" @click="onPrevious"> </button>
          <button class="btn-right" @click="onNext">  </button>
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
.pokedex-img{
   display: flex;
   justify-content: center;
   width: 100%;
   padding-top: 1rem;
 }

img{
  border-radius: 11px;
  width: 30%;
}

.pokedex-id{
  position: absolute;
  top: 364px;
  left: 570px;
  display: flex;
}

.pokedex-id p {
  color: black;
  font-size: 6px;
  font-weight: bold;
}

.pokedex-name{
  position: absolute;
  top: 364px;
  left: 365px;
  display: flex;
}

.pokedex-name p {
  color: black;
  font-size: 6px;
  font-weight: bold;
}

.pokedex-desc{
  position: absolute;
  top: 118px;
  left: 361px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 228px;
  align-items: center;
  z-index: 1;
}

.pokedex-desc li{
  text-decoration: none;
  list-style: none;
}

.pokedex-desc li div{
  border: red solid 1px;
}

.pokeStats{
  width: 100px;
  display: flex;
  justify-content: flex-end;
  align-content: center;
}

.imgPokemon{
  position: absolute;
  top: 60px;
  left: 25px;
  width: 300px;
}

.pokedex-desc p{
  color: black;
  font-size: 6px;
  font-weight: bold;
}

.champ-pokemon-id{
  height: 10px;
  width: 20px;
  font-size: 7px;
  border: none;
  background-color: #8DC641;
  outline: none;
  pointer-events: auto;
}

.champ-pokemon-name{
  pointer-events: none;
  font-size: 7px;
  border: none;
  background-color: #8DC641;
  height: 10px;
  width: 80px;
}

.btn-top-bot{
  position: absolute;
  inset: 390px 200px 50px 382px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
}

.btn-top, .btn-bot{
  height: 18px;
  width: 10px;
  background: transparent;
}

.btn-left-right{
  position: absolute;
  inset: 408px 200px 50px 365px;
  display: flex;
  justify-content: space-between;
  width: 50px;
}

.btn-left, .btn-right{
  height: 15px;
  width: 18px;
  background: transparent;
}

.return{
  position: absolute;
  top: 386px;
  left: 563px;
}

.submit{
  position: absolute;
  top: 413px;
  left: 575px;
}

.pokemon-submit{
  border-radius: 100%;
  height: 25px;
  width: 25px;
  background: transparent;
}

.pokemon-return{
  border-radius: 100%;
  height: 20px;
  width: 20px;
  background: transparent;
}

.pokeName{
  position: absolute;
  top: 9px;
  left: 15px;
}
.pokeId{
  position: absolute;
  top: 18px;
  left: 15px;
}

.pokeTypes{
  position: absolute;
  top: 185px;
  left: 32px;
}
.pokeTypes h6{
  color: black;
  text-decoration: underline;
  font-size: 8px;

}
.pokeTypes p{
  color: black;
  font-size: 9px;
}

.pokeDesc{
  position: absolute;
  top: 160px;
  left: 129px;
}
.pokeDesc h6 {
  color: black;
  text-decoration: underline;
  font-size: 8px;
}

.pokeWeight{
  position: absolute;
  top : 8px;
  left: 123px;
}

.pokeHeight{
  position: absolute;
  top : 15px;
  left: 118px;
}

.pokeAbi{
  position: absolute;
  top: 23px;
  left: 110px;
}

</style>