import React from 'react';
import ReactDOM from 'react-dom';
import { Pane, Text } from 'evergreen-ui';

const App = (props) => {
    return (<Pane>
        <Pane margin={16}>
            <Text>Hello</Text>
        </Pane>
    </Pane>);
};

ReactDOM.render(<App/>, document.getElementById('app'));