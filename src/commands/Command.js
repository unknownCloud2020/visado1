const unqmod = require('../../unqfy'); // importamos el modulo unqfy

class Command {

    constructor() {

    }

    execute(args) {
        const unqfy = new unqmod.UNQfy();
        unqfy.addArtist(this.paramsBuilder(args));
    }

    paramsBuilder(args) {
        const params = [];
        for (let x = 0; x < args.length; x++) {
            params.push({ [args[x]]: args[x + 1] });
            x = x + 1;
        }
        return Object.assign(...params);
    }
}

module.exports = Command;
