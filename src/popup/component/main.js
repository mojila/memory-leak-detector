import React from 'react';
import MemoryGraph from './memory-graph';
import { Context } from '../context';
import { Text, Pane } from 'evergreen-ui';

function Main() {
    const { active } = Context();

    return (<div>
        { active
            ? <MemoryGraph/>
            : <Pane padding={16} elevation={1}>
                <Text>The detector is not active</Text>
            </Pane>
        }
    </div>);
}

export default Main;