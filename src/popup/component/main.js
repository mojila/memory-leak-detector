import React, { useEffect, useState } from 'react';
import { Pane } from 'evergreen-ui';
import MemoryHeapChart from '../../panel/components/memory_heap_chart';
import SimpleCurrentStats from './simple-current-stats';

function Main(props) {
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

    return (<Pane>
        <MemoryHeapChart/>
        <SimpleCurrentStats usedMemory={usedMemory} totalMemory={totalMemory}/>
    </Pane>);
}

export default Main;