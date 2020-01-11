import React, { useEffect, useContext } from 'react';
import ApexChart from 'react-apexcharts';
import { Pane } from 'evergreen-ui';
import moment from 'moment';
import MemoryContext, { actions } from '../../context';
// Rust WebAssembly
// import { sub } from '../../calculation/src/lib.rs';
// Helper
// import NormalDistribution from '../../helpers/outlier_detection_normal_distribution';

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

    const onUpdateSeries = (newSeries) => {
        dispatch({ type: actions.SET_SERIES, value: newSeries });

        ApexCharts.exec('memory-usage', 'updateSeries', newSeries);
        onUpdateStats(newSeries[0].data.slice(-1)[0].y, newSeries[1].data.slice(-1)[0].y);
    }

    const onUpdateStats = (usedHeap, totalHeap) => {
        dispatch({ type: actions.SET_USED_HEAP, value: usedHeap });
        dispatch({ type: actions.SET_TOTAL_HEAP, value: totalHeap });
    }

    const onUpdateTabId = (tabId) => {
        dispatch({ type: actions.SET_TAB_ID, value: tabId });
    }

    useEffect(() => {
        const updateSeries = setInterval(() => {
            // let usedHeap = performance.memory.usedJSHeapSize;
            // let totalHeap = performance.memory.totalJSHeapSize;
            
            
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (Array.from(tabs).length > 0) {
                    let url = new URL(tabs[0].url);
                    let outliers = [];

                    dispatch({ type: actions.SET_URL, value: url });

                    let series = localStorage.getItem(`series-${url.hostname}-${url.port}`);
                    let local_outliers = localStorage.getItem(`outliers-${url.hostname}-${url.port}`);

                    if (local_outliers) {
                        outliers = JSON.parse(local_outliers);
                    }

                    dispatch({ type: actions.SET_OUTLIERS, value: outliers });
                    
                    if (series) {
                        onUpdateSeries(JSON.parse(series));
                    }
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