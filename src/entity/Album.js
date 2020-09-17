
class Album {

   let id
   let name
   let publishDate
   let recordCompany
   let duration
   let tracks = []
   let author

   constructor(id,name,publishDate,recordCompany,duration,tracks,author) {
     this.id = id
     this.name = name
     this.publishDate = publishDate
     this.recordCompany = recordCompany
     this.duration = duration
     this.tracks = tracks
     this.author = author
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

   function getPublishDate() {
     return this.publishDate
   }

   function setPublishDate(publishDate) {
     this.publishDate = publishDate
   }

   function getRecordCompany() {
     return this.recordCompany
   }

   function setRecordCompany(recordCompany) {
     this.recordCompany = recordCompany
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

   function getAuthor() {
      return this.authors
   }

   function setAuthor(author) {
     this.author = author
   }

}

module.exports = Album;