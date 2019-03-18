import Axios from 'axios';

import dextuin from '../fixtures/dextuin.json';
import rando from '../fixtures/rando.json';
import niamh from '../fixtures/niamh.json';
import enrique from '../fixtures/enrique.json';
import brine from '../fixtures/brine.json';

import characterConfig from '../fixtures/config.json';

const IS_DEV = process.env.NODE_ENV === 'development';
const API_URL = process.env.REACT_APP_API_URL;

const baseAPI = Axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-type': 'application/json; charset=utf-8' },
});

const api = {
  characterConfig: () => IS_DEV
    ? Promise.resolve(characterConfig)
    : baseAPI.get('/api/config/json').then(resp => resp.data),

  character: id => IS_DEV
    ? Promise.resolve(api.fixtures.find(char => char.id === parseInt(id)))
    : baseAPI.get(`/character/${id}/json`).then(resp => resp.data),

  characters: ids => IS_DEV
    ? Promise.resolve(api.fixtures)
    : Promise.all(ids.map(id => api.character(id))),

  fixtures: [
    dextuin,
    rando,
    niamh,
    enrique,
    brine,
  ]
};

export default api;
