const Command = require('../Command');

class GetTrackByIdCommand extends Command {
    execute(args) { 
        this.unqfy.getTrackById(this.paramsBuilder(args));
    }
}

module.exports = GetTrackByIdCommand;
