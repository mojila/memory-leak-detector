import React, { useState, useEffect } from 'react';
import { Pane } from 'evergreen-ui';
import { Line } from '@nivo/line';
import range from 'lodash/range';
import last from 'lodash/last';
import * as time from 'd3-time';

const commonProperties = {
    width: 500,
    height: 200,
    animate: true,
    enableSlices: 'x',
  };

const MemoryGraph = () => {
    const date = new Date();

    const [dataA, setDataA] = useState(range(10).map(i => ({
        x: time.timeSecond.offset(date, i),
        y: 10 + Math.round(Math.random() * 50)
    })));
    
    useEffect(() => {
        let timer = setInterval(next, 1000);

        return () => clearInterval(timer);
    }, [dataA]);

    const next = () => {
        let data = dataA.slice(1);
        data.push({
          x: time.timeSecond.offset(last(dataA).x, 1),
          y: 10 + Math.round(Math.random() * 55)
        });

        setDataA(data);
    };

    return (
        <Pane padding={14} elevation={1}>
            <Line
                {...commonProperties}
                margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
                data={[{ id: 'Memory Used', data: dataA }]}
                xScale={{ type: 'time', format: 'native' }}
                yScale={{ type: 'linear', max: 100 }}
                axisBottom={{
                    format: '%H:%M:%S',
                    legend: `Memory Used Graph`,
                    legendPosition: 'middle',
                    legendOffset: 46,
                }}
                enablePoints={false}
                enableGridX={true}
                curve="linear"
                animate={false}
                motionStiffness={120}
                motionDamping={1000}
                isInteractive={false}
                enableSlices={false}
                useMesh={true}
                theme={{
                    axis: { ticks: { text: { fontSize: 10 } } },
                    grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
                }}
            />
        </Pane>
    );
}

export default MemoryGraph;