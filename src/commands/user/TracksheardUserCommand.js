const Command = require('../Command');

class TracksheardUserCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        let id = params.id;
        this.unqfy.tracksListenedToByUser(id);
    }
}

module.exports = TracksheardUserCommand;
