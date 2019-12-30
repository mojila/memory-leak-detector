import React, { useState, useEffect } from 'react';
import { Pane, Text, SegmentedControl, Button } from 'evergreen-ui';

export default function CurrentMemoryStats(props) {
    const options = [
        { label: 'Byte', value: 'b' },
        { label: 'Kilobyte', value: 'kb' },
        { label: 'Megabyte', value: 'mb' }
    ];
    const [selectedOption, setSelectedOption] = useState('mb');
    const [usedMemory, setUsedMemory] = useState(performance.memory.usedJSHeapSize);
    const [totalMemory, setTotalMemory] = useState(performance.memory.totalJSHeapSize);

    useEffect(() => {
        const updateSeries = setInterval(() => {
            setUsedMemory(performance.memory.usedJSHeapSize);
            setTotalMemory(performance.memory.totalJSHeapSize);
        }, 1000);

        return () => clearInterval(updateSeries);

    }, [setTotalMemory, setUsedMemory]);

    return (<Pane width={260} background="tint1" padding={8} 
        paddingRight={16} paddingLeft={16} borderRadius={4} flex={1}>
        <Pane display="flex" marginBottom={8}>
            <Button flex={1} justifyContent="center" 
                height={24} iconBefore="chart" disabled={true}>
                Current Memory Heap
            </Button>
        </Pane>
        <Pane justifyContent="space-between">
            <SegmentedControl
                name="Unit"
                height={24}
                options={options}
                value={selectedOption}
                onChange={value => setSelectedOption(value)}/>
        </Pane>
        <Pane marginTop={8}>
            <Text>Memory Used: {(usedMemory / (selectedOption === 'b' ? 1:(selectedOption === 'kb' ? 1000:1000000))).toFixed(1)} {selectedOption.toUpperCase()}</Text>
        </Pane>
        <Pane>
            <Text>Heap Total: {(totalMemory / (selectedOption === 'b' ? 1:(selectedOption === 'kb' ? 1000:1000000))).toFixed(1)} {selectedOption.toUpperCase()}</Text>
        </Pane>
    </Pane>)
}