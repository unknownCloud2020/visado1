
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Author = require('./src/entity/Author');
const IdAutoIncrement = require('./src/entity/IdAutoIncrement');
const IdAutoIncrementPlaylist = require('./src/entity/sequence/IdAutoIncrementPlaylist');
const Playlist = require('./src/entity/Playlist');
const Album = require('./src/entity/Album');
const Track = require('./src/entity/Track');
const { isObject } = require('util');
const User = require('./src/entity/User');

class UNQfy {

  constructor() {
    this.artists = [];
    this.playlists = [];
    this.users = [];
    this.idIncrementArtist = new IdAutoIncrement();
    this.idIncrementPlaylist = new IdAutoIncrementPlaylist();
    this.idIncrementAlbum = new IdAutoIncrement();
    this.idIncrementTrack = new IdAutoIncrement();
    this.idIncrementUser = new IdAutoIncrement();
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

  isAlbumArtist(id, albums) {
    return albums.some(a => a.id === id);
  }

  getArtistToAlbum(id) {
    const artist = this.artists.filter(a => this.isAlbumArtist(id, a.albums))[0];
    //console.log(artist);
    return artist;
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

    //buscar el album y agregar le el track y actualizar el artista de dicho album que tiene el track
    this.idIncrementTrack.idAutoIncrement();
    const albumRecovered = this.getAlbumById(albumId);
    const track = new Track(trackData.name, trackData.album, trackData.duration, trackData.genres);
    track.setId(this.idIncrementTrack.id);
    albumRecovered.setTrack(track);

    return track;

  }

  getArtistAlbum(id) {
    let album = undefined;
    this.artists.forEach(a => {
      const albums = this.getAlbums(id, a.albums);
      if (albums.length === 1) { album = albums[0]; }
    });
    return album;
  }

  getAlbums(id, albums) {
    const newAlbums = albums.filter(a => a.id === id);
    return newAlbums;
  }

  getArtistById(id) {
    const artist = this.artists.filter(a => a.id === parseInt(id.id))[0];
    return artist;
  }

  getAlbumById(id) {
    const album = this.getArtistAlbum(id);
    return album;
  }

  getAlbumsToArtist() {
    const albums = this.artists.flatMap(artist => artist.albums);
    return albums;
  }

  getTracksToAlbumArtist() {
    const tracks = this.getAlbumsToArtist().flatMap(album => album.tracks);
    return tracks;
  }

  getTrackById(id) {
    const track = this.getTracksToAlbumArtist().filter(t => t.id === id)[0];
    return track;
  }

  getPlaylistById(id) {
    const playlist = this.playlists.filter(p => p.id === id);
    return playlist;
  }

  removeArtist(id) {
    const index = this.artists.findIndex(a => a.id === id);
    if (index != -1) {
      this.artists.splice(index, 1);
    }
  }

  removeAlbum(id) {
    let artist = this.getArtistToAlbum(id);
    const albums = artist.albums;
    const indexAlbum = albums.findIndex(a => a.id === id);
    albums.splice(indexAlbum, 1);
  }

  getArtistAlbumTrack(id) {
    const artist = this.artists.filter(a => this.isAlbumTrack(id, a.albums))[0];
    return artist;
  }

  isAlbumTrack(id, albums) {
    return albums.some(a => this.isTrack(id, a.tracks))
  }

  isTrack(id, tracks) {
    return tracks.some(a => a.id === id);
  }

  updateAlbums(id, albums) {
    albums.forEach(a => this.updateTracks(id, a.tracks));
  }

  updateTracks(id, tracks) {
    const index = tracks.findIndex(t => t.id === id);
    tracks.splice(index, 1);
  }

  removeTrack(id) {
    const artist = this.getArtistAlbumTrack(id);
    this.updateAlbums(id, artist.albums);
  }

  printArtistsFor(string) {
    const artistsMatching = this.artists.filter(a => a.name.toLowerCase().includes(string.toLowerCase()));
    artistsMatching.forEach(a => {
      this.printPrincipalInfo(a);
    });
  }

  printAlbumsFor(string) {
    const allAlbums = this.artists.flatMap(artist => artist.albums);
    allAlbums.filter(a => a.name.toLowerCase().includes(string.toLowerCase()));
    allAlbums.forEach(a => {
      this.printPrincipalInfo(a);
    });
  }

  getTracks() {
    return this.artists.flatMap(artist => artist.albums.flatMap(album => album.tracks));
  }

  printTracksFor(string) {
    const allTracks = this.getTracks();
    allTracks.filter(t => t.name.toLowerCase().includes(string.toLowerCase()));
    allTracks.forEach(a => {
      this.printPrincipalInfo(a);
    });
  }

  printTracksForArtist(name) {
    const allTracks = this.getTracksMatchingArtist(name);
    allTracks.filter(a => a.name.toLowerCase().includes(string.toLowerCase()));
    allTracks.forEach(a => {
      this.printPrincipalInfo(a);
    });
  }


  printTracksForGenre(genre) {
    const allTracks = this.artists.flatMap(artist => artist.albums.flatMap(album => album.tracks));
    allTracks.filter(t => isGenre(t.genres, genre));
    allTracks.forEach(a => {
      this.printPrincipalInfo(a);
    });
  }

  isGenre(genres, genre) {
    return genres.some(g => g === genres);
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
      this.addPlaylist(newPlaylist);
      return newPlaylist;
    } catch (error) {
      throw error;
    }
  }

