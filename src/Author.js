
class Author {

   let id
   let name
   let origin
   let yearsActive
   let country
   let webSite
   let albums = []
   let unqfy

    constructor(id,name,origin,yearsActive,country,webSite,albums,unqfy) {
        this.id = id
        this.name = name
        this.origin = origin
        this.yearsActive = yearsActive
        this.country = country
        this.webSite = webSite
        this.albums = albums
        this.unqfy = unqfy
      }

 /*  constructor(id,name,origin,yearsActive,webSite,albums,unqfy) {
     this.id = id
     this.name = name
     this.origin = origin
     this.yearsActive = yearsActive
     this.webSite = webSite
     this.albums = albums
     this.unqfy = unqfy
   }
*/
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

   function getOrigin() {
     return this.origin
   }

   function setOrigin(origin) {
     this.origin = origin
   }

   function getYearsActive() {
     return this.yearsActive
   }

   function setYearsActive(yearsActive) {
     this.yearsActive = yearsActive
   }

   function getCountry() {
     return this.country
   }

   function setCountry(country) {
      this.country = country
  }

   function getWebSite() {
     return this.webSite
   }

   function setWebSite(webSite) {
     this.webSite = webSite
   }

   function getAlbums() {
     return this.albums
   }

   function setAlbums(albums) {
     this.albums = albums
   }

   function getUnqfy() {
     return this.unqfy
   }

   function setUnqfy(unqfy) {
     this.unqfy = unqfy
   }

}

module.exports = Author;