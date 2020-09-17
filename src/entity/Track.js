
class Track {

   let id
   let name
   let format
   let genders = []
   let playList
   let album

   constructor(id,name,format,genders,playList,album) {
     this.id = id
     this.name = name
     this.format = format
     this.genders = genders
     this.playList = playList
     this.album = album
   }

   function getId() {
      return this.id
   }

   function setId(id) {
      this.id = id
   }

   function getName() {
      return this.id
   }

   function setName(name) {
     this.name = name
   }

   function getFormat() {
     return this.format
   }

   function setFormat(format) {
     this.format = format
   }

   function getGenders() {
     return this.genders
   }

   function setGenders(genders) {
     this.genders = genders
   }

   function getPlayList() {
     return this.playList
   }

   function setPlayList(playList) {
     this.playList = playList
   }

   function getAlbum() {
     return this.album
   }

   function setAlbum(album) {
     this.album = album
   }

}

module.exports = Track;