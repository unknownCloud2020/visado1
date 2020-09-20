const Command = require('../Command');

class AddAlbumCommand extends Command {
    execute(args) { 
        const params = this.paramsBuilder(args);
        let idArtista = {idArt: params.idArt};
        let albumData = {name: params.name, year: params.year};

        this.unqfy.addAlbum(idArtista,albumData);
    }
 }

module.exports = AddAlbumCommand;
