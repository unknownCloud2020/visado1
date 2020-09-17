const Command = require('../Command');
const unqmod = require('../../../unqfy'); // importamos el modulo unqfy

class AddArtistCommand extends Command {
    
    execute(args) {
        const unqfy = new unqmod.UNQfy();
        //unqfy.addArtist(this.mapper(args));
    }

    mapper(args) {

    }

}

module.exports = AddArtistCommand;