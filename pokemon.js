const fs = require("fs");
const fetch = require("node-fetch");

async function pokemon(limit, pokemones = [], index = 1) {
  if (index > limit) {
    fs.writeFileSync(
      "./pokemones.json",
      JSON.stringify(pokemones, null, 4),
      "utf-8"
    );
    return console.log("ready!");
  }

  const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
  const response = await request.json();

  const { name, types } = response;
  const type = types[0].type.name;

  pokemones = [
    ...pokemones,
    {
      name,
      type,
      id: `#000${index}`.slice(-3),
      img: `https://raw.githubusercontent.com/lunavazquez/pokemon-images/master/${index}.png`,
    },
  ];

  console.log(`${index}/${limit}`);

  return pokemon(limit, pokemones, index + 1);
}

pokemon(150);
