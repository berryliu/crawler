/**
 * Created by berry on 16/5/18.
 * Test all
 */
'use strict';

const path = require('path');
const Promise = require('bluebird');

const _chai = require('chai');
const _chaiAsPromised = require('chai-as-promised');

const _request = require('../src/request.es6');
//const _parser = require('../src/parser.es6');

_chai.use(_chaiAsPromised);
const expect = _chai.expect;

describe('[Testing request]', () => {
    describe('1. Test params: ', () => {
        it('- no url', () => {
            let res = _request();
            return expect(res).to.eventually.be.rejected;
        });
        it('- params is not object', () => {
            let url = 'http://';
            let params = 1;
            let res = _request(url, params);
            return expect(res).to.eventually.be.rejected;
        });
        it('- basic', () => {
            let url = 'http://www.v2ex.com/recent';
            let res = _request(url);
            return expect(res).to.eventually.be.resolved;
        });
    });
});
