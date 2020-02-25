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
    }],
    minutes: [{
        data: [ { timestamp: moment().toISOString(), value: 0 } ]
    }],
    outliers: [],
    tabId: '',
    selected_menu: 'home',
    url: ''
};

export const actions = {
    SET_USED_HEAP: 'SET_USED_HEAP',
    SET_TOTAL_HEAP: 'SET_TOTAL_HEAP',
    SET_SERIES: 'SET_SERIES',
    SET_MINUTES: 'SET_MINUTES',
    SET_OUTLIERS: 'SET_OUTLIERS',
    SET_TAB_ID: 'SET_TAB_ID',
    SET_SELECTED_MENU: 'SET_SELECTED_MENU',
    SET_URL: 'SET_URL'
};

export const successMessageLog = (message) => console.info(`Success: ${message}`);
export const errorMessageLog = (message) => console.error(new Error(message));

export const Reducer = (state, action) => {
    switch (action.type) {
        case actions.SET_TOTAL_HEAP:
            // successMessageLog(`Total Heap Writed.`);
            return { ...state, totalHeap: action.value };
        case actions.SET_USED_HEAP:
            // successMessageLog(`Used Heap Writed.`);
            return { ...state, usedHeap: action.value };
        case actions.SET_SERIES:
            // successMessageLog(`Series Writed.`);
            return { ...state, series: action.value };
        case actions.SET_MINUTES:
            return { ...state, minutes: action.value };
        case actions.SET_OUTLIERS:
            return { ...state, outliers: action.value };
        case actions.SET_TAB_ID:
            return { ...state, tabId: action.value };
        case actions.SET_SELECTED_MENU:
            return { ...state, selected_menu: action.value };
        case actions.SET_URL:
            return { ...state, url: action.value };
        default:
            errorMessageLog(`Action didn't have type.`);
            return state;
    }
};

export default MemoryContext;
