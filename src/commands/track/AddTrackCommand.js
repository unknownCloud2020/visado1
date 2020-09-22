const Command = require('../Command');

class AddTrackCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        let albumId = params.id;
        let trackData = { name: params.name, duration: params.duration, album: params.album, genres: params.genres };
        this.unqfy.addTrack(albumId, trackData);
    }
}

module.exports = AddTrackCommand;
