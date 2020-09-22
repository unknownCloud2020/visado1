
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Author = require('./src/entity/Author');
const IdAutoIncrement = require('./src/entity/IdAutoIncrement');
const IdAutoIncrementPlaylist = require('./src/entity/sequence/IdAutoIncrementPlaylist');
const Playlist = require('./src/entity/Playlist');
const Album = require('./src/entity/Album');
const Track = require('./src/entity/Track');

class UNQfy {

  constructor() {
    this.artists = [];
    this.playlists = [];
    this.idIncrementArtist = new IdAutoIncrement();
    this.idIncrementPlaylist = new IdAutoIncrementPlaylist();
    this.idIncrementAlbum = new IdAutoIncrement();
    this.idIncrementTrack = new IdAutoIncrement();
  }


  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
    /* Crea un artista y lo agrega a unqfy.
    El objeto artista creado debe soportar (al menos):
      - una propiedad name (string)
      - una propiedad country (string)
    */
    this.existArtist(artistData);
    this.idIncrementArtist.idAutoIncrement();
    const artist = new Author(artistData.name, artistData.country);
    artist.setId(this.idIncrementArtist.id);
    this.artists.push(artist);
    return artist;
  }

  existArtist(artist) {
    if (this.searchArtistByName(artist.name)) {
      throw "The artist alredy exist.";
    }
  }

  searchArtistByName(name) {
    return this.artists.some(artist => artist.name === name);
  }

  existAlbum(album) {
    if (this.searchArtistByName(album.name)) {
      throw "The album alredy exist.";
    }
  }

  searchAlbumByName(name) {
    return this.artists.flatMap(artist => artist.albums.some(album => album.name === name));
  }
  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
    /* Crea un album y lo agrega al artista con id artistId.
      El objeto album creado debe tener (al menos):
       - una propiedad name (string)
       - una propiedad year (number)
    */
    this.existAlbum(albumData);
    this.idIncrementAlbum.idAutoIncrement();
    const artistRecovered = this.artists.filter(a => a.id === parseInt(artistId))[0];
    const album = new Album(albumData.name, albumData.year);
    album.setId(this.idIncrementAlbum.id);
    artistRecovered.setAlbum(album);
    return album;
  }


  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
    /* Crea un track y lo agrega al album con id albumId.
    El objeto track creado debe tener (al menos):
        - una propiedad name (string),
        - una propiedad duration (number),
        - una propiedad genres (lista de strings)
    */
    this.idIncrementTrack.idAutoIncrement();
    const albumRecovered = this.getArtistAlbum(albumId);
    const track = new Track(trackData.name, trackData.album, trackData.duration, trackData.genres);
    track.setId(this.idIncrementTrack.id);
    albumRecovered.setTrack(track);

    return track;

  }

  getArtistAlbum(id) {
    let album = new Album();
    this.artists.forEach(a => {
      const albums = this.getAlbums(id, a.getAlbums());
      if (albums.length === 1) { album = albums[0]; }
    });
    //console.log(album);
    return album;
  }

  getAlbums(id, albums) {
    return albums.filter(a => a.id === parseInt(id));
  }

  getArtistById(id) {
    const artist = this.artists.filter(a => a.id === parseInt(id.id))[0];
    return artist;
  }

  getAlbumById(id) {
    const album = this.getArtistAlbum(id.idAlbum);
    return album;
  }

  getTrackById(id) {

  }

  getPlaylistById(id) {

  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    const albumes = this.artists.flatMap(artist => artist.albums);
    const tracks = albumes.flatMap(album => album.tracks);
    const trackInGenres = tracks.filter(t => t.genres.some(g => genres.includes(g)));
    return trackInGenres;
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    return this.artists.filter(artist => artist.name === artistName).flatMap(artist => artist.albums.flatMap(album => album.tracks));
  }


  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
    /*** Crea una playlist y la agrega a unqfy. ***
      El objeto playlist creado debe soportar (al menos):
        * una propiedad name (string)
        * un metodo duration() que retorne la duración de la playlist.
        * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
    */
    try {
      const idPlaylist = this.idIncrementPlaylist.idAutoIncrement();
      const newPlaylist = new Playlist(idPlaylist, name, genresToInclude);
      const tracksInGenres = this.getTracksMatchingGenres(genresToInclude);
      newPlaylist.generateListByTracks(tracksInGenres, maxDuration);
      return newPlaylist;
    } catch (error) {
      throw error;
    }
  }

  printPlaylists() {
    if (this.hasItems(this.playlists)) {
      this.playlists.forEach(playlist => {
        this.printPrincipalInfo(playlist);
      });
    }
  }

  printArtists() {
    if (this.hasItems(this.artists)) {
      this.artists.forEach(artist => {
        this.printPrincipalInfo(artist);
      });
    }
  }
  printAlbums() {

    const allAlbums = this.artists.map(artist => artist.albums);
    if (this.hasItems(allAlbums)) {
      allAlbums.forEach(album => {
        this.printPrincipalInfo(album);
      });
    }
  }

  printTracks() {

    const allTracks = this.artists.flatMap(track => track.albums.flatMap(album => album.tracks));
    if (this.hasItems(allTracks)) {
      allTracks.forEach(track => {
        this.printPrincipalInfo(track);
      });
    }
  }

  printPrincipalInfo(content) {
    const properties = Object.entries(content);
    console.log('==============================================================');
    properties.forEach(propertie => {
      if (!this.isDetail(propertie)) {
        console.log(`- ${propertie[0]}: `, propertie[1]);
      } else if (this.isObject(propertie[1])) {
        this.printObjectsInArray(propertie);
      } else {
        this.printValuesInArray(propertie);
      }
    });
  }

  isDetail(propertie) { return Array.isArray(propertie[1]); }

  isObject(propertie) { return typeof propertie === 'object' && propertie !== null; }

  hasItems(array) {
    if (!array.length) {
      console.log("No items to display yet.");
    }
    return array.length;
  }

  printObjectsInArray(contents) {

    console.log(` ================== ${contents[0]} details =======================================`);
    contents[1].forEach(content => {
      const properties = Object.entries(content);
      properties.forEach(propertie => {
        console.log(`   - ${propertie[0]}: `, this.isDetail(propertie) ? propertie[1].length : propertie[1]);
      });
    });
    console.log(` ================== ${contents[0]} details end =======================================`);
  }

  printValuesInArray(content) {
    console.log(`- ${content[0]}: `, content[1].join(', '));
  }
  
  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Author, IdAutoIncrement, IdAutoIncrementPlaylist, Album, Track];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
};

