/**
 * Created by berry on 16/5/13.
 * Request Pool
 */

'use strict';

const http = require('http')
const querystring = require('querystring');
const Promise = require('bluebird');

const _ = require('lodash');

/**
 * @desc request page
 * @param url
 * @param params
 * @returns {bluebird|exports|module.exports}
 */
function request(url, params) {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject(new Error('[Error] No url has passed'));
            return;
        }
        if (!_.isUndefined(params) && !_.isObject(params)) {
            reject(new Error('[Error] Params is not plain object.'));
            return;
        }
        if (params) {
            let qs = querystring.stringify(params);
            url += `?${qs}`;
        }

        let req = http.get(url, res => {
            res.setEncoding('utf8');
            if (res.statusCode !== 200) {
                reject(new Error(`[Error] Connent failure by status code ${res.statusCode}.`));
                return;
            }
            let chunks = [];
            res.on('data', chunk => {
                chunks.push(chunk);
            })
            res.on('end', () => {
                resolve(chunks.join(''));
            });
        });

        req.on('error', e => {
            reject(new Error(`[Error] Request has error by '${e.message}'`));
        });

        req.setTimeout(5 * 1000, () => {
            reject(new Error('[Error] Request has timeout'));
        });

    });
}

module.exports = request;
