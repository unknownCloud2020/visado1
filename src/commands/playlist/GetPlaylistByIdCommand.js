const Command = require('../Command');
const unqmod = require('../../../unqfy'); // importamos el modulo unqfy

class GetPlaylistByIdCommand extends Command {
    
    execute(args) {
        const unqfy = new unqmod.UNQfy();
        //unqfy.addArtist(this.mapper(args));
    }
}

module.exports = GetPlaylistByIdCommand;