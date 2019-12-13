import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { Text, Pane, SegmentedControl } from 'evergreen-ui';
import moment from 'moment';
import CurrentMemoryStats from './current_memory_stats';

export default function MemoryHeapChart(props) {
    const options = {
          chart: {
              id: 'memory-usage'
          },
          dataLabels: {
              enabled: false
          },
          stroke: {
              curve: 'straight'
          },
          grid: {
            padding: {
                right: 0,
                left: 16
            }
        },
        xaxis: {
            type: 'numeric'
        }
    };
    const chartType = [
        { label: 'Line', value: 'line' },
        { label: 'Scatter', value: 'scatter' },
    ];
    const [usedMemory, setUsedMemory] = useState(performance.memory.usedJSHeapSize);
    const [totalMemory, setTotalMemory] = useState(performance.memory.totalJSHeapSize);
    const [selectedChartType, setSelectedChartType] = useState('line');
    const [series, setSeries] = useState([{
        name: 'Memory Used',
        data: [ { x: moment().format('HH:mm:ss'), y: performance.memory.usedJSHeapSize } ]
    }, {
        name: 'Memory Heap Total',
        data: [ { x: moment().format('HH:mm:ss'), y: performance.memory.totalJSHeapSize }]
    }]);

    useEffect(() => {
        const updateSeries = setInterval(() => {
            let newSeries = series;

            if (newSeries[0].data.length > 9) {
                newSeries[0].data = newSeries[0].data.slice(1);
                newSeries[1].data = newSeries[1].data.slice(1);
            }

            newSeries[0].data.push({ x: moment().format('HH:mm:ss'), y: performance.memory.usedJSHeapSize });
            newSeries[1].data.push({ x: moment().format('HH:mm:ss'), y: performance.memory.totalJSHeapSize });

            setSeries(newSeries);
            setUsedMemory(performance.memory.usedJSHeapSize);
            setTotalMemory(performance.memory.totalJSHeapSize);
            ApexCharts.exec('memory-usage', 'updateSeries', newSeries);
        }, 1000);

        return () => updateSeries();
    }, [setSeries]);
    
    return (<React.Fragment>
        <Pane display="flex">
            <Pane flex={1} background="tint2" padding={8} borderRadius={4} elevation={1}>
                <Pane>
                    <Pane padding={8}>
                        <SegmentedControl
                            name="Type"
                            height={24}
                            options={chartType}
                            value={selectedChartType}
                            onChange={value => setSelectedChartType(value)}/>
                    </Pane>
                    <Pane>
                        { selectedChartType === 'line' && <ApexChart options={options} series={series} type={selectedChartType} height="220" /> }
                        { selectedChartType === 'scatter' && <ApexChart options={options} series={series} type={selectedChartType} height="220" /> }
                    </Pane>
                </Pane>
            </Pane>
            <Pane flex={1} background="overlay" marginLeft={16} borderRadius={4} padding={8} elevation={1}>
                <Pane display="flex">
                    <CurrentMemoryStats usedMemory={usedMemory} totalMemory={totalMemory}/>
                </Pane>
                <Pane flex={1} display="flex">
                </Pane>
            </Pane>
        </Pane>
    </React.Fragment>);
}
