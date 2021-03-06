const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const commands = require('./src/commands/index');

// contrucción mapa de comandos
// eslint-disable-next-line no-undef
// const commandos = new Map();
// commandos.set("addTrack", AddTrackCommand);

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function main() {
  try {
    const commandIn = process.argv.slice(2).shift(); // obtengo el commando enviado por parametro, que es el tercer argumento
    const command = commands.get(commandIn.toUpperCase()).prototype; // obtengo la clase del comando por polimorfismo
    const unqFy = getUNQfy();
    command.setUNQfy(unqFy);
    const params = process.argv.slice(3);
    command.execute(params); // ejecuto comando y envio el resto de los argumentos
    saveUNQfy(unqFy);
  } catch (error) {
    console.log("Hubo un problema, vuelva a intentar verificando los datos ingresados.", error);
  }
}

main();
