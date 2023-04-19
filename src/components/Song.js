import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbums, getAlbumWithTracks, getTrack, getImages } from '../lib/api';

function Song() {
  const { selectedYear } = useParams();
  const [artwork, setArtwork] = useState('');
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const startDataFetching = (offset) => {
      getAlbums(offset)
        .then((res) => {
          const albumsByYear = res.data.albums.filter(
            (album) => album.originallyReleased.substring(0, 4) === selectedYear
          );

          // if selected year returns any albums published in that year

          if (albumsByYear.length) {
            // from the aray of returned albums where release year = selected year, randomly select one
            const randomAlbum =
              albumsByYear[Math.floor(Math.random() * albumsByYear.length)];

            // access api endpoint for selected album images and set artwork
            const randomAlbumImagesEndpoint = randomAlbum.links.images.href;
            getImages(randomAlbumImagesEndpoint).then(({ data }) => {
              const randomNumber = Math.floor(
                Math.random() * data.images.length
              );
              setArtwork(data.images[randomNumber].url);
            });

            // access API endpoint for album with all tracks
            const albumWithTracksEndpoint = randomAlbum.links.tracks.href;
            getAlbumWithTracks(albumWithTracksEndpoint)
              .then(({ data }) => {
                // picks a random track from array
                const randomSongId =
                  data.tracks[Math.floor(Math.random() * data.tracks.length)]
                    .id;

                getTrack(randomSongId)
                  .then((res) => setTrack(res.data))
                  .catch((err) => console.error(err));
              })
              .catch((err) => console.error(err));
          } else {
            startDataFetching(offset + 200);
          }
        })
        .catch((err) => console.error(err));
    };
    startDataFetching(0);
  }, []);

  if (track === null) {
    console.log(track);
    return <p>Loading</p>;
  }

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Q? Not sure why below isn't centered on page, I thought className "container" makes it centered */}
      <div className="container">
        <div className="column is-half-desktop is-one-half-tablet container">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title">{track.tracks[0].name}</h4>
            </div>
            <div className="card-image">
              <figure className="image image is-1by1">
                <img
                  src={artwork}
                  alt="album artwork"
                  loading="lazy"
                  width="255"
                  height="255"
                />
              </figure>
            </div>
            <div className="card-content">
              <h4 className="">
                <strong>Artist:</strong> {track.tracks[0].artistName}
              </h4>
              <h4 className="">
                <strong>Album/EP:</strong> {track.tracks[0].albumName}
              </h4>
              <h4 className="">
                <strong>Released:</strong> {track.tracks[0].albumName}
              </h4>
              <audio controls src={track.tracks[0].previewURL}></audio>
              <button
                className="button is-fullwidth is-medium is-link"
                onClick={reloadPage}
              >
                Give me another one
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Song;