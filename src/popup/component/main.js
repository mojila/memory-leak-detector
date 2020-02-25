import React, { useEffect, useState, useContext } from 'react';
import { Pane, Button } from 'evergreen-ui';
import MemoryHeapChart from './memory_heap_chart';
import SimpleCurrentStats from './simple-current-stats';
import MemoryContext from '../../context';

function Main(props) {
    const { store } = useContext(MemoryContext);

    const toDashboard = () => {
        let url = chrome.runtime.getURL('option/index.html');

        let link = document.createElement("a");
        link.target = "_blank";
        link.href = `${url}?hostname=${store.url.hostname}&port=${store.url.port}`;
        link.click();
    }

    return (<Pane paddingTop={8}>
        <MemoryHeapChart/>
        <SimpleCurrentStats/>
        <Pane marginX={8} marginY={8}>
            <Pane display="flex" justifyContent="space-between">
                <Button flex={1} appearance="primary" intent="danger" marginRight={8}>Memory Leak (0)</Button>
                <Button flex={1} appearance="primary" intent="warning" marginRight={8}>Memory Anomalies ({store.outliers.length})</Button>
                <Button onClick={toDashboard}>Meleak Dashboard</Button>
            </Pane>
        </Pane>
    </Pane>);
}

export default Main;