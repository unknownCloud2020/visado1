const Command = require('../Command');

class AddAlbumCommand extends Command {
    execute(args) { 
        this.unqfy.addAlbum(this.paramsBuilder(args));
    }
 }

module.exports = AddAlbumCommand;
