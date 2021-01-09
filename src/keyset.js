export const keysetOptions = {
    leftHandSpace: {
        title: 'Left hand (home row)',
        keys: ['a', 's', 'd', 'f', 'space'],
    },
    righHandSpace: {
        title: 'Right hand (home row)',
        keys: ['space', 'j', 'k', 'l', ';'],
    },
};

let chosenKeyset = keysetOptions.numberKeys;

export const getChosenKeyset = () => chosenKeyset;

export const setChosenKeyset = (keyset) => {
    chosenKeyset = keyset;
};
