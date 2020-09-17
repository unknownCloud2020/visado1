class Command {

    constructor() {

    }

    execute(args) { throw Error("Implementa este mensaje"); }

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