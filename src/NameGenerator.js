import {getStartingWith, getRelated, getMatchingNoun} from './WordsAPI';

const randomElement = (items) => items[Math.floor(Math.random()*items.length)];

const extractWords = words => words.map(({word}) => word);

const filterNouns = words => words.filter(({tags}) => tags && tags.includes("n"));

const filterAdjectives = words => words.filter(({tags}) => tags && tags.includes("adj"));

const filterVerbs = words => words.filter(({tags}) => tags && tags.includes("v"));

const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1);

const generateNofN = async ({letter}, onSuccess, onFailure) => {
  try {
    const firstWords = await getStartingWith(letter);
    const potentialFirst = extractWords(filterNouns(firstWords));
    const first = randomElement(potentialFirst);

    if (!first) throw("Could not find name");

    const secondWords = await getRelated(first);
    const potentialSecond = extractWords(filterNouns(secondWords));
    const second = randomElement(potentialSecond);

    if (!second) throw("Could not find name");

    onSuccess([`${capitalize(first)} of ${capitalize(second)}`]);
  } catch(err) {
    onFailure(err);
  }
};

const generateAdjNoun = async ({letter}, onSuccess, onFailure) => {
  try {
    const firstWords = await getStartingWith(letter);
    const potentialFirst = extractWords(filterAdjectives(firstWords));
    const first = randomElement(potentialFirst);

    if (!first) throw("Could not find name");

    const secondWords = await getMatchingNoun(first);
    const potentialSecond = extractWords(filterNouns(secondWords));
    const second = randomElement(potentialSecond);

    if (!second) throw("Could not find name");

    onSuccess([`${capitalize(first)} of ${capitalize(second)}`]);
  } catch(err) {
    onFailure(err);
  }
};

const generateVerbNoun = async ({letter}, onSuccess, onFailure) => {
  try {
    const firstWords = await getStartingWith(letter);
    const potentialFirst = extractWords(filterVerbs(firstWords));
    const first = randomElement(potentialFirst);

    if (!first) throw("Could not find name");

    const secondWords = await getRelated(first);
    const potentialSecond = extractWords(filterNouns(secondWords));
    const second = randomElement(potentialSecond);

    if (!second) throw("Could not find name");

    onSuccess([capitalize(first) + " " + capitalize(second)]);
  } catch(err) {
    onFailure(err);
  }
};

const generateNoun = async ({letter}, onSuccess, onFailure) => {
  try {
    const firstWords = await getStartingWith(letter);
    const potentialFirst = extractWords(filterNouns(firstWords));
    const first = randomElement(potentialFirst);

    if (!first) throw("Could not find name");
    onSuccess([capitalize(first)]);
  } catch(err) {
    onFailure(err);
  }
};

export const generate = ({letter}, onSuccess, onFailure) => {
  switch (Math.floor(Math.random()*4)) {
  case 0:
    generateNofN({letter}, onSuccess, onFailure);
    break;
  case 1:
    generateAdjNoun({letter}, onSuccess, onFailure);
    break;
  case 2:
    generateVerbNoun({letter}, onSuccess, onFailure);
    break;
  case 3:
  default:
    generateNoun({letter}, onSuccess, onFailure);
    break;
  }
};
