
class Track {

  constructor(name, album, duration, genres) {
    this.id;
    this.name = name;
    this.format;
    this.genres = genres;
    this.playList;
    this.album = album;
    this.duration = duration;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getFormat() {
    return this.format;
  }

  setFormat(format) {
    this.format = format;
  }

  getGenders() {
    return this.genders;
  }

  setGenders(genders) {
    this.genders = genders;
  }

  getPlayList() {
    return this.playList;
  }

  setPlayList(playList) {
    this.playList = playList;
  }

  getAlbum() {
    return this.album;
  }

  setAlbum(album) {
    this.album = album;
  }

  getDuration() {
    return this.duration;
  }

  setDuration(duration) {
    this.duration = duration;
  }

}

module.exports = Track;