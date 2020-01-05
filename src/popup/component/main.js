import React, { useEffect, useState } from 'react';
import { Pane } from 'evergreen-ui';
import MemoryHeapChart from '../../panel/components/memory_heap_chart';
import SimpleCurrentStats from './simple-current-stats';

function Main(props) {
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

    return (<Pane>
        {/* <MemoryHeapChart/> */}
        <SimpleCurrentStats usedHeap={usedHeap} totalHeap={totalHeap}/>
    </Pane>);
}

export default Main;