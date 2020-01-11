import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import MemoryContext, { Store, Reducer } from '../context';
import { Text, Pane } from 'evergreen-ui';

const App = () => {
    const [store, dispatch] = useReducer(Reducer, Store);

    return (<MemoryContext.Provider value={{ store, dispatch }}>
        <Pane>
            <Text>Adaw</Text>
        </Pane>
    </MemoryContext.Provider>);
};

ReactDOM.render(<App/>, document.getElementById('app'));