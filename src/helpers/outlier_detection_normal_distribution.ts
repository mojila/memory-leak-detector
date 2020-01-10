import { mean, pow, sum, sqrt, BigNumber } from 'mathjs';

interface Series {
    timestamp: string,
    value: number
}

interface Results {
    timestamp: string,
    value: number,
    isOutlier: boolean
}

function NormalDistribution(series: Array<Series>): Array<Results> {
    let value_series: Array<number> = series.map(d => d.value);
    let series_mean: number = mean(value_series);

    var squares = Array(value_series.length);

    var variance = 0;
    var standart_deviation = 0;
    var min = 0;
    var max = 0;
    var results: Array<Results> = Array(series.length);

    value_series.map((d,i) => {
        let square = pow((d - series_mean), 2);
        squares[i] = square;
    });

    variance = sum(squares) / value_series.length;

    standart_deviation = sqrt(variance);

    max = series_mean + 4.5 * standart_deviation;
    min = series_mean - 4.5 * standart_deviation;

    series.map((d, i) => {
        if (d.value > max || d.value < min) {
            results[i] = {
                value: d.value,
                timestamp: d.timestamp,
                isOutlier: true
            };
        } else {
            results[i] = {
                value: d.value,
                timestamp: d.timestamp,
                isOutlier: false
            };
        }
    })

    return results;
}

export default NormalDistribution;