  addPlaylist(newPlaylist) {
    this.playlists.push(newPlaylist);
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
    const allAlbums = this.artists.flatMap(artist => artist.albums);
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

  printObjectsInArray(content) {
    const properties = Object.entries(content);
    properties.forEach(propertie => {
      if (!this.isDetail(propertie)) {
        console.log(`- ${content[0]}: `, propertie[1].length);
      }
    });
  }

  printValuesInArray(content) {
    console.log(`- ${content[0]}: `, content[1].join(', '));
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

  existUser(id) {
    if (this.searchArtistByName(id)) {
      throw "The User alredy exist.";
    }
  }

  searchUserByName(name) {
    return this.users.some(u => u.id === id);
  }

  addUser(name) {
    this.existUser(name)
    this.idIncrementUser.idAutoIncrement();
    const user = new User(name);
    user.setId(this.idIncrementUser.id);
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.filter(u => u.id === id)[0];
  }

  userListensToATrack(idUser, idTrack) {
    const user = this.getUser(idUser);
    const track = this.getTrackById(idTrack);
    track.incrementNumberOfTimesListened();
    user.setTrack(track);
  }

  tracksListenedToByUser(id) {
    const user = this.getUser(id);
    const tracksUser = user.tracksHeard;
    return tracksUser;
  }

  userHowManyTracksHaveYouHeard(id) {
    const user = this.getUser(id);
    const numberHeard = user.tracksHeard.reduce((total) => total = total + 1, 0);
    return numberHeard;
  }

  //Armar automáticamente  e imprimir en pantalla la lista "This is ..." .
  //Esta lista contiene los 3 temas más escuchados de un artista dado.
  //Tenga en cuenta que esta lista siempre es calculada "on the fly".
  tresMostListenedTracksOfTheMoment() {
    const tracks = this.getTracks().sort(function (a, b) {
      return a - b;
    });
    const newTracks = tracks.slice(0, 3);
    return newTracks;
  }



  searchByName(name) {
    const artists = this.artists.filter(artist => artist.name.includes(name));
    const albums = this.artists.flatMap(artist => artist.albums.filter(album => album.name.includes(name)));
    const tracks = this.artists.flatMap(artist => artist.albums.flatMap(album => album.tracks.filter(track => track.name.includes(name))));
    const playlists = this.playlists.filter(playlist => playlist.name.includes(name));
    return { artists, albums, tracks, playlists };
  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Author, IdAutoIncrement, IdAutoIncrementPlaylist, Album, Track, User];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }

}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
};

