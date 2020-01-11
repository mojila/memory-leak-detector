import React, { useEffect, useContext, useState } from 'react';
import { Text, Pane, Button, Table, TableHeaderCell, TableRow } from 'evergreen-ui';
import MemoryContext, { actions } from '../../context';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';

function MemoryAnomalies(props) {
    const { store, dispatch } = useContext(MemoryContext);
    const [selected_anomalies, set_selected_anomalies] = useState('');
    const [series, set_series] = useState([]);
    const [anomaly_series, set_anomaly_series] = useState([]);

    const options = {
        chart: {
            id: 'memory-usage'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [4, 4],
            curve: 'straight',
            dashArray: [2,0]
        },
        grid: {
            padding: {
                right: 8,
                left: 16
            }
        },
        xaxis: {
            type: 'numeric'
        },
        markers: {
            size: 4,
        }
    };

    const load_anomalies = () => {
        let outliers = [];
        let from_localstorage = localStorage.getItem(`outliers-${store.url.hostname}-${store.url.port}`);

        if (from_localstorage) {
            outliers = JSON.parse(from_localstorage);
        }

        dispatch({ type: actions.SET_OUTLIERS, value: outliers });
    }

    const show_series = (series) => {
        set_selected_anomalies(series.series[0].timestamp);
        
        let new_series = [{
            name: 'Memory Heap Graph',
            data: series.series.map(d => ({ x: moment(d.timestamp).format('HH:mm:ss'), y: d.value }))
        }];

        set_series(new_series);
        set_anomaly_series(series.outliers);
    }

    useEffect(() => {
        if (store.outliers.length < 1 && store.url) {
            load_anomalies();
        }
    }, [dispatch]);

    return (<Pane>
        <Pane padding={8}>
            <Text>Anomalies</Text>
        </Pane>
        <Pane padding={8}>
            <ReactApexChart options={options} series={series} type={'line'} height="200" />
        </Pane>
        <Pane padding={8}>
            <Pane display="flex" justifyContent="center">
                <Text>Memory Anomalies Data</Text>
            </Pane>
            <Table marginTop={8}>
                <Table.Head>
                    <Table.TextHeaderCell>
                        Time
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Memory Heap Size
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    { anomaly_series.map((d, i) => <Table.Row key={i+1}>
                        <Table.TextCell>{ moment(d.timestamp).format('HH:mm:ss') }</Table.TextCell>
                        <Table.TextCell>{ d.value } Bytes</Table.TextCell>
                    </Table.Row>) }
                </Table.Body>
            </Table>
        </Pane>
        <Pane display="flex" flexWrap="wrap">
            { store.outliers.map((d, i) => <Pane margin={8} key={i+1}>
                <Button 
                    appearance={selected_anomalies === d.series[0].timestamp ? "primary":"default"}
                    onClick={() => show_series(d)}>
                        { `${moment(d.series[0].timestamp).format('DD-MM-YYYY HH:mm:ss')} - 
                        ${moment(d.series[59].timestamp).format('hh:mm:ss')}` }
                    </Button>
            </Pane>) }
        </Pane>
    </Pane>)
}

export default MemoryAnomalies;