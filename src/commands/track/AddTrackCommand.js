const Command = require('../Command');

class AddTrackCommand extends Command {
    execute(args) { 
        this.unqfy.addTrack(this.paramsBuilder(args));
    }
 }

module.exports = AddTrackCommand;
