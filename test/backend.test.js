import chai, { expect } from 'chai'
import app from '../app.js'
chai.should();

describe('1)  Dashboard test', () => {

    //testing get all blogs
    it('it should GET  posts', (done) => {
      chai.request(app)
      .get('/api/articles')
      .end((err, res) => {
            res.should.have.status(200);
        done();
      });
    }) 

    //testing get one blog

    it('it should GET one post by id', (done) => {
        chai.request(app)
        .get('/api/articles/61ed7d6a130620cc47e63699')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
      }) 


    //testing creating article


    it('Created new article', (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRAZ21haWwuY29tIiwiaWQiOiI2MWUyODU5ZWVjOWFkZGE2ZGExOGNhNzQiLCJpYXQiOjE2NDMxMTY1MTgsImV4cCI6MTY0MzEyMDExOH0.j8qWDdt2seLAPOs0tgtVdUpUPqBx1eXSZSP4S6i-JSo"
        chai.request(app).post('/api/articles')
          .set({ 'token': token, Accept: 'application/json' })
          .send({
       
            title: "hellohhhhhhhhhhhhhhhhhhhhhhhhhhh",
            hook: "hi hi hi hi hihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
            content: "hhhwhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
            banner: "hhhhhhhhhhhhhhhhhh",
            images: "hhhhhhhhhh",
           
          })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('data');
            expect(body).to.contain.property('message');
            done();
          })
          .catch((err) => done(err))
      })
  
    //testing update article

    it('post update', (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRAZ21haWwuY29tIiwiaWQiOiI2MWUyODU5ZWVjOWFkZGE2ZGExOGNhNzQiLCJpYXQiOjE2NDMxMTY1MTgsImV4cCI6MTY0MzEyMDExOH0.j8qWDdt2seLAPOs0tgtVdUpUPqBx1eXSZSP4S6i-JSo"
        
          .set({ 'token': token, Accept: 'application/json' })
          .send({
            id: "61ed7d6a130620cc47e63699",
            title: "hellohhhhhh world",
            hook: "hi hi hi hi hihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
            content: "hhhwhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
            banner: "hhhhhhhhhhhhhhhhhh",
            images: "hhhhhhhhhh",
           
          })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('success');
            done();
          })
          .catch((err) => done(err))
      })

  //hire me 

      it('hire me', (done) => {
        chai.request(app).post('/api/hireme')
          .set({ 'token': token, Accept: 'application/json' })
          .send({
       
            name: "hellohhhhhhhhhhhhhhhhhhhhhhhhhhh",
            email: "hi@gmail.com",
            job: "hhhwhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
          
           
          })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('data');
            expect(body).to.contain.property('message');
            done();
          })
          .catch((err) => done(err))
      })


//send query
      
      it('send a query', (done) => {
        chai.request(app).post('/api/queries')
          .set({ 'token': token, Accept: 'application/json' })
          .send({
       
            fullname: "hellohhhhhhhhhhhhhhhhhhhhhhhhhhh",
            email: "hi@gmail.com",
            message: "hhhwhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
          
           
          })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('success');
            expect(body.success). 
            expect(body).to.contain.property('message');
            done();
          })
          .catch((err) => done(err))
      })

      //get all queries

      it('it should GET  all queries', (done) => {
        chai.request(app)
        .get('/api/queries')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
      }) 

      //get a specific query by id

      it('it should GET one query by id', (done) => {
        chai.request(app)
        .get('/api/queries/61eaf368e62f06ffeaf45695')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
      }) 

      //delete query

      
    //testing view all comments

    it('it should GET all comments', (done) => {
        chai.request(app)
        .get('/api/articles/61ed7d6a130620cc47e63699/comments')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
      })

      //testing get likes

    it('it should GET all likes', (done) => {
    chai.request(app)
    .get('/api/articles/61ed7d6a130620cc47e63699/likes')
    .end((err, res) => {
            res.should.have.status(200);
        done();
    });
    })










  
  })


    //testing delete article

    //testing search article

    //testing add comment

    //testing delete comment

    //testing like article

    
    



describe('2) Testing  users', () => {
    it('get all users', (done) => {
        chai.request(app)
        .get('api/users')
        .end((err, res) => {
                res.should.have.status(200);
            done();
        });
        })








    