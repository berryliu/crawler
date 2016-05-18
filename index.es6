/**
 * Created by berry on 16/5/13.
 * A Web Crawler
 */

'use strict';

const _co = require('co');
const _request = require('./src/request.es6');
const _parser = require('./src/parser.es6');
const _filter = require('./src/filter.es6');

let tops = {};
let baseUrl = 'http://www.v2ex.com/recent';

_co(function* () {
    let pageData = yield _request(baseUrl);
    let parsedData = _parser(pageData);
    let filteredData = _filter(parsedData);

    console.log(filteredData);
});

function merge(tops, data) {
    console.log(data);
    for (let key in data) {
        let val = data[key];
        if (!tops[key]) {
            tops[key] = val;
        } else {
            tops[key].count += val.count;
        }
    }
}

