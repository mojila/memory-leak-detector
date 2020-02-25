const fs = require('fs');
const { js_beautify } = require('js-prettify');

let script = fs.readFileSync(`${__dirname}/datalayer-client-web.latest.js`, 'utf8');

let result = js_beautify(script, { indent_size: 2 });

fs.writeFileSync(`${__dirname}/result.js`, result);