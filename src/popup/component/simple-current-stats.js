import React, { useState, useEffect } from 'react';
import { Text, Pane } from 'evergreen-ui';

function SimpleCurrentStats({ usedHeap, totalHeap }) {
    return (<Pane marginX={8} elevation={1} padding={8} display="flex">
        <Pane flex={1}>
            <Text>Used Heap: {(usedHeap / 1000000).toFixed(2)} Mb</Text>
        </Pane>
        <Pane flex={1}>
            <Text>Total Heap: {(totalHeap / 1000000).toFixed(2)} Mb</Text>
        </Pane>
    </Pane>);
};

export default SimpleCurrentStats;