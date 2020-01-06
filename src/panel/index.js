import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import { Pane } from 'evergreen-ui';
import MemoryHeapChart from './components/memory_heap_chart';
import CurrentMemoryStats from './components/current_memory_stats';
import MemoryLeakCount from './components/memory_leak_count';
import LastMemoryLeak from './components/last_memory_leak';
import MemoryContext, { Store, Reducer } from '../context';

const App = () => {
    const [store, dispatch] = useReducer(Reducer, Store);

    return (<MemoryContext.Provider value={{ store, dispatch }}>
        <Pane display="flex">
            {/* Current Stats */}
            <Pane flex={1} background="tint2" padding={8} borderRadius={4} elevation={1} marginRight={16}>
                <MemoryHeapChart/>
            </Pane>
            <Pane flex={1} background="overlay" borderRadius={4} padding={8} elevation={1}>
                <Pane display="flex">
                    <CurrentMemoryStats/>
                    <MemoryLeakCount/>
                </Pane>
                <Pane>
                    <LastMemoryLeak/>
                </Pane>
            </Pane>
        </Pane>
    </MemoryContext.Provider>);
};

ReactDOM.render(<App/>, document.getElementById('app'));