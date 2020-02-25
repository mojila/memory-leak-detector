import { pow, mean, sum, sqrt } from 'mathjs';
// const { pow, mean, sum, sqrt } = require('mathjs');

function normal_distribution(raw) {
    let sequence = Array.from(raw).map(d => d.value);
    let sequence_mean = mean(sequence);
    let squares = Array.from(sequence).map(d => pow(d - sequence_mean, 2));
    let variance = sum(squares) / sequence.length;
    let standart_deviation = sqrt(variance);
    let min = sequence_mean - 3 * standart_deviation;
    let max = sequence_mean + 3 * standart_deviation;

    let outliers = Array.from(raw).filter(x => x.value > max || x.value < min);

    return outliers;
}

export { normal_distribution };
// module.exports = {
//     normal_distribution
// }