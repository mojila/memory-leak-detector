import React, { useState, useEffect, useContext } from 'react';
import { Text, Pane } from 'evergreen-ui';
import MemoryContext from '../../context';


function SimpleCurrentStats(props) {
    const { store, dispatch } = useContext(MemoryContext);

    return (<Pane marginX={8} elevation={1} padding={8} display="flex">
        <Pane flex={1}>
            <Text>Used Heap: {(store.usedHeap / 1000000).toFixed(2)} Mb</Text>
        </Pane>
        <Pane flex={1}>
            <Text>Total Heap: {(store.totalHeap / 1000000).toFixed(2)} Mb</Text>
        </Pane>
    </Pane>);
};

export default SimpleCurrentStats;