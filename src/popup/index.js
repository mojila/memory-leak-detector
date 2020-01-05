import React from 'react';
import ReactDOM from 'react-dom';
import Header from './component/header';
import { Context } from './context';
import Main from './component/main';

function App() {
    return (
        <Context.Provider>
            {/* <Header/> */}
            <Main/>
        </Context.Provider>
    );
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App/>, mountNode);