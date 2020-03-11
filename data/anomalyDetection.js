const fs = require('fs');
// const { normal_distribution } = require('../src/helpers/outlier_detection');

const sum = arr => arr.reduce((a,b) => a + b, 0)
const mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length

function normal_distribution(raw) {
    let sequence = Array.from(raw).map(d => d.value);
    let sequence_mean = mean(sequence);
    let squares = Array.from(sequence).map(d => Math.pow(d - sequence_mean, 2));
    let variance = sum(squares) / sequence.length;
    let standart_deviation = Math.sqrt(variance);
    let min = sequence_mean - 3 * standart_deviation;
    let max = sequence_mean + 3 * standart_deviation;

    let outliers = Array.from(raw).filter(x => x.value > max || x.value < min);

    return outliers;
}

var raw_data = fs.readFileSync(`${__dirname}/tokopedia.csv`).toString().replace(/"/g, "").split('\n').slice(1);
raw_data = raw_data.map(d => ({
    timestamp: d.split(',')[0],
    value: Number(d.split(',')[1])
}));

var outliers = normal_distribution(raw_data);

console.log(outliers);