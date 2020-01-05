import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { Pane, SegmentedControl } from 'evergreen-ui';
import moment from 'moment';

export default function MemoryHeapChart(props) {
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
            dashArray: [0, 5]
          },
          grid: {
            padding: {
                right: 8,
                left: 16
            }
        },
        xaxis: {
            type: 'numeric'
        }
    };
    // const chartType = [
    //     { label: 'Line', value: 'line' },
    //     { label: 'Scatter', value: 'scatter' },
    // ];
    // const [selectedChartType, setSelectedChartType] = useState('line');
    const [series, setSeries] = useState([{
        name: 'Used Heap',
        data: [ { x: moment().format('HH:mm:ss'), y: 0 } ]
    }, {
        name: 'Total Heap',
        data: [ { x: moment().format('HH:mm:ss'), y: 0 }]
    }]);

    useEffect(() => {
        const updateSeries = setInterval(() => {
            let newSeries = series;

            if (newSeries[0].data.length > 9) {
                newSeries[0].data = newSeries[0].data.slice(1);
                newSeries[1].data = newSeries[1].data.slice(1);
            }

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if ([...tabs].length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                        let { memoryUsed, memoryHeapTotal } = response.farewell;
                        newSeries[0].data.push({ x: moment().format('HH:mm:ss'), y: memoryUsed });
                        newSeries[1].data.push({ x: moment().format('HH:mm:ss'), y: memoryHeapTotal });
                    });
                }
            });

            setSeries(newSeries);
            ApexCharts.exec('memory-usage', 'updateSeries', newSeries);
        }, 1000);

        return () => clearInterval(updateSeries);
    }, [setSeries]);
    
    return (<Pane>
        {/* <Pane padding={8}>
            <SegmentedControl
                name="Type"
                height={24}
                options={chartType}
                value={selectedChartType}
                onChange={value => setSelectedChartType(value)}/>
        </Pane> */}
        <Pane>
            <ApexChart options={options} series={series} type={'line'} height="200" />
            {/* { selectedChartType === 'scatter' && <ApexChart options={options} series={series} type={selectedChartType} height="200" /> } */}
        </Pane>
    </Pane>);
}
