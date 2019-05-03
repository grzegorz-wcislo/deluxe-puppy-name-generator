import {getStartingWith, getRelated, getMatchingNoun} from './WordsAPI';

const randomElement = (items) => items[Math.floor(Math.random()*items.length)];

const extractWords = words => words.map(({word}) => word);

const filterNouns = words => words.filter(({tags}) => tags && tags.includes("n"));

const filterAdjectives = words => words.filter(({tags}) => tags && tags.includes("adj"));

const filterVerbs = words => words.filter(({tags}) => tags && tags.includes("v"));

const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1);

const generateNofN = async ({letter}) => {
  const firstWords = await getStartingWith(letter);
  const potentialFirst = extractWords(filterNouns(firstWords));
  const first = randomElement(potentialFirst);
  
  if (!first) throw new Error("Could not find name");
  
  const secondWords = await getRelated(first);
  const potentialSecond = extractWords(filterNouns(secondWords));
  const second = randomElement(potentialSecond);
  
  if (!second) throw new Error("Could not find name");

  return `${capitalize(first)} of ${capitalize(second)}`;
};

const generateAdjNoun = async ({letter}, onSuccess, onFailure) => {
  const firstWords = await getStartingWith(letter);
  const potentialFirst = extractWords(filterAdjectives(firstWords));
  const first = randomElement(potentialFirst);
  
  if (!first) throw new Error("Could not find name");
  
  const secondWords = await getMatchingNoun(first);
  const potentialSecond = extractWords(filterNouns(secondWords));
  const second = randomElement(potentialSecond);
  
  if (!second) throw new Error("Could not find name");
  
  return `${capitalize(first)} of ${capitalize(second)}`;
};

const generateVerbNoun = async ({letter}, onSuccess, onFailure) => {
  const firstWords = await getStartingWith(letter);
  const potentialFirst = extractWords(filterVerbs(firstWords));
  const first = randomElement(potentialFirst);
  
  if (!first) throw new Error("Could not find name");
  
  const secondWords = await getRelated(first);
  const potentialSecond = extractWords(filterNouns(secondWords));
  const second = randomElement(potentialSecond);
  
  if (!second) throw new Error("Could not find name");
  
  return capitalize(first) + " " + capitalize(second);
};

const generateNoun = async ({letter}, onSuccess, onFailure) => {
  const firstWords = await getStartingWith(letter);
  const potentialFirst = extractWords(filterNouns(firstWords));
  const first = randomElement(potentialFirst);
  
  if (!first) throw new Error("Could not find name");
  return capitalize(first);
};

const generateRandom = ({letter}) => {
  switch (Math.floor(Math.random()*4)) {
  case 0:
    return generateNofN({letter});
  case 1:
    return generateAdjNoun({letter});
  case 2:
    return generateVerbNoun({letter});
  case 3:
  default:
    return generateNoun({letter});
  }
};

export const generate = ({letter, count = 10}, onSuccess, onFailure) => {
  const promises = [...Array(count).keys()].map(() => generateRandom({letter}));
  Promise.all(promises).then(onSuccess).catch(onFailure);
};
