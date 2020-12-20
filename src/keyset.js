export const keysetOptions = {
    numberKeys: {
        title: 'Number keys',
        keys: '12345'.split(''),
    },
    leftHand: {
        title: 'Left hand',
        keys: 'qwerv'.split(''),
    },
    rightHand: {
        title: 'Right hand',
        keys: 'nuiop'.split(''),
    },
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
