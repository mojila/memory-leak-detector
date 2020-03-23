import React from 'react';
import { Pane, Button, Heading } from 'evergreen-ui';

export default function MemoryLeakCount() {
    return (<Pane width={260} background="tint1" padding={8} 
        paddingRight={16} paddingLeft={16} borderRadius={4}
        marginLeft={8}>
        <Pane display="flex">
            <Button justifyContent="center" disabled={true} flex={1} height={24}>Memory Leak Detected</Button>
        </Pane>
        <Pane display="flex" justifyContent="center" marginTop={16}>
            <Heading size={800}>{0}</Heading>
        </Pane>
    </Pane>)
}