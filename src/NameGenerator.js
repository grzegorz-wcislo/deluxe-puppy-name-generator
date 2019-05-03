import {getStartingWith} from './WordsAPI';

const extractWords = words => words.map(({word}) => word);

const filterNouns = words => words.filter(({tags}) => tags && tags.includes("n"));

const filterAdjectives = words => words.filter(({tags}) => tags && tags.includes("adj"));

export const generate = ({letter}, onSuccess, onFailure) => {
    getStartingWith(letter)
    .then(resp => onSuccess(extractWords(filterAdjectives(resp))))
    .catch(err => onFailure(err));
};
