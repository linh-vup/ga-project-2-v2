import axios from 'axios';

const ALBUMS_URL = 'https://api.napster.com/v2.2/albums/top';
const API_KEY = {
  params: { apikey: process.env.REACT_APP_NAPSTER_API_KEY }
};

const getParams = (offset) => ({
  params: {
    limit: 200,
    apikey: process.env.REACT_APP_NAPSTER_API_KEY,
    offset
  }
});

export const getAlbums = (offset) => {
  return axios.get(ALBUMS_URL, getParams(offset));
};

export const getAlbumWithTracks = (albumWithTracksEndpoint) => {
  return axios.get(albumWithTracksEndpoint, API_KEY);
};

export const getTrack = (trackId) => {
  return axios.get(`https://api.napster.com/v2.2/tracks/${trackId}`, API_KEY);
};

export const getImages = (albumImagesEndpoint) => {
  return axios.get(albumImagesEndpoint, API_KEY);
};
