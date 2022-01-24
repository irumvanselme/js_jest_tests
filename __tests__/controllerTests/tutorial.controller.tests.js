// const { Test } = require('supertest');
const request = require('supertest')
const {create,findAll,update} = require('../../app/controllers/tutorial.controller');
const app = require('../../app')
const Tutorial = require('../../app/models/tutorial.model');


describe('testing findAll function',()=>{
    test('Testing if that function exists',()=>{
        expect(findAll).toBeDefined();
    })
})

describe('Post endpoints',()=>{
    it('should create tutorial successfully', async()=>{
        const res = await request(app)
        .post('/api/tutorials/')
        .send({
            title: 'Test tutorial',
            description: 'Test tutorial description',
            published: true
        })
        expect(res.statusCode).toEqual(201)  
    })
    it('should not create tutorial if title is missing', async()=>{
        const res = await request(app)
        .post('/api/tutorials/')
        .send({
            title: '',
            description: 'Test tutorial description',
            published: true
        })
        expect(res.statusCode).toEqual(400) 
        expect(res.body.message).toEqual("Title can not be empty!")
    })
})

describe('Delete endpoints', ()=>{
    it('should delete one tutorial successfully', async()=>{
        const res = await request(app)
        .post('/api/tutorials/')
        .send({
            title: 'Test tutorial',
            description: 'Test tutorial description',
            published: true
        })
        const id = res.body.id;
        const response = await request(app)
                .delete('/api/tutorials/' + id)
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual("Tutorial was deleted successfully!")
    
    })

    it('should delete all tutorials successfully', async()=>{
        const response = await request(app)
        .delete('/api/tutorials/')
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual("Tutorials were deleted successfully!")
    })
})



