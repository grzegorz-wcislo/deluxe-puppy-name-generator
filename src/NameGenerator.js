import {getWords} from './WordsAPI';

export const generate = ({letter}, onSuccess, onFailure) => {
    getWords({sp: letter + "*"})
    .then(resp => onSuccess(resp.map(({word}) => word)))
    .catch(err => onFailure(err));
};
