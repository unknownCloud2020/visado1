class Command {

    constructor() {
        this.unqfy = null;
    }

    execute() {
        throw "Method execute not implemented yet.";
    }

    paramsBuilder(args) {
        const params = [];
        while (args.length > 0) {
            const param = args.shift();
            const value = args.shift();
            params.push({ [param]: value });
        }
        return Object.assign(...params);
    }

    setUNQfy(instance) {
        this.unqfy = instance;
    }
}

module.exports = Command;
