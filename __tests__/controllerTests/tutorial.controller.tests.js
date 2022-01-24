const { Test } = require('supertest');
const {findAll, update,findOne} = require('../../app/controllers/tutorial.controller');


describe('testing findAll function',()=>{
    test('Testing if that function exists',()=>{
        expect(findAll).toBeDefined();
    });
    // test('should return all turtorials',async()=>{
       
    // })
})