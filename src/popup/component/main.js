import React, { useEffect, useState } from 'react';
import { Pane } from 'evergreen-ui';
import MemoryHeapChart from './memory_heap_chart';
import SimpleCurrentStats from './simple-current-stats';

function Main() {
    return (<Pane>
        <MemoryHeapChart/>
        <SimpleCurrentStats/>
    </Pane>);
}

export default Main;