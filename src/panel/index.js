import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pane } from 'evergreen-ui';
import MemoryHeapChart from './components/memory_heap_chart';

const App = (props) => {
    return (<Pane>
        <Pane margin={16}>
            <MemoryHeapChart/>
        </Pane>
    </Pane>);
};

ReactDOM.render(<App/>, document.getElementById('app'));