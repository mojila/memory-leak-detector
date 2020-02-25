import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MemoryContext, { Store, Reducer, actions } from '../context';
import { Text, Pane, Button } from 'evergreen-ui';
import Menu from './components/menu';
import MENUS from '../helpers/menus';
import MemoryAnomalies from './components/memory_anomalies';

const App = () => {
    const [store, dispatch] = useReducer(Reducer, Store);

    useEffect(() => {
        let url = window.location.search.replace('?','');
        let params = url.replace('hostname=','').replace('port=','').split('&')

        dispatch({ type: actions.SET_URL, value: { hostname: params[0], port: params[1] } })
    }, [dispatch])

    return (<MemoryContext.Provider value={{ store, dispatch }}>
        <Pane display="flex" justifyContent="space-between">
            <Menu/>
            <Pane marginLeft={8} flex={1} elevation={1} padding={8}>
                {store.selected_menu === MENUS.memory_anomalies
                    && <MemoryAnomalies/>}
            </Pane>
        </Pane>
    </MemoryContext.Provider>);
};

ReactDOM.render(<App/>, document.getElementById('app'));