
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Author = require('./src/entity/Author');
const IdAutoIncrement = require('./src/entity/IdAutoIncrement');
const IdAutoIncrementPlaylist = require('./src/entity/sequence/IdAutoIncrementPlaylist');
const Playlist = require('./src/entity/Playlist');

class UNQfy {

  constructor() {
    this.artists = [];
    this.playlists = [];
    this.tracks = [
      {
        id: 1,
        name: 'asd',
        genre: 'rock',
        duration: 2000
      },
      {
        id: 2,
        name: 'asd',
        genre: 'rock',
        duration: 2000
      }
    ];
    this.idIncrementArtist = new idIncrement();
    this.idIncrementPlaylist = new IdAutoIncrementPlaylist();
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
      console.log(this.idIncrementArtist.id);
      let artist = new Author(artistData.name, artistData.country);
      artist.setId(this.idIncrementArtist.id);
      this.artists.push(artist);

      console.log('addArtist');
      console.log('name: ', artist.name);
      console.log('country: ', artist.country);
      console.log('id: ', artist.id)
      console.log(this.artists[0])

      return artist;

    } catch (error) {
      console.log(error)
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
    console.log(artistId, albumData);
    let artistRecovered = this.artists.filter(a => a.id === parseInt(artistId.idArt))[0];
    let album = new Album(albumData.name, albumData.year);
    album.setId(this.idIncrementAlbum.id);
    artistRecovered.setAlbum(album);
    console.log(album);
    console.log(artistRecovered);

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
    console.log(albumId, trackData);
    let albumRecovered = this.getArtistAlbum(albumId.idAlbum);
    console.log(albumRecovered);
    let track = new Track(trackData.name, trackData.album, trackData.duration);
    track.setId(this.idIncrementTrack.id);
    albumRecovered.setTrack(track);
    console.log(track);
    console.log(albumRecovered);

    return Track;

  }

  getArtistAlbum(id) {
    let album = new Album();
    this.artists.forEach(a => {
      let albums = this.getAlbums(id, a.getAlbums());
      if (albums.length === 1) { album = albums[0] };
    });
    //console.log(album);
    return album;
  }

  getAlbums(id, albums) {
    return albums.filter(a => a.id === parseInt(id));
  }

  getArtistById(id) {
    console.log(id);
    const artist = this.artists.filter(a => a.id === parseInt(id.id))[0];
    console.log(artist);
    return artist
  }

  getAlbumById(id) {
    console.log(id);
    const album = this.getArtistAlbum(id.idAlbum);
    console.log(album);
    return album;
  }

  getTrackById(id) {
    
  }

  getPlaylistById(id) {

  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {

  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {

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
      this.tracks = [
        {
          id: 1,
          name: 'asd2',
          genre: 'rock',
          duration: 2000
        },
        {
          id: 2,
          name: 'asd3',
          genre: 'rock',
          duration: 1000
        },
        {
          id: 3,
          name: 'asd4',
          genre: 'rock',
          duration: 1000
        },
        {
          id: 4,
          name: 'asd5',
          genre: 'ska',
          duration: 1000
        },
        {
          id: 5,
          name: 'asd5',
          genre: 'ska',
          duration: 500
        },
        {
          id: 6,
          name: 'asd6',
          genre: 'ska',
          duration: 500
        },
        {
          id: 7,
          name: 'asd6',
          genre: 'ska',
          duration: 500
        }
      ];

      const idPlaylist = this.idIncrementPlaylist.idAutoIncrement();
      const newPlaylist = new Playlist(idPlaylist, name, genresToInclude);
      newPlaylist.generateListByGenres(this.tracks, maxDuration);
      return newPlaylist;
    } catch (error) {
      throw error;
    }
  }

  printPlaylist(idPlaylist) {
    const pl = this.playlists.find(p => p.id === idPlaylist);
    console.log('==============================================================');
    console.log('Name: ', pl.name);
    console.log('Dutarion: ', pl.duration);
    console.log('Genres: ', pl.genres.join(', '));
    pl.tracks.forEach(t => { console.log('Track: ', t.name, 'Album: ', t.album.name, 'Artist: ', t.album.artist.name); });
  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Author, IdAutoIncrement, IdAutoIncrementPlaylist];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
};

