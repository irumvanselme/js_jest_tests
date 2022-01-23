// const { Test } = require('supertest');
const request = require('supertest')
const {create,findAll,update} = require('../../app/controllers/tutorial.controller');
const app = require('../../app')


describe('testing create function',()=>{
    test('Testing if that function exists',()=>{
        expect(findAll).toBeDefined();
    })
})

describe('Post endpoints',()=>{
    it('Testing creating tutorial success', async()=>{
        const res = await request(app)
        .post('/api/tutorials/')
        .send({
            title: 'Test tutorial',
            description: 'Test tutorial description',
            published: true
        })
        expect(res.statusCode).toEqual(201)  
    })
})