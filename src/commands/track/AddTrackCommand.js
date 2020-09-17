const Command = require('../Command');
const unqmod = require('../../../unqfy'); // importamos el modulo unqfy

class AddTrackCommand extends Command {
    
    execute(args) {
        const unqfy = new unqmod.UNQfy();
        unqfy.addArtist(this.paramsBuilder(args));
    }
}

module.exports = AddTrackCommand;