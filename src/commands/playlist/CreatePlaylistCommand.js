const Command = require('../Command');

class CreatePlaylistCommand extends Command {
    execute(args) { 
        this.unqfy.createPlaylist(this.paramsBuilder(args));
    }
}

module.exports = CreatePlaylistCommand;
