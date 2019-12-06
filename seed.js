const mongoose = require('mongoose');
const ArtistModel = require('./models/artist');
const SongModel = require('./models/song');
const songs = [
  {title: '7 Rings', genre: 'Pop'},
  {title: 'Without Me', genre: 'Pop'},
  {title: 'Shallow', genre: 'Rock'}
];
const artists = [
  {name: 'Ariana Grande', grammys: 4},
  {name: 'Halsey', grammys: 2},
  {name: 'Lady Gaga and Bradley Cooper', grammys: 0}
];
function seedSongsAndArtists() {  
  artists.forEach((artist, index) => {
    ArtistModel.create(artist)
      .then(newArtist => {
        var newSong = new SongModel(songs[index]);
        newSong.artistId = newArtist.id;
        return newSong.save();
      });
  });
}
mongoose.connect('mongodb://127.0.0.1/superUsefulDB', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to MongoDB database in seed file');
  return seedSongsAndArtists();
});