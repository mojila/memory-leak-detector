import React, { useState, useEffect } from 'react';
import { Text, Pane } from 'evergreen-ui';

function SimpleCurrentStats(props) {
    const [usedMemory, setUsedMemory] = useState(0);
    const [totalMemory, setTotalMemory] = useState(0);

    useEffect(() => {
        const updateSeries = setInterval(() => {
            setUsedMemory(performance.memory.usedJSHeapSize);
            setTotalMemory(performance.memory.totalJSHeapSize);
        }, 1000);

        return () => clearInterval(updateSeries);

    }, [setTotalMemory, setUsedMemory]);

    return (<Pane marginX={8} elevation={1} padding={8} display="flex">
        <Pane flex={1}>
            <Text>Memory Used: {(usedMemory / 1000000).toFixed(2)} Mb</Text>
        </Pane>
        <Pane flex={1}>
            <Text>Memory Heap Total: {(totalMemory / 1000000).toFixed(2)} Mb</Text>
        </Pane>
    </Pane>);
};

export default SimpleCurrentStats;