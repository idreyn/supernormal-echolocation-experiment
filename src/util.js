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
