import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'evergreen-ui';

const App = (props) => {
    return (<div>
        <p>Adaw bray test</p>
        <Button>Hello</Button>
    </div>);
};

ReactDOM.render(<App/>, document.getElementById('app'));