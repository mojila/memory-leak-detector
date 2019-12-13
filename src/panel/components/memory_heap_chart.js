import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { Text, Pane } from 'evergreen-ui';
import moment from 'moment';
import CurrentMemoryStats from './current_memory_stats';

export default function MemoryHeapChart(props) {
    const [options, setOptions] = useState({
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
  
        title: {
            text: 'Memory Usage',
            align: 'left'
        },
        xaxis: {
            type: 'numeric'
        }
    });
    const [usedMemory, setUsedMemory] = useState(performance.memory.usedJSHeapSize);
    const [totalMemory, setTotalMemory] = useState(performance.memory.totalJSHeapSize);
    const [series, setSeries] = useState([{
        name: 'Memory Heap',
        data: [ { x: moment().format('HH:mm:ss'), y: performance.memory.usedJSHeapSize } ]
    }, {
        name: 'Memory Total',
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
                <ApexChart options={options} series={series} type="line" height="240" />
            </Pane>
            <Pane flex={1} background="overlay" marginLeft={16} borderRadius={4} padding={8} elevation={1}>
                <Pane display="flex">
                    <CurrentMemoryStats usedMemory={usedMemory} totalMemory={totalMemory}/>
                </Pane>
                <Pane flex={1} display="flex">
                    <Pane flex={1} padding={8}>
                        
                    </Pane>
                </Pane>
            </Pane>
        </Pane>
    </React.Fragment>);
}
