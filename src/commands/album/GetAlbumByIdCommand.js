const Command = require('../Command');

class GetAlbumByIdCommand extends Command {
    execute(args) { 
        this.unqfy.getAlbumById(this.paramsBuilder(args));
    }
 }

module.exports = GetAlbumByIdCommand;
