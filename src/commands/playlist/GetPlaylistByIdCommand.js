const Command = require('../Command');

class GetPlaylistByIdCommand extends Command { 
    execute(args) { 
        this.unqfy.addArtist(this.paramsBuilder(args));
    }
}

module.exports = GetPlaylistByIdCommand;
