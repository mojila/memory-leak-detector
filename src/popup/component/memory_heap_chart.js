import React, { useState, useEffect, useContext } from 'react';
import ApexChart from 'react-apexcharts';
import { Pane, SegmentedControl } from 'evergreen-ui';
import moment from 'moment';
import MemoryContext, { actions } from '../../context';

export default function MemoryHeapChart() {
    const { store, dispatch } = useContext(MemoryContext);

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

    useEffect(() => {
        const updateSeries = setInterval(() => {
            let newSeries = store.series;
            // let minuteLog = store.minuteLog;

            if (newSeries[0].data.length > 10 && newSeries[1].data.length > 10) {
                newSeries[0].data = newSeries[0].data.slice(1);
                newSeries[1].data = newSeries[1].data.slice(1);
            }

            // if (minuteLog.length > 60) {
            //     minuteLog = minuteLog.slice(1);
            // }

            let usedHeap = performance.memory.usedJSHeapSize;
            let totalHeap = performance.memory.totalJSHeapSize;

            newSeries[0].data.push({ x: moment().format('HH:mm:ss'), y: usedHeap });
            newSeries[1].data.push({ x: moment().format('HH:mm:ss'), y: totalHeap });

            // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            //     if (Array.from(tabs).length > 0) {
            //         chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            //             let { memoryUsed, memoryHeapTotal } = response.farewell;
            //             let usedHeap = { x: moment().toISOString(), y: memoryUsed };
            //             let totalHeap = { x: moment().toISOString(), y: memoryHeapTotal };
                        
            //             newSeries[0].data.push({...usedHeap, x: moment(usedHeap.x).format('HH:mm:ss') });
            //             newSeries[1].data.push({...totalHeap, x: moment(totalHeap.x).format('HH:mm:ss') });
            //             // minuteLog.push(totalHeap);
            //         });
            //     }
            // });

            // console.log(minuteLog);
            
            dispatch({ type: actions.SET_USED_HEAP, value: newSeries[0].data.slice(-1)[0].y });
            dispatch({ type: actions.SET_TOTAL_HEAP, value: newSeries[1].data.slice(-1)[0].y });
            dispatch({ type: actions.SET_SERIES, value: newSeries });
            // dispatch({ type: actions.SET_MINUTE_LOG, value: minuteLog });
            ApexCharts.exec('memory-usage', 'updateSeries', newSeries);
        }, 1000);

        return () => clearInterval(updateSeries);
    }, [dispatch]);
    
    return (<Pane>
        <Pane>
            <ApexChart options={options} series={store.series} type={'line'} height="200" />
        </Pane>
    </Pane>);
}
