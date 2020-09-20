/* eslint-disable no-undef */
const GetTrackByIdCommand = require('./track/GetTrackByIdCommand');
const AddTrackCommand = require('./track/AddTrackCommand');
const GetTracksMatchingGenresCommand = require('./track/GetTracksMatchingGenresCommand');
const ListTracksCommand = require('./track/ListTracksCommand');

const CreatePlaylistCommand = require('./playlist/CreatePlaylistCommand');
const GetPlaylistByIdCommand = require('./playlist/GetPlaylistByIdCommand');
const ListPlaylistsCommand = require('./playlist/ListPlaylistsCommand');

const AddArtistCommand = require('./artist/AddArtistCommand');
const GetArtistByIdCommand = require('./artist/GetArtistByIdCommand');
const GetTracksMatchingArtistCommand = require('./artist/GetTracksMatchingArtistCommand');
const ListArtistsCommand = require('./artist/ListArtistsCommand');

const AddAlbumCommand = require('./album/AddAlbumCommand');
const GetAlbumByIdCommand = require('./album/GetAlbumByIdCommand');
const ListAlbumsCommand = require('./album/ListAlbumsCommand');



const commands = new Map();
// track commands
commands.set('GETTRACKBYID', GetTrackByIdCommand);
commands.set('ADDTRACK', AddTrackCommand);
commands.set('GETTRACKSMATCHINGGENRES', GetTracksMatchingGenresCommand);
commands.set('LISTTRACKS', ListTracksCommand);
// playlist commands
commands.set('CREATEPLAYLIST', CreatePlaylistCommand);
commands.set('GETPLAYLISTBYID', GetPlaylistByIdCommand);
commands.set('LISTPLAYLISTS', ListPlaylistsCommand);
// artist commands
commands.set('ADDARTIST', AddArtistCommand);
commands.set('GETARTISTBYID', GetArtistByIdCommand);
commands.set('GETTRACKSMATCHINGARTIST', GetTracksMatchingArtistCommand);
commands.set('LISTARTISTS', ListArtistsCommand);
// album commands
commands.set('ADDALBUM', AddAlbumCommand);
commands.set('GETALBUMBYID', GetAlbumByIdCommand);
commands.set('LISTALBUMS', ListAlbumsCommand);

module.exports = commands;
