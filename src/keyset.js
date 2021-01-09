export const keysetOptions = {
    leftHand: {
        id: 'left-hand',
        title: 'Left hand (home row)',
        keys: ['a', 's', 'd', 'f', 'space'],
    },
    righHand: {
        id: 'right-hand',
        title: 'Right hand (home row)',
        keys: ['space', 'j', 'k', 'l', ';'],
    },
};

let chosenKeyset = keysetOptions.leftHand;

export const getChosenKeyset = () => chosenKeyset;

export const setChosenKeyset = (keyset) => {
    chosenKeyset = keyset;
};
