const fs = require('fs');
const { mean, pow, sum, sqrt } = require('mathjs');

var raw_data = fs.readFileSync(`${__dirname}/minuteLogHeap2.csv`).toString().replace(/"/g, "").split('\n').slice(1);
raw_data = raw_data.map(d => ({
    timestamp: d.split(',')[0],
    value: Number(d.split(',')[1])
}));

var series = raw_data.map(d => d.value);

var meanOfSeries = mean(series);

var squares = Array(series.length);

var variance = 0;
var standart_deviation = 0;
var min = 0;
var max = 0;

for (let i = 0; i < series.length; i++) {
    let square = pow((series[i] - meanOfSeries), 2);

    squares[i] = square;
}

variance = sum(squares) / series.length;

standart_deviation = sqrt(variance);

max = meanOfSeries + 4.5 * standart_deviation;
min = meanOfSeries - 4.5 * standart_deviation;

series.forEach(d => {
    if (d > max || d < min) {
        console.log(`Outlier Found!: ${d}`);
    }
});