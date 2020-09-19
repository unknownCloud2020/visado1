
class Playlist {

  constructor(id, name, duration, tracks) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.tracks = tracks;
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

  getTracks() {
    return this.tracks;
  }

  setTracks(tracks) {
    this.tracks = tracks;
  }

  hasTrack(aTrack) {
    return this.tracks.find(t => t.id === aTrack.id);
  }
}

module.exports = Playlist;