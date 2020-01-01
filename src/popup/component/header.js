import React from 'react';
import { Button, Pane, Heading, Icon } from 'evergreen-ui';
import { Context } from '../context';

function Header() {
    const { activate, active, deactivate } = Context();

    return (
        <Pane display="flex" background="tint2" borderRadius={4} padding={14}>
            <Pane flex={1} alignItems="center" display="flex">
                <Heading size={500}>
                    <Icon icon={active ? 'tick-circle':'stop'} color={active ? 'success':'danger'}/> 
                    { active ? ' Detector Activated':' Detector Deactivated' }
                </Heading>
            </Pane>
            <Pane>
                { active
                    ? <Button appearance="primary" intent="danger"
                    onClick={() => deactivate()}>Deactivate</Button>
                    : <Button appearance="primary" intent="success"
                    onClick={() => activate()}>Activate</Button>
                }
            </Pane>
        </Pane>
    );
}

export default Header;