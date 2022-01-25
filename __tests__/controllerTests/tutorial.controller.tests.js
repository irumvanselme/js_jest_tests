
const request = require('supertest');
const chai  = require('chai');
const http = require('chai-http');
const {create,findAll,update} = require('../../app/controllers/tutorial.controller');
const mongoose = require('mongoose')
const db = require("../../app/models");
const Tutorial = db.tutorials;
const {Request} = require('jest-express/lib/request');
const {Response} = require('jest-express/lib/response');
const {expect} = chai;
const app = require('../../app');

chai.use(http);
describe('Get endpoint',()=>{
   let data = [
       {
           _id:'4882200e85yytii999',
           title:'react native',
           description:'first course',
           published:true
       },
       {
        _id:'4882200e85ytteeetii999',
        title:'ionic',
        description:'mobile development',
        published:true
    }
   ];
   let emptyArr = [];
    test('should return 200 on sucess',async()=>{
    jest.spyOn(Tutorial,'find').mockReturnValue(Promise.resolve(data));
     const res = await chai.request(app).get('/api/tutorials');
     expect(res.status).to.equal(200);
     await mongoose.disconnect()
    })

    test('should return title at index 0 of the body returned',async()=>{
        jest.spyOn(Tutorial,'find').mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get('/api/tutorials');
        expect(res.body[0].title).to.equal('react native');
    })
    test('should return 404 if there is no empty data',async()=>{
     jest.spyOn(Tutorial,'find').mockReturnValue(Promise.resolve(emptyArr));
     const res = await chai.request(app).get('/api/tutorials');
     expect(res.status).to.equal(404);
    })
})

describe('Put endpoint',()=>{
    let updatedTurtorial = {
        _id:'4665ytuugi86886000',
        title:'react native',
        description:'mobile development',
        published: false
    }

   test('should return 201 if the turtorial is updated',async()=>{
      jest.spyOn(Tutorial,'findByIdAndUpdate').mockReturnValue(Promise.resolve(updatedTurtorial));
      const res = await chai.request(app).put('/api/tutorials/:4665ytuugi86886000');
      expect(res.body.message).to.equal('Tutorial was updated successfully.')
   })
   test('should return 404 if no data was given',async()=>{
       jest.spyOn(Tutorial,'findByIdAndUpdate').mockReturnValue(Promise.resolve(null))
       const res = await chai.request(app).put('/api/tutorials/:4665ytuugi86886000');
       expect(res.body.message).to.equal('Not Found');
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

describe('GET endpoints',()=>{
    it('should return tutorial by id successfully', async()=>{
        const res = await request(app)
        .post('/api/tutorials/')
        .send({
            title: 'Test tutorial',
            description: 'Test tutorial description',
            published: true
        })
        const id = res.body.id;
        const response = await request(app)
                .get('/api/tutorials/' + id)
        expect(response.statusCode).toEqual(200)
        expect(response.body.title).toEqual('Test tutorial')
    })
})




