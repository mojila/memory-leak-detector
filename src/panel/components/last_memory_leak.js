import React from 'react';
import { Pane, Button, Table } from 'evergreen-ui';

export default function LastMemoryLeak(props) {
    return (<Pane background="tint1" padding={8} marginTop={8} borderRadius={4}>
        <Pane display="flex">
            <Button justifyContent="center" disabled={true} flex={1} height={24}>Last Memory Leak Detected</Button>
        </Pane>
        <Pane display="flex">
            <Table flex={1}>
                <Table.Head>
                    <Table.TextHeaderCell>
                        Time
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Memory Used
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Memory Heap Total
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Object
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={24}>
                </Table.Body>
            </Table>
        </Pane>
        <Pane display="flex">
            <Button height={32} justifyContent="center" flex={1}>Show All</Button>
        </Pane>
    </Pane>);
}