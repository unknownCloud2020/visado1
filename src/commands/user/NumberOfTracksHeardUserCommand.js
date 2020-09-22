const Command = require('../Command');

class NumberOfTracksUserCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        let id = params.id;
        this.unqfy.userHowManyTracksHaveYouHeard(id);
    }
}

module.exports = NumberOfTracksUserCommand;
