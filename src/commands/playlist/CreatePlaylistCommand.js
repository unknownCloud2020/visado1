const Command = require('../Command');

class CreatePlaylistCommand extends Command {
    execute(args) { 
        const playListArgs = this.paramsBuilder(args);
        this.unqfy.createPlaylist(playListArgs.name, playListArgs.genresToInclude, playListArgs.maxDuration);
    }
}

module.exports = CreatePlaylistCommand;
