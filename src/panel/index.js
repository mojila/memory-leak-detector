import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pane } from 'evergreen-ui';
import MemoryHeapChart from './components/memory_heap_chart';
import CurrentMemoryStats from './components/current_memory_stats';
import MemoryLeakCount from './components/memory_leak_count';
import LastMemoryLeak from './components/last_memory_leak';

const App = (props) => {
    const [usedHeap, setUsedHeap] = useState(0);
    const [totalHeap, setTotalHeap] = useState(0);

    useEffect(() => {
        const updateSeries = setInterval(() => {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if ([...tabs].length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                        let { memoryUsed, memoryHeapTotal } = response.farewell;
                        setUsedHeap(memoryUsed);
                        setTotalHeap(memoryHeapTotal);
                    });
                }
            });
        }, 1000);

        return () => clearInterval(updateSeries);

    }, [setTotalHeap, setUsedHeap]);

    return (<Pane display="flex">
        {/* Current Stats */}
        <Pane flex={1} background="tint2" padding={8} borderRadius={4} elevation={1} marginRight={16}>
            {/* <MemoryHeapChart/> */}
        </Pane>
        <Pane flex={1} background="overlay" borderRadius={4} padding={8} elevation={1}>
            <Pane display="flex">
                <CurrentMemoryStats usedHeap={usedHeap} totalHeap={totalHeap}/>
                <MemoryLeakCount/>
            </Pane>
            <Pane>
                <LastMemoryLeak/>
            </Pane>
        </Pane>
    </Pane>);
};

ReactDOM.render(<App/>, document.getElementById('app'));