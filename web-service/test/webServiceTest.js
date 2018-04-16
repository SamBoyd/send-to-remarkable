import { describe, it } from 'mocha';
import { expect, should } from 'chai';
const { sleep } = require('sleep');

const fs = require('fs');
const path = require('path');

// import nock from 'nock';

const request   = require('superagent');
const process = require('child_process');

describe('handleAcknowledge', () => {

    it('should start a http server', done => {
        var server = process.exec('node ./src/index.js',
            (error, stdout, stderr) => {
            // console.log('stdout: ', stdout);
            // console.log('stderr: ', stderr);
            // if (error !== null) {
            //     console.log('exec error: ', error);
            // }
        });

        sleep(3);
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
                    throw new Error(err);
                    done()
                }

                done();
                server.kill('SIGTERM')
            })

    }).timeout(7000);

    it('response should have correct headers', done => {
        var server = process.exec('node ./src/index.js',
            (error, stdout, stderr) => {
                // console.log('stdout: ', stdout);
                // console.log('stderr: ', stderr);
                // if (error !== null) {
                //     console.log('exec error: ', error);
                // }
            });

        sleep(3);
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
                expect(res.header['content-type']).to.equal('application/pdf');
                expect(res.header['access-control-allow-origin']).to.equal('*');
                done();
                server.kill('SIGTERM')
            })

    }).timeout(7000)

    it('response should have correct headers', done => {
        var server = process.exec('node ./src/index.js',
            (error, stdout, stderr) => {
                // console.log('stdout: ', stdout);
                // console.log('stderr: ', stderr);
                // if (error !== null) {
                //     console.log('exec error: ', error);
                // }
            });

        sleep(3);
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
                expect(res.header['content-type']).to.equal('application/pdf');
                expect(res.header['access-control-allow-origin']).to.equal('*');
                done();
                server.kill('SIGTERM')
            })

    }).timeout(7000)

    it('should respond with the correct file', done => {
        var server = process.exec('node ./src/index.js',
            (error, stdout, stderr) => {
                // console.log('stdout: ', stdout);
                // console.log('stderr: ', stderr);
                // if (error !== null) {
                //     console.log('exec error: ', error);
                // }
            });

        const filePath = path.join(__dirname, './resource/index.html');

        fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
            sleep(3);
            if (err) {
                console.log('exec error: ', err)
            }

            request
                .post('http://localhost:1337')
                .send(data)
                .timeout({
                    response: 8000,  // Wait 5 seconds for the server to start sending,
                    deadline: 60000, // but allow 1 minute for the file to finish loading.
                })
                .set('Content-Type', 'application/pdf')
                .set('Access-Control-Allow-Origin', '*')
                .buffer(true)
                .parse(request.parse.image)
                .then(res => res.body)
                .then(res => {
                    expect(res.toString('utf-8').split('\n')[0]).to.equal('%PDF-1.4');
                    done();
                    server.kill('SIGTERM')
                })
        })

    }).timeout(7000)
})