export const LEFTY_KEYSET = 'qwerv'.split('');
export const RIGHTY_KEYSET = 'nuiop'.split('');

let chosenKeyset = LEFTY_KEYSET;

export const getChosenKeyset = () => chosenKeyset;

export const chooseKeyset = (keyset) => {
    chosenKeyset = keyset;
};
