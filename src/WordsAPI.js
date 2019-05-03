import axios from 'axios';

const URL = "http://api.datamuse.com/words/";

export const getWords = (params) => {
  params["md"] = "p";
  return axios.get(URL, {params})
    .then(resp => resp.data);
};

export const getNouns = (params) => {
  getWords(params).then(words => words.filter(({tags}) => tags.includes("n")));
};

export const getAdjectives = (params) => {
  getWords(params).then(words => words.filter(({tags}) => tags.includes("adj")));
};
