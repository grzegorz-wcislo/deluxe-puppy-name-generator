import { getStartingWith, getRelated, getMatchingNoun } from "./WordsAPI";

const randomElement = items => items[Math.floor(Math.random() * items.length)];

const extractWords = words => words.map(({ word }) => word);

const filterNouns = words =>
  words.filter(({ tags }) => tags && tags.includes("n"));

const filterAdjectives = words =>
  words.filter(({ tags }) => tags && tags.includes("adj"));

const filterVerbs = words =>
  words.filter(({ tags }) => tags && tags.includes("v"));

const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1);

const generateNofN = async ({ letter }) => {
  const firstWords = await getStartingWith(letter);
  const potentialFirst = extractWords(filterNouns(firstWords));
  const first = randomElement(potentialFirst);

  if (!first) throw new Error("Could not generate names");

  const secondWords = await getRelated(first);
  const potentialSecond = extractWords(filterNouns(secondWords));
  const second = randomElement(potentialSecond);

  if (!second) throw new Error("Could not generate names");

  return `${capitalize(first)} of ${capitalize(second)}`;
};

const generateAdjNoun = async ({ letter }, onSuccess, onFailure) => {
  const firstWords = await getStartingWith(letter);
  const potentialFirst = extractWords(filterAdjectives(firstWords));
  const first = randomElement(potentialFirst);

  if (!first) throw new Error("Could not generate names");

  const secondWords = await getMatchingNoun(first);
  const potentialSecond = extractWords(filterNouns(secondWords));
  const second = randomElement(potentialSecond);

  if (!second) throw new Error("Could not generate names");

  return `${capitalize(first)} of ${capitalize(second)}`;
};

const generateVerbNoun = async ({ letter }, onSuccess, onFailure) => {
  const firstWords = await getStartingWith(letter);
  const potentialFirst = extractWords(filterVerbs(firstWords));
  const first = randomElement(potentialFirst);

  if (!first) throw new Error("Could not generate names");

  const secondWords = await getRelated(first);
  const potentialSecond = extractWords(filterNouns(secondWords));
  const second = randomElement(potentialSecond);

  if (!second) throw new Error("Could not generate names");

  return capitalize(first) + " " + capitalize(second);
};

const generateNoun = async ({ letter }, onSuccess, onFailure) => {
  const firstWords = await getStartingWith(letter);
  const potentialFirst = extractWords(filterNouns(firstWords));
  const first = randomElement(potentialFirst);

  if (!first) throw new Error("Could not generate names");
  return capitalize(first);
};

const generateRandom = async ({ letter }) => {
  let retry = 3;
  let result;

  const getResult = async () => {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        result = await generateNofN({ letter });
        break;
      case 1:
        result = await generateAdjNoun({ letter });
        break;
      case 2:
        result = await generateVerbNoun({ letter });
        break;
      case 3:
      default:
        result = await generateNoun({ letter });
        break;
    }
  };

  while (retry && !result) {
    try {
      await getResult();
    } catch (e) {
      if (retry === 1) {
        throw e;
      }
      retry -= 1;
    }
  }

  return result;
};

export const generate = ({ letter, count = 10 }, onSuccess, onFailure) => {
  const promises = [...Array(count).keys()].map(() =>
    generateRandom({ letter })
  );
  Promise.all(promises)
    .then(onSuccess)
    .catch(onFailure);
};
