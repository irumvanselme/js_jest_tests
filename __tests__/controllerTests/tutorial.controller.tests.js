// const { Test } = require('supertest');
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
describe('Testing findAll controller',()=>{
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

describe('Testing update controller',()=>{
    let firstTurtorial = {
        _id:'4665ytuugi86886000',
        title:'react native',
        description:'mobile development',
        published: true
    };

    let updatedTurtorial = {
        _id:'4665ytuugi86886000',
        title:'react native',
        description:'mobile development',
        published: false
    }

    // test('should pass if update exists',()=>{
    //     expect(update).not.to.undefined();
    // })

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