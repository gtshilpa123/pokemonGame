// 1- You are provided with the container for player 1 and player 2. Use the same for rendering data for each card.
// 2- To get the list of Pokemon You can use the following API: Link "https://pokeapi.co/api/v2/pokemon/".
// 3- It contains the Pokemon name and a URL to get all the details of that Pokemon.
// 4- There is a "Fight" button upon clicking, each player should be displayed with a Pokemon with its name, experience, image, and abilities.
// 5- The Pokemon selected should be random for each player.
// 6- For each player's div the name and score of the player should be displayed.
// 7- The score should increment after each fight for the player with high experience.

// {
//   "count": 1302,
//   "next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
//   "previous": null,
//   "results": [
//     {
//       "name": "bulbasaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/1/"
//     },
//     {
//       "name": "ivysaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/2/"
//     },
//     {
//       "name": "venusaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/3/"
//     },
//     {
//       "name": "charmander",
//       "url": "https://pokeapi.co/api/v2/pokemon/4/"
//     },
//     {
//       "name": "charmeleon",
//       "url": "https://pokeapi.co/api/v2/pokemon/5/"
//     },
//     {
//       "name": "charizard",
//       "url": "https://pokeapi.co/api/v2/pokemon/6/"
//     },
//     {
//       "name": "squirtle",
//       "url": "https://pokeapi.co/api/v2/pokemon/7/"
//     },
//     {
//       "name": "wartortle",
//       "url": "https://pokeapi.co/api/v2/pokemon/8/"
//     },
//     {
//       "name": "blastoise",
//       "url": "https://pokeapi.co/api/v2/pokemon/9/"
//     },
//     {
//       "name": "caterpie",
//       "url": "https://pokeapi.co/api/v2/pokemon/10/"
//     },
//     {
//       "name": "metapod",
//       "url": "https://pokeapi.co/api/v2/pokemon/11/"
//     },
//     {
//       "name": "butterfree",
//       "url": "https://pokeapi.co/api/v2/pokemon/12/"
//     },
//     {
//       "name": "weedle",
//       "url": "https://pokeapi.co/api/v2/pokemon/13/"
//     },
//     {
//       "name": "kakuna",
//       "url": "https://pokeapi.co/api/v2/pokemon/14/"
//     },
//     {
//       "name": "beedrill",
//       "url": "https://pokeapi.co/api/v2/pokemon/15/"
//     },
//     {
//       "name": "pidgey",
//       "url": "https://pokeapi.co/api/v2/pokemon/16/"
//     },
//     {
//       "name": "pidgeotto",
//       "url": "https://pokeapi.co/api/v2/pokemon/17/"
//     },
//     {
//       "name": "pidgeot",
//       "url": "https://pokeapi.co/api/v2/pokemon/18/"
//     },
//     {
//       "name": "rattata",
//       "url": "https://pokeapi.co/api/v2/pokemon/19/"
//     },
//     {
//       "name": "raticate",
//       "url": "https://pokeapi.co/api/v2/pokemon/20/"
//     }
//   ]
// }

const fightBtn = document.getElementById("fight");
const p1Name = document.getElementById("p1_name");
const p1Score = document.getElementById("p1_score");
const p2Name = document.getElementById("p2_name");
const p2Score = document.getElementById("p2_score");

let score1 = 0;
let score2 = 0;

const player1 = document.querySelector("#card1");
const player2 = document.querySelector("#card2");

async function randomPokemon() {
  let randomId = Math.floor(Math.random() * 1302);
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  let data = await response.json();
  return data;
}

function displayPokemonCard(data, playerDetails) {
  playerDetails.querySelector("#img").src = `${data.sprites.front_default}`;
  playerDetails.querySelector("#img").alt = `${data.name}`;
  playerDetails.querySelector("#name").textContent = `Name: ${data.name}`;
  playerDetails.querySelector(
    "#experience"
  ).textContent = `Exp: ${data.base_experience}`;

  const abilitiesList = playerDetails.querySelector("#abilities");
  abilitiesList.textContent = "Abilities: ";
  data.abilities.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.ability.name;
    abilitiesList.appendChild(li);
  });
}

fightBtn.addEventListener("click", fight);

async function fight() {
  const pokemon1 = await randomPokemon();
  const pokemon2 = await randomPokemon();

  displayPokemonCard(pokemon1, player1);
  displayPokemonCard(pokemon2, player2);

  p1Name.textContent = "Player 1";
  p2Name.textContent = "Player 2";

  if (pokemon1.base_experience > pokemon2.base_experience) {
    score1++;
  } else if (pokemon2.base_experience > pokemon1.base_experience) {
    score2++;
  }

  p1Score.textContent = `Score: ${score1}`;
  p2Score.textContent = `Score: ${score2}`;
}
