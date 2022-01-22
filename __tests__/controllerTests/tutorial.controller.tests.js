const { Test } = require('supertest');
const {findAll,update} = require('../../app/controllers/tutorial.controller');


describe('testing create function',()=>{
    test('Testing if that function exists',()=>{
        expect(findAll).toBeDefined();
    })
})