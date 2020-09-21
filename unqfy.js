
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
    try {
      this.idIncrementArtist.idAutoIncrement();
      const artist = new Author(artistData.name, artistData.country);
      artist.setId(this.idIncrementArtist.id);
      this.artists.push(artist);

      return artist;

    } catch (error) {
      console.log(error);
    }

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

  updateArtistToAlbumTrack(artist, album) {
    const albums = artist.getAlbums();
    //console.log(albums[0].tracks)
    const index = albums.findIndex(a => a.id === album.id);
    return artist.setAlbums(albums.splice(index, 1, album));
  }

  updateArtists(artist, album) {
    const index = this.artists.findIndex(a => a.id === artist.id);
    let updateArtist = this.updateArtistToAlbumTrack(artist, album);
    this.artists = this.artists.splice(index, 1, this.updateArtists);
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
    this.updateArtists(this.getArtistToAlbum(albumRecovered.id), albumRecovered);
    console.log(this.artists);

    return track;

  }

  getArtistAlbum(id) {
    let album = new Album();
    this.artists.forEach(a => {
      const albums = this.getAlbums(id, a.getAlbums());
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
    console.log(artist);
    return artist;
  }

  getAlbumById(id) {
    const album = this.getArtistAlbum(id);
    console.log(album);
    return album;
  }

  getAlbumsToArtist() {
    const albums = this.artists.flatMap(artist => artist.albums);
    //console.log(albums);
    return albums;
  }

  getTracksToAlbumArtist() {
    const tracks = this.getAlbumsToArtist().flatMap(album => album.tracks);
    //console.log(tracks)
    return tracks;
  }

  getTrackById(id) {
    console.log(id)
    const track = this.getTracksToAlbumArtist().filter(t => t.id === id);
    console.log(track);
    return track;
  }

  getPlaylistById(id) {
    const playlist = this.playlists.filter(p => p.id === id);
    console.log(playlist);
    return playlist;
  }

  removeArtist(id) {
    this.artists = this.artists.filter(a => !a.id === id);
  }

  removeAlbum(id) {
    let artist = this.getArtistToAlbum(id);
    const albums = artist.albums;
    const indexAlbum = albums.findIndex(a => a.id === id);
    albums.splice(indexAlbum, 1);
    artist.setAlbums(albums);
    const indexArtist = this.artists.findIndex(a => a.id === artist.getId());
    this.artists = this.artists.splice(indexArtist, 1, artist);
  }
 
  getArtistAlbumTrack(id) {
    let artist = this.artists.filter(a => this.isAlbumTrack(id,a.albums));
    return album;
  }
 
  isAlbumTrack(id,albums) {
    return albums.some(a => this.isTrack(id,a.tracks))
  }

  isTrack(id,tracks) {
    return tracks.some(a => a.id === id); 
  }

  updateAlbums(id,albums) {
    const newAlbums = albums.array.map(a => this.updateTracks(id,a.tracks))
  }
  
  updateTracks(id,tracks) {
    return tracks.filter(t => !t.id === id); 
 }

  //buscar el artista que tenga el album que tenga el track eliminar lo y actualizar artists
  removeTrack(id) {
    let artist = this.getArtistAlbumTrack(id);
    artist.setAlbums(this.updateAlbums(id,artist.albums));
    const indexArtist = this.artists.findIndex(a => a.id === artist.getId());
    this.artists = this.artists.splice(indexArtist, 1, artist);
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
    this.playlists.forEach(pl => {
      console.log('==============================================================');
      console.log('Name: ', pl.name);
      console.log('Dutarion: ', pl.duration);
      console.log('Genres: ', pl.genres.join(', '));
      pl.tracks.forEach(t => { console.log('Track: ', t.name, 'Album: ', t.album.name, 'Artist: ', t.album.artist.name); });
    });
  }

  printArtists() {
    this.artists.forEach(artist => {
      console.log('==============================================================');
      this.printPrincipalInfo(artist);
    });
  }
  printAlbums() {
    const allAlbums = this.artist.map(artist => artist.albums);
    allAlbums.forEach(album => {
      console.log('==============================================================');
      this.printPrincipalInfo(album);
    });
  }

  printTracks() {
    const allTracks = this.artist.flatMap(track => track.albums.map(album => album.tracks));
    allTracks.forEach(track => {
      console.log('==============================================================');
      this.printPrincipalInfo(track);
    });
  }

  printPrincipalInfo(content) {
    const properties = content.entries();
    console.log('==============================================================');
    properties.forEach(propertie => {
      if (!this.isDetail(propertie)) {
        console.log(`- ${propertie.get(0)}: `, propertie.get(1));
      }
    });
  }

  isDetail(propertie) { return Array.isArray(propertie.get(1)); }

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

