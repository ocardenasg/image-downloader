const fs = require('fs');
const fetch = require('node-fetch');

async function downloader(imagesPaths = [], index = 0) {
  if (index === imagesPaths.length) return console.log('Finished!');
  const dest = fs.createWriteStream(`./saved/${index}.png`);
  const request = await fetch(imagesPaths[index]);
  await request.body.pipe(dest);
  return downloader(imagesPaths, index + 1);
}

downloader([
  'https://pokeres.bastionbot.org/images/pokemon/1.png',
  'https://pokeres.bastionbot.org/images/pokemon/2.png',
  'https://pokeres.bastionbot.org/images/pokemon/3.png',
]);
console.log('Iniciando...');
