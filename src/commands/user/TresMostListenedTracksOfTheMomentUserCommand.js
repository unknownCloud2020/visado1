const Command = require('../Command');

class TresMostListenedTracksOfTheMomentUserCommand extends Command {
    execute(args) {
        this.unqfy.tresMostListenedTracksOfTheMoment();
    }
}

module.exports = TresMostListenedTracksOfTheMomentUserCommand;
