export const range = (from, to, step = 1) => {
    const res = [];
    for (let i = from; i <= to; i += step) {
        res.push(i);
    }
    return res;
};

export const getUrlParam = (param) => {
    if ('URLSearchParams' in window) {
        return new URLSearchParams(window.location.search).get(param);
    }
    return null;
};

export const getOrdinalChoiceMap = (choices) => {
    const res = {};
    choices.forEach((choice, index) => {
        res[(index + 1).toString()] = choice;
    });
    return res;
};

export const getKeyChoiceMap = (responseKeys, choices) => {
    if (choices.length !== responseKeys.length) {
        throw new Error('Need number of choices and keys to match');
    }
    const res = {};
    responseKeys.forEach((key, index) => {
        res[key] = choices[index];
    });
    return res;
};

export const number = (str) => parseFloat(str);
export const string = (any) => any.toString();
export const numberOrString = (val) => {
    const asNumber = parseFloat(val);
    if (Number.isNaN(asNumber)) {
        return val.toString();
    }
    return asNumber;
};
