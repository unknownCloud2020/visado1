
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

  duration() {
    return this.duration;
  }

  setDuration(duration) {
    this.duration = duration;
  }

  addTrack(track) {
    this.tracks.push(track);
    this.setDuration(this.calculateDuration());
  }

  getTracks() {
    return this.tracks;
  }

  setTracks(tracks) {
    this.tracks = tracks;
  }

  hasTrack(aTrack) {
    return this.tracks.some(t => t.id === aTrack.id);
  }

  calculateDuration() {
    return this.tracks.reduce(this.getSumDuration, 0);
  }

  getSumDuration(total, track) {
    return total + track.duration;
  }

  generateListByGenres(tracks, maxDuration) {
    let tracksInGenres = tracks;
    while (this.calculateDuration() < maxDuration && tracksInGenres.length > 0) {
      const randomTrack = tracksInGenres[Math.floor(Math.random() * tracksInGenres.length)];
      if ((this.calculateDuration() + randomTrack.duration) <= maxDuration) {
        this.addTrack(randomTrack);
      } else if (tracksInGenres.length > 0) {
        tracksInGenres = tracksInGenres.filter(t => t.id !== randomTrack.id);
      } else {
        tracksInGenres = tracksInGenres.filter(t => !this.hasTrack(t));
      }
    }
  }
}

module.exports = Playlist;