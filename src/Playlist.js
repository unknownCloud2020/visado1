
class Playlist {

   let id
   let name
   let duration
   let tracks = []
   let unqfy

   constructor(id,name,duration,tracks,unqfy) {
     this.id = id
     this.name = name
     this.duration = duration
     this.tracks = tracks
     this.unqfy = unqfy
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

   function getDuration() {
     return this.duration
   }

   function setDuration(duration) {
     this.duration = duration
   }

   function getTracks() {
     return this.tracks
   }

   function setTracks(tracks) {
     this.tracks = tracks
   }

   function getUnqfy() {
     return this.unqfy
   }

   function setUnqfy(unqfy) {
     this.unqfy = unqfy
   }
}

module.exports = Playlist;