import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pane } from 'evergreen-ui';
import MemoryHeapChart from './components/memory_heap_chart';
import CurrentMemoryStats from './components/current_memory_stats';
import MemoryLeakCount from './components/memory_leak_count';
import LastMemoryLeak from './components/last_memory_leak';

const App = (props) => {
    const [usedMemory, setUsedMemory] = useState(0);
    const [totalMemory, setTotalMemory] = useState(0);

    useEffect(() => {
        const updateSeries = setInterval(() => {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if ([...tabs].length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                        let { memoryUsed, memoryHeapTotal } = response.farewell;
                        setUsedMemory(memoryUsed);
                        setTotalMemory(memoryHeapTotal);
                    });
                }
            });
        }, 1000);

        return () => clearInterval(updateSeries);

    }, [setTotalMemory, setUsedMemory]);

    return (<Pane display="flex">
        {/* Current Stats */}
        <Pane flex={1} background="tint2" padding={8} borderRadius={4} elevation={1} marginRight={16}>
            <MemoryHeapChart/>
        </Pane>
        <Pane flex={1} background="overlay" borderRadius={4} padding={8} elevation={1}>
            <Pane display="flex">
                <CurrentMemoryStats usedMemory={usedMemory} totalMemory={totalMemory}/>
                <MemoryLeakCount/>
            </Pane>
            <Pane>
                <LastMemoryLeak/>
            </Pane>
        </Pane>
    </Pane>);
};

ReactDOM.render(<App/>, document.getElementById('app'));