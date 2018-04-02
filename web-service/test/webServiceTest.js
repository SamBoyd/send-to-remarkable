import { describe, it } from 'mocha';
import { expect, should } from 'chai';
var { sleep } = require('sleep');

var fs = require('fs')

// import nock from 'nock';

const request   = require('superagent');
const process = require('child_process');

describe('handleAcknowledge', () => {

    it('should start a http server', done => {
        var server = process.exec('/Users/sam/.nvm/versions/node/v8.9.4/bin/node ./src/index.js',
            (error, stdout, stderr) => {
            // console.log('stdout: ', stdout);
            // console.log('stderr: ', stderr);
            // if (error !== null) {
            //     console.log('exec error: ', error);
            // }
        })

        sleep(3)
        request
            .post('http://localhost:1337')
            .send("")
            .timeout({
                response: 5000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
            .set('Content-Type', 'application/pdf')
            .set('Access-Control-Allow-Origin', '*')
            .end((err, res) => {
                if (err) {
                    throw new Error(err)
                    done()
                }

                done()
                server.kill('SIGTERM')
            })

    }).timeout(7000)
})