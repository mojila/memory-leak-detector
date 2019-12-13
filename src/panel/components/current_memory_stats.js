import React, { useState } from 'react';
import { Pane, Text, SegmentedControl } from 'evergreen-ui';

export default function CurrentMemoryStats(props) {
    const options = [
        { label: 'Byte', value: 'b' },
        { label: 'Kilobyte', value: 'kb' },
        { label: 'Megabyte', value: 'mb' }
    ];
    const [selectedOption, setSelectedOption] = useState('mb');

    return (<Pane width={280} background="tint1" padding={8} 
        paddingRight={16} paddingLeft={16} borderRadius={4}>
        <Pane>
            <SegmentedControl
                name="Unit"
                height={24}
                options={options}
                value={selectedOption}
                onChange={value => setSelectedOption(value)}/>
        </Pane>
        <Pane marginTop={8}>
            <Text>Current Memory Used: {(props.usedMemory / (selectedOption === 'b' ? 1:(selectedOption === 'kb' ? 1000:1000000))).toFixed(1)} {selectedOption.toUpperCase()}</Text>
        </Pane>
        <Pane>
            <Text>Current Memory Total: {(props.totalMemory / (selectedOption === 'b' ? 1:(selectedOption === 'kb' ? 1000:1000000))).toFixed(1)} {selectedOption.toUpperCase()}</Text>
        </Pane>
    </Pane>)
}