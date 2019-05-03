import axios from 'axios';

const URL = "http://api.datamuse.com/words/";

export const getWords = (params) => {
  params["md"] = "p";
  return axios.get(URL, {params})
    .then(resp => resp.data);
};

export const getStartingWith = prefix => getWords({sp: prefix + "*"});
