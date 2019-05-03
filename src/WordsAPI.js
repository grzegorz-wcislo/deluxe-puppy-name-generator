import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const URL = "https://api.datamuse.com/words/";

const cache = setupCache({
  maxAge: 15 * 60 * 1000
});

const cachedAxios = axios.create({
  adapter: cache.adapter
});

export const getWords = params => {
  params["md"] = "p";
  params["max"] = 1000;

  return cachedAxios.get(URL, { params }).then(resp => resp.data);
};

export const getStartingWith = prefix => getWords({ sp: prefix + "*" });

export const getRelated = word => getWords({ rel_bga: word });

export const getMatchingNoun = word => getWords({ rel_jja: word });
