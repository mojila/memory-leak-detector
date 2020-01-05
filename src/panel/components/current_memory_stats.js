import React, { useState, useEffect } from 'react';
import { Pane, Text, SegmentedControl, Button } from 'evergreen-ui';

export default function CurrentMemoryStats({ usedMemory, totalMemory }) {
    const options = [
        { label: 'Byte', value: 'b' },
        { label: 'Kilobyte', value: 'kb' },
        { label: 'Megabyte', value: 'mb' }
    ];
    const [selectedOption, setSelectedOption] = useState('mb');

    return (<Pane width={260} background="tint1" padding={8} 
        paddingRight={16} paddingLeft={16} borderRadius={4} flex={1}>
        <Pane display="flex" marginBottom={8}>
            <Button flex={1} justifyContent="center" 
                height={24} iconBefore="chart" disabled={true}>
                Memory Status
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
            <Text>Current active: {(usedMemory / (selectedOption === 'b' ? 1:(selectedOption === 'kb' ? 1000:1000000))).toFixed(1)} {selectedOption.toUpperCase()}</Text>
        </Pane>
        <Pane>
            <Text>Heap Size: {(totalMemory / (selectedOption === 'b' ? 1:(selectedOption === 'kb' ? 1000:1000000))).toFixed(1)} {selectedOption.toUpperCase()}</Text>
        </Pane>
    </Pane>)
}