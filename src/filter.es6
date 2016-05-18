/**
 * Created by berry on 16/5/13.
 * Web Content filter
 */
'use strict';

const _ = require('lodash');

/**
 * @desc filter data
 * @param content
 */
function filter(data) {
    if (!_.isArray(data) || data.length === 0) {
        throw new Error('[Error] No data need to be filtered.');
    }
    return data;
}

/**
 * @desc merge data
 * @param tops
 * @param data
 */
function merge(tops, data) {
    if (!tops[data.rawTitleLink]) {
        tops[data.rawTitleLink] = {
            count: 0,
            title: data.title
        }
    } else {
        tops[data.rawTitleLink].count++;
    }
}

module.exports = filter;
