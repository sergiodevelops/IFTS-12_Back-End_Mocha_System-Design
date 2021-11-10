import {describe} from 'mocha';
import chai from 'chai';
// let chai = require('chai');
import * as calculator from '../calculator';
// let calculator = require('../calculator');
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;


describe('Testing assert function: ', function() {
    describe('Check addTest Function', function(){
        it('Check the returned value using : assert.equal(value, value): ', function() {
            const result = calculator.addTest(1,1);
            assert.equal(result, 2);
        });
    });
})

describe('Testing should function: ', function() {
    describe('Check addTest Function', function(){
        it('Check the returned value using : result.should.be.equal(value): ', function() {
            const result = calculator.addTest(1,1);
            result.should.be.equal(2);
        })
    })
})

describe('Testing expect function: ', function() {
    describe('Check addTest Function', function(){
        it('Check the returned value using : expect(result).to.be.a(value);: ', function() {
            const result = calculator.addTest(1,1);
            expect(result).to.equal(3);
        })
    })
})
