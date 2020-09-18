const Command = require('../Command');

class CreatePlaylistCommand extends Command {
    execute(args) { 
        this.unqfy.addArtist(this.paramsBuilder(args));
    }
}

module.exports = CreatePlaylistCommand;
