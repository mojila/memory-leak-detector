import React, { useEffect, useContext, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { Pane } from 'evergreen-ui';
import moment from 'moment';
import MemoryContext, { actions } from '../../context';
import { normal_distribution } from '../../helpers/outlier_detection';

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

    const onUpdateSeries = (usedHeap, totalHeap, url) => {
        let newSeries = store.series;

        if (newSeries[0].data.length > 10 && newSeries[1].data.length > 10) {
            newSeries[0].data = newSeries[0].data.slice(1);
            newSeries[1].data = newSeries[1].data.slice(1);
        }

        newSeries[0].data.push({...usedHeap, x: moment(usedHeap.x).format('HH:mm:ss') });
        newSeries[1].data.push({...totalHeap, x: moment(totalHeap.x).format('HH:mm:ss') });

        dispatch({ type: actions.SET_SERIES, value: newSeries });

        localStorage.setItem(`series-${url.hostname}-${url.port}`, JSON.stringify(newSeries));

        ApexCharts.exec('memory-usage', 'updateSeries', newSeries);

        onUpdateStats(newSeries[0].data.slice(-1)[0].y, newSeries[1].data.slice(-1)[0].y, url);
    }

    const onUpdateStats = (usedHeap, totalHeap, url) => {
        dispatch({ type: actions.SET_USED_HEAP, value: usedHeap });
        dispatch({ type: actions.SET_TOTAL_HEAP, value: totalHeap });

        onUpdateMinutes(totalHeap, url);
    }

    const onUpdateMinutes = (totalHeap, url) => {
        let temp = store.minutes;

        if (temp[0].data.length > 59) {
            temp[0].data = temp[0].data.slice(1);
        }

        temp[0].data.push({ timestamp: moment().toISOString(), value: totalHeap });

        dispatch({ type: actions.SET_MINUTES, value: temp });

        if (temp[0].data.length > 59) {
            findOutliers(temp[0].data, url);
        }
    }

    const findOutliers = (sequence, url) => {
        let outliers_found = normal_distribution(sequence);
        // let outliers_found = outlier_detection(JSON.stringify(sequence));
        // outliers_found = JSON.parse(outliers_found);
        let outliers = '';
        let outliers_array = [];
    
        if (outliers_found.length > 0) {
            outliers = localStorage.getItem(`outliers-${url.hostname}-${url.port}`);

            if (outliers) {
                outliers_array = JSON.parse(outliers);

                if (outliers_array.length > 0) { 
                    let outliers_only = outliers_array.map(d => d.outliers);
                    let outliers_filter = Array.from(outliers_only).map(e => {
                        let duplicated = Array.from(e).map(f => {
                            let equivalent = outliers_found.filter(x => x.timestamp === f.timestamp)[0];
                            return equivalent;
                        });

                        return duplicated;
                    });
                    
                    if (outliers_filter.length > 0) {
                        if (outliers_found.length > outliers_filter[outliers_filter.length - 1].length) {
                            outliers_array.push({
                                series: sequence,
                                outliers: outliers_found
                            });
                        }
                    }
                }
            } else {
                outliers_array = [{
                    series: sequence,
                    outliers: outliers_found
                }];
            }
    
            localStorage.setItem(`outliers-${url.hostname}-${url.port}`, JSON.stringify(outliers_array));
        }
    }

    useEffect(() => {
        const updateSeries = setInterval(() => {
            // let usedHeap = performance.memory.usedJSHeapSize;
            // let totalHeap = performance.memory.totalJSHeapSize;
            
            chrome.tabs.query({active: true}, function(tabs) {
                if (Array.from(tabs).length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                        let { memoryUsed, memoryHeapTotal } = response.farewell;
                        let usedHeap = { x: moment().toISOString(), y: memoryUsed };
                        let totalHeap = { x: moment().toISOString(), y: memoryHeapTotal };
                        let url = new URL(tabs[0].url);

                        onUpdateSeries(usedHeap, totalHeap, url);
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
