import React, { useReducer } from 'react';
import createUseContext from "constate";

const ACTIONS = {
    ACTIVATE: 'ACTIVATE',
    DEACTIVATE: 'DEACTIVATE'
}

export const Reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.ACTIVATE:
            return {
                active: true
            };
        case ACTIONS.DEACTIVATE:
            return {
                active: false
            };
        default:
            throw new Error();
    }
};

export const State = {
    active: false
};

const useMain = () => {
    const [state, dispatch] = useReducer(Reducer, State);

    const { active } = state;

    const deactivate = () => {
        dispatch({
            type: ACTIONS.DEACTIVATE,
            payload: ''
        });
    };

    const activate = () => {
        dispatch({
            type: ACTIONS.ACTIVATE,
            payload: ''
        });
    };

    return { active, deactivate, activate };
}

export const Context = createUseContext(useMain);