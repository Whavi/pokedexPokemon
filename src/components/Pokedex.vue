<script setup>
</script>

<template>
  <div class="pokedex-img">
    <img src="/pokedex.jpg">
  </div>


  <div class="pokedex-id">
    <p> ID :</p>
    <input class="champ-pokemon-id" type="text" name="pokemon-id" placeholder="ID pokemon" pattern="[0-9]{4}" maxlength="4">
  </div>

  <div class="pokedex-name">
    <p>Name : </p>
    <input readonly class="champ-pokemon-name" type="text" name="pokemon-name" placeholder="Nom du pokémon" >
  </div>

  <div class="pokedex-desc">
    <p> Description :</p>
    <input class="champ-pokemon-desc" type="text" name="pokemon-desc">
  </div>

  <div class="btn-top-bot">
    <input class="btn-top" type="button">
    <input class="btn-bot" type="button">
  </div>

  <div class="btn-left-right">
    <input class="btn-left" type="button" >
    <input class="btn-right" type="button" >
  </div>

  <div class="submit">
    <input class="pokemon-submit" type="submit" value=" ">
  </div>

  <div class="return">
    <input class="pokemon-return" type="submit" value=" ">
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
  top: 366.5px;
  left: 545px;
  display: flex;
}
.pokedex-id p {
  color: black;
  font-size: 6px;
  font-weight: bold;
}

.pokedex-name{
  position: absolute;
  top: 366.5px;
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
  top: 390px;
  left: 388.5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  align-items: center;
}

.pokedex-desc p{
  color: black;
  font-size: 6px;
  font-weight: bold;
}


.champ-pokemon-id{
  height: 10px;
  width: 43px;
  font-size: 7px;
  border: none;
  background-color: #8DC641;
  outline: none;
  pointer-events: auto;
}

.champ-pokemon-name, .champ-pokemon-desc{
  pointer-events: none;
  font-size: 7px;
  border: none;
  background-color: #8DC641;

}
.champ-pokemon-name{
  height: 10px;
  width: 80px;
}

.champ-pokemon-desc{
  height: 40px;
  width: 110px;
}


.btn-top-bot{
  position: absolute;
  inset: 395px 200px 50px 381px;
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
  inset: 412px 200px 50px 365px;
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
  top: 388px;
  left: 563px;
}
.submit{
  position: absolute;
  top: 415px;
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

</style>