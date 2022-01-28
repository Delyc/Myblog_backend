import chai, {
    expect
} from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
chai.should();

describe("Test one : Blogs", () => {
    it("get all blogs", (done) => {
        chai
            .request(app)
            .get("/api/articles")
            .end((err, res) => {
                res.should.have.status(200);
                res.should;
                done();
            });
    });

    it("get one blog", (done) => {
        chai
            .request(app)
            .get("/api/articles/61f01da5bc46a47d61a1455f")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("Create a post", (done) => {
        chai
            .request(app)
            .post("/api/articles")
            .set({
                Accept: "application/json"
            })
            .send({
                title: "Hello world hello world hello world hellow world hello world ",
                hook: "Hello world hello world hello world hellow world hello world Hello world hello world hello world hellow world hello world",
                content: "Hello world hello world hello world hellow world hello world Hello world hello world hello world hellow world hello world Hello world hello world hello world hellow world hello world",
                banner: "Hello world hello world hello world hellow ",
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("data");
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    });

    it("updating blog post", (done) => {
        chai
            .request(app)
            .put("/api/articles/61f01da5bc46a47d61a1455f")
            .set({
                Accept: "application/json"
            })
            .send({
                title: "Hello world hello world hello world hellow worlddd hello world ",
                hook: "Hello world hello world hello world hellow world hello world Hello world hello world hello world hellow world hello world",
                content: "Hello world hello world hellohh world hellow world hello world Hello world hello world hello world hellow world hello world Hello world hello world hello world hellow world hello world",
                banner: "Hello world hello world hello worldddd hellow ",
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    });
    it('Comment on an article.', (done) => {

        chai.request(app).post('/api/articles/61f01da5bc46a47d61a1455f/comments')
            .set({
                Accept: 'application/json'
            })
            .send({

                "message": "cool"
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('data');
                expect(body).to.contain.property('success');
                done();
            })
            .catch((err) => done(err))
    })
    it("Dleteing blog", (done) => {
        chai
            .request(app)
            .delete("/api/articles/61f01da5bc46a47d61a1455f")
            .set({
                Accept: "application/json"                
            })
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.contain.property("data");
                expect(body.data).to.contain.property("message");
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    });
});

describe("Test two: Users", () => {
    it("get all users", (done) => {
        chai
            .request(app)
            .get("/api/users")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("get one user", (done) => {
        chai
            .request(app)
            .get("/api/users/61e3e9273fbefd9e3b52fd84")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("Create a user", (done) => {
        chai
            .request(app)
            .post("/api/users")
            .set({
                Accept: "application/json"
            })
            .send({
                firstName: "Delyce",
                secondName: "Twizeyimana",
                email: "delyce@gmail.com",
                password: "2356778999r44",
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("data");
                expect(body.data).to.contain.property("message");
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    });

    it("User logging in", (done) => {
        chai
            .request(app)
            .post("/api/users/login")
            .send({
                "email": "delyccedd@gmail.com",
                "password": "1234556789"

            })
            .then((res) => {
                const body = res.body;
                expect(body).to.have.property("token");
                expect(body).to.contain.property("success");
                expect(body).to.contain.property("data");

                done();
            })
            .catch((err) => done(err));
    });
    it("Liking test", (done) => {
        chai
            .request(app)
            .get("/api/users/61ed7d6a130620cc47e63699/likes")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

});




describe("Test three: Queries", () => {
    it("get all queries", (done) => {
        chai
            .request(app)
            .get("/api/queries")
            .end((err, res) => {
                res.should.have.status(200);
                res.should;
                done();
            });
    });


    it("get one query", (done) => {
        chai
            .request(app)
            .get("/api/queries/61f3708a0758494c8d725db9")
            .end((err, res) => {
                res.should.have.status(200);
                res.should;
                done();
            });
    });


    it("Create a query", (done) => {
        chai
            .request(app)
            .post("/api/users")
            .set({
                Accept: "application/json"
            })
            .send({
                fullname: "Delyce",
                email: "delyce@gmail.com",
                message: "Hey Delye, would you would you would you would you would you",
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("data");
                expect(body.data).to.contain.property("message");
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    });




})


describe("Test Four: Hire me", () => {
    it("Create a hire me message", (done) => {
        chai
            .request(app)
            .post("/api/hireme")
            .set({
                Accept: "application/json"
            })
            .send({
                name: "Delyce",
                email: "delyce@gmail.com",
                job: "Hey Delye, would you would you would you would you would you",
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("data");
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    });




})