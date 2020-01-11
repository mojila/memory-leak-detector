const fs = require('fs');
const { normal_distribution } = require('../src/helpers/outlier_detection');

var raw_data = fs.readFileSync(`${__dirname}/tokopedia.csv`).toString().replace(/"/g, "").split('\n').slice(1);
raw_data = raw_data.map(d => ({
    timestamp: d.split(',')[0],
    value: Number(d.split(',')[1])
}));

var outliers = normal_distribution(raw_data);

console.log(outliers);