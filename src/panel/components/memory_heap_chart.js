import React, { useEffect, useContext, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { Pane } from 'evergreen-ui';
import moment from 'moment';
import MemoryContext, { actions } from '../../context';
import WebWorker from '../../helpers/worker_setup'
import anomalyDetection from '../../workers/anomaly_detection'

export default function MemoryHeapChart() {
    const { store, dispatch } = useContext(MemoryContext);
    const find_outlier_worker = new WebWorker(anomalyDetection)
    const [url, setUrl] = useState(new URL('http://localhost'))

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

        localStorage.setItem(`series-${url.hostname}-${url.port}`, JSON.stringify(newSeries));

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

        dispatch({ type: actions.SET_MINUTES, value: temp });

        if (temp[0].data.length > 59) {
            findOutliers(temp[0].data);
        }
    }

    const saveOutliers = (outliers_found, sequence) => {
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

    const findOutliers = (sequence) => {
        find_outlier_worker.postMessage(sequence)
    }

    const handleWorker = (e) => {
        saveOutliers(e.data.outliers_found, e.data.sequence)
    }

    useEffect(() => {
        const updateSeries = setInterval(() => {
            // let usedHeap = performance.memory.usedJSHeapSize;
            // let totalHeap = performance.memory.totalJSHeapSize;
            
            chrome.tabs.query({active: true}, function(tabs) {
                if (Array.from(tabs).length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {content: "get_info"}, function(response) {
                        if (response.memoryInfo) {
                            let { memoryUsed, memoryHeapTotal } = response.memoryInfo;
                            let usedHeap = { x: moment().toISOString(), y: memoryUsed };
                            let totalHeap = { x: moment().toISOString(), y: memoryHeapTotal };
                            setUrl(new URL(tabs[0].url))

                            onUpdateSeries(usedHeap, totalHeap);
                        }
                    });
                }
            });
        }, 1000);

        find_outlier_worker.addEventListener('message', handleWorker)

        return () => {
            clearInterval(updateSeries)
            find_outlier_worker.removeEventListener('message', handleWorker, true)
        };
    }, [dispatch, find_outlier_worker]);
    
    return (<Pane>
        <Pane>
            <ApexChart options={options} series={store.series} type={'line'} height="200" />
        </Pane>
    </Pane>);
}
