const Command = require('../Command');
const unqmod = require('../../../unqfy'); // importamos el modulo unqfy

class GetTracksMatchingArtistCommand extends Command {
    
    execute(args) {
        const unqfy = new unqmod.UNQfy();
        // unqfy.addArtist(this.mapper(args));
    }

    mapper(args) {
        // const splitArgs = args.slice();
        // const name = splitArgs.shift();
        // const country = splitArgs.shift();
        // return { name: name, country: country };
    }

}

module.exports = GetTracksMatchingArtistCommand;