
class Playlist {

  constructor(id, name, genres) {
    this.id = id;
    this.name = name;
    this.duration = 0;
    this.genres = genres;
    this.tracks = [];
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getName() {
    return this.id;
  }

  setName(name) {
    this.name = name;
  }

  getDuration() {
    return this.duration;
  }

  setDuration(duration) {
    this.duration = duration;
  }

  addTrack(track) {
    this.setDuration(this.calculateDuration());
    return this.tracks.push(track);
  }

  getTracks() {
    return this.tracks;
  }

  setTracks(tracks) {
    this.tracks = tracks;
  }

  hasTrack(aTrack) {
    return this.tracks.find(t => t.id === aTrack.id);
  }

  calculateDuration() {
    return this.tracks.reduce(this.getSumDuration, 0);
  }

  getSumDuration(total, track) {
    return total + track.duration;
  }

  generateListByGenres(tracks, maxDuration) {
    console.log("generateListByGenres", this.genres);
    let tracksInGenres = tracks.filter(t => this.genres.includes(t.genre));
    console.log('tracksInGenres', tracksInGenres);
    while (this.calculateDuration() < maxDuration) {
      const randomTrack = tracksInGenres[Math.floor(Math.random() * tracksInGenres.length)];
      this.addTrack(randomTrack);
      tracksInGenres = tracksInGenres.filter(t => !this.hasTrack(t));
    }
  }
}

module.exports = Playlist;