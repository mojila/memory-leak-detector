import React, { useEffect, useContext, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { Pane } from 'evergreen-ui';
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

    const onUpdateSeries = (usedHeap, totalHeap) => {
        let newSeries = store.series;

        if (newSeries[0].data.length > 10 && newSeries[1].data.length > 10) {
            newSeries[0].data = newSeries[0].data.slice(1);
            newSeries[1].data = newSeries[1].data.slice(1);
        }

        newSeries[0].data.push({...usedHeap, x: moment(usedHeap.x).format('HH:mm:ss') });
        newSeries[1].data.push({...totalHeap, x: moment(totalHeap.x).format('HH:mm:ss') });

        dispatch({ type: actions.SET_SERIES, value: newSeries });

        ApexCharts.exec('memory-usage', 'updateSeries', newSeries);
        onUpdateStats(newSeries[0].data.slice(-1)[0].y, newSeries[1].data.slice(-1)[0].y);
    }

    const onUpdateStats = (usedHeap, totalHeap) => {
        dispatch({ type: actions.SET_USED_HEAP, value: usedHeap });
        dispatch({ type: actions.SET_TOTAL_HEAP, value: totalHeap });

        onUpdateMinutes(totalHeap);
    }

    const onUpdateMinutes = (totalHeap) => {
        let temp = store.minutes;

        if (temp[0].data.length > 59) {
            temp[0].data = temp[0].data.slice(1);
        }

        temp[0].data.push({ timestamp: moment().toISOString(), value: totalHeap });

        console.log(temp[0].data);

        dispatch({ type: actions.SET_MINUTES, value: temp });
    }

    useEffect(() => {
        const updateSeries = setInterval(() => {
            // let usedHeap = performance.memory.usedJSHeapSize;
            // let totalHeap = performance.memory.totalJSHeapSize;
            
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (Array.from(tabs).length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                        let { memoryUsed, memoryHeapTotal } = response.farewell;
                        let usedHeap = { x: moment().toISOString(), y: memoryUsed };
                        let totalHeap = { x: moment().toISOString(), y: memoryHeapTotal };

                        onUpdateSeries(usedHeap, totalHeap);
                    });
                }
            });
        }, 1000);

        return () => clearInterval(updateSeries);
    }, [dispatch]);
    
    return (<Pane>
        <Pane>
            <ApexChart options={options} series={store.series} type={'line'} height="200" />
        </Pane>
    </Pane>);
}
