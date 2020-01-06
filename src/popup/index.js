import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import Header from './component/header';
import Main from './component/main';
import MemoryContext, { Store, Reducer } from '../context';

function App() {
    const [store, dispatch] = useReducer(Reducer, Store);

    return (
        <MemoryContext.Provider value={{ store, dispatch }}>
            {/* <Header/> */}
            <Main/>
        </MemoryContext.Provider>
    );
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App/>, mountNode);