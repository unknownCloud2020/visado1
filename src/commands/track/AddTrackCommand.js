const Command = require('../Command');

class AddTrackCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        let albumId = { idAlbum: params.idAlbum };
        let trackData = { name: params.name, duration: params.duration ,album: params.album };
       
        this.unqfy.addTrack(albumId.idAlbum,trackData);
    }
}

module.exports = AddTrackCommand;
