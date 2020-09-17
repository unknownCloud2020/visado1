/* eslint-disable no-undef */
const GetTrackByIdCommand = require('./track/GetTrackByIdCommand');
const AddTrackCommand = require('./track/AddTrackCommand');
const GetTracksMatchingGenresCommand = require('./track/GetTracksMatchingGenresCommand');
const CreatePlaylistCommand = require('./playlist/CreatePlaylistCommand');
const GetPlaylistByIdCommand = require('./playlist/GetPlaylistByIdCommand');
const AddArtistCommand = require('./artist/AddArtistCommand');
const GetArtistByIdCommand = require('./artist/GetArtistByIdCommand');
const GetTracksMatchingArtistCommand = require('./artist/GetTracksMatchingArtistCommand');
const AddAlbumCommand = require('./album/AddAlbumCommand');
const GetAlbumByIdCommand = require('./album/GetAlbumByIdCommand');

const commands = new Map();
commands.set('GETTRACKBYID', GetTrackByIdCommand);
commands.set('ADDTRACK', AddTrackCommand);
commands.set('GETTRACKSMATCHINGGENRES', GetTracksMatchingGenresCommand);
commands.set('CREATEPLAYLIST', CreatePlaylistCommand);
commands.set('GETPLAYLISTBYID', GetPlaylistByIdCommand);
commands.set('ADDARTIST', AddArtistCommand);
commands.set('GETARTISTBYID', GetArtistByIdCommand);
commands.set('GETTRACKSMATCHINGARTIST', GetTracksMatchingArtistCommand);
commands.set('ADDALBUM', AddAlbumCommand);
commands.set('GETALBUMBYID', GetAlbumByIdCommand);

module.exports = commands;