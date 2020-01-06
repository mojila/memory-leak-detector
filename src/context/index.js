import React from 'react';
import moment from 'moment';

const MemoryContext = React.createContext();

export const Store = {
    usedHeap: 0,
    totalHeap: 0,
    series: [{
        name: 'Used Heap',
        data: [ { x: moment().format('HH:mm:ss'), y: 0 } ]
    }, {
        name: 'Total Heap',
        data: [ { x: moment().format('HH:mm:ss'), y: 0 }]
    }]
};

export const actions = {
    SET_USED_HEAP: 'SET_USED_HEAP',
    SET_TOTAL_HEAP: 'SET_TOTAL_HEAP',
    SET_SERIES: 'SET_SERIES'
};

export const successMessageLog = (message) => console.log(`Success: ${message}`);
export const errorMessageLog = (message) => console.log(new Error(message));

export const Reducer = (state, action) => {
    switch (action.type) {
        case actions.SET_TOTAL_HEAP:
            successMessageLog(`Total Heap Writed.`);
            return { ...state, totalHeap: action.value };
        case actions.SET_USED_HEAP:
            successMessageLog(`Used Heap Writed.`);
            return { ...state, usedHeap: action.value };
        case actions.SET_SERIES:
            successMessageLog(`Series Writed.`);
            return { ...state, series: action.value };
        default:
            errorMessageLog(`Action didn't have type.`);
            return state;
    }
};

export default MemoryContext;
