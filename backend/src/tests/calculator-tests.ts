import {describe} from 'mocha';
import chai from 'chai';
// let chai = require('chai');
import * as calculator from '../calculator';
// let calculator = require('../calculator');
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;

/*
calculator-tests.ts
*/

describe('Testing assert function: ', () =>{
    describe('Check addTest Function', ()=>{
        it('Check the returned value using : assert.equal(value, value): ', ()=> {
            const result = calculator.addTest(1,1);
            assert.equal(result, 2);
        });
    });
})

describe('Testing should function: ', ()=> {
    describe('Check addTest Function', ()=>{
        it('Check the returned value using : result.should.be.equal(value): ', ()=> {
            const result = calculator.addTest(1,1);
            result.should.be.equal(2);
        })
    })
})

describe('Testing expect function: ', ()=> {
    describe('Check addTest Function', ()=>{
        it('Check the returned value using : expect(result).to.be.a(value);: ', ()=> {
            const result = calculator.addTest(1,1);
            expect(result).to.equal(3);
        })
    })
})
