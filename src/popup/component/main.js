import React from 'react';
import { Text, Pane } from 'evergreen-ui';
import MemoryHeapChart from '../../panel/components/memory_heap_chart';
import SimpleCurrentStats from './simple-current-stats';

function Main() {
    return (<Pane>
        <MemoryHeapChart/>
        <SimpleCurrentStats/>
    </Pane>);
}

export default Main;