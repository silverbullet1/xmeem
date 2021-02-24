const supertest = require("supertest");
const app = require("../app");
const chai = require("chai");
const mongoose = require("mongoose");
chai.should();

const api = supertest(app);
let memeId;
describe("Test /memes", () => {
  let invalidMeme = {
    name: "Test Anonymous",
    url: "abc.com",
    caption: Math.random().toString(36).substring(7),
  };
  let incompleteMeme = {
    name: "Test Anonymous",
    caption: Math.random().toString(36).substring(7),
  };

  describe("Test /POST", () => {
    let meme = {
      name: "Test Anonymous",
      url:
        "https://static.mommypoppins.com/styles/image620x420/s3/school_meme_6_0.jpg",
      caption: Math.random().toString(36).substring(7),
    };

    it("should return ID for a valid meme", (done) => {
      api
        .post("/memes")
        .set("Content-Type", "application/json")
        .expect("Content-Type", "application/json")
        .send(meme)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(201);
          memeId = res.body.id;
          done();
        });
    });

    it("should return 409 for a duplicate payload", (done) => {
      api
        .post("/memes")
        .send(meme)
        .set("Accept", "application/json")
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(409);
          done();
        });
    });

    it("should return 422 for an invalid payload", (done) => {
      api
        .post("/memes")
        .send(invalidMeme)
        .set("Accept", "application/json")
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(422);
          done();
        });
    });

    it("should return 422 for an incomplete payload", (done) => {
      api
        .post("/memes")
        .send(incompleteMeme)
        .set("Accept", "application/json")
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(422);
          done();
        });
    });
  });
  describe("Test /GET", () => {
    it("should return atmost 100 memes without ID", (done) => {
      api
        .get("/memes")
        .accept("Content-Type", "application/json")
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(200);
          done();
        });
    });

    it("should return details for a given meme with ID", (done) => {
      api
        .get(`/memes/${memeId}`)
        .accept("Content-Type", "application/json")
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(200);
          done();
        });
    });

    it("should return 404 for a wrong ID", (done) => {
      api
        .get(`/memes/123`)
        .accept("Content-Type", "application/json")
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(404);
          done();
        });
    });
  });

  describe("Test /PATCH", () => {
    meme = {
      url:
        "https://static.mommypoppins.com/styles/image620x420/s3/school_meme_6_0.jpg",
      caption: Math.random().toString(36).substring(7),
    };

    it("should return 200 for a valid updation", (done) => {
      api
        .patch(`/memes/${memeId}`)
        .send(meme)
        .set("Content-Type", "application/json")
        .expect("Content-Type", "application/json")
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(200);
          done();
        });
    });

    it("should return 404 for invalid ID ", (done) => {
      api
      .patch(`/memes/123456`)
        .send(meme)
        .set("Content-Type", "application/json")
        .expect('Content-Type', "application/json; charset=utf-8")
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(404);
          done();
        });
    });

    it("should return 409 for a duplicate payload", (done) => {
      api
        .patch(`/memes/${memeId}`)
        .send(meme)
        .set("Content-Type", "application/json; charset=utf-8")
        // .expect('Content-Type', "application/json")
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(409);
          done();
        });
    });

    it("should return 422 if trying to modify name", (done) => {
      meme = {
        name: "Hello",
        url:
          "https://static.mommypoppins.com/styles/image620x420/s3/school_meme_6_0.jpg",
        caption: Math.random().toString(36).substring(7),
      };
      api
        .patch(`/memes/${memeId}`)
        .send(meme)
        .set("Content-Type", "application/json; charset=utf-8")
        // .expect('Content-Type', "application/json")
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(422);
          done();
        });
    });

    it("should return 422 for an invalid payload", (done) => {
      api
        .patch(`/memes/${memeId}`)
        .send(invalidMeme)
        .set("Content-Type", "application/json; charset=utf-8")
        // .expect('Content-Type', "application/json")
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(422);
          done();
        });
    });
  });

  afterAll(async (done) => {
    // await dbHandler.disconnect()
    await mongoose.disconnect();
    app.close(); 
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    done()
  })
});
