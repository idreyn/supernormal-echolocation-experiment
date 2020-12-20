import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';

const ChoiceContext = React.createContext({ name: '', value: null, onChange: () => {} });

export const ChoiceSet = ({ children, name, onChange, value }) => {
    return (
        <ChoiceContext.Provider value={{ name, onChange, value }}>
            {children}
        </ChoiceContext.Provider>
    );
};

export const Choice = ({ title, value, children, disabled = false }) => {
    const { name, onChange, value: selectedValue } = useContext(ChoiceContext);
    const selected = value === selectedValue;
    const handleChange = useCallback(() => onChange(value));

    return (
        <label className={classNames('choice-box', selected && 'selected', disabled && 'disabled')}>
            <input
                type="radio"
                name={name}
                value={value}
                onChange={handleChange}
                checked={selected}
                disabled={disabled}
            />
            <div className="inner">
                <div className="title">{title}</div>
                {children}
            </div>
        </label>
    );
};
