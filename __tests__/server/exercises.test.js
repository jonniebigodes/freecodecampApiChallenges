import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import ExerciseModel from '../../src/models/Exercises.model';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

before(done=>{
    mongoose.connect('mongodb://localhost:27017/freecodecampapichallenges',
    {
        autoIndex: false, // Don't build indexes
        reconnectTries: 100, // Never stop trying to reconnect
        reconnectInterval: 2000, // Reconnect every 2000ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        bufferCommands:false
    })
    .then(()=>{
        const testexercise = mongoose.model('exercise');
        testexercise.remove({}).then(()=>{
            mongoose.disconnect();
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
})
// #region post method tests
describe('/POST an exercise by invalid params=>userid',()=>{
    it('should not allow exercises to be added without user id',done=>{
        chai.request(server)
        .post('/api/exercise')
        .send({
            desc:'banana',
            duration:200,
        })
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(500);
            res.body.should.have.property('message').eql('no username provided');
            done();
        })
    });
});
describe('/POST an exercise by invalid params=>desc',()=>{
    it('should not allow exercises to be added without desc',done=>{
        chai.request(server)
        .post('/api/exercise')
        .send({
            duration:200,
            userid:1
        })
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(500);
            res.body.should.have.property('message').eql('no exercice description provided');
            done();
        })
    });
});
describe('/POST an exercise by invalid params=>duration',()=>{
    it('should not allow exercises to be added without duration',done=>{
        chai.request(server)
        .post('/api/exercise')
        .send({
            desc:'banana',
            userid:1
        })
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(500);
            res.body.should.have.property('message').eql('no exercice duration provided');
            done();
        })
    });
});
describe('/POST an exercise by invalid params=>duration not int',()=>{
    it('should not allow exercises to be added without duration to be a int',done=>{
        chai.request(server)
        .post('/api/exercise')
        .send({
            desc:'banana',
            userid:1,
            duration:'ssss'
        })
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(500);
            res.body.should.have.property('message').eql('exercise duration invalid');
            done();
        })
    });
});
 describe('/POST an exercise valid params without date',()=>{
    it('should allow a introduction of an exercise without date',done=>{
        chai.request(server)
        .post('/api/exercise')
        .send({
            duration:200,
            desc:'banana1',
            userid:1
        })
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(201);
            res.body.should.have.property('message').eql('Exercise was created with success');
            done();
        })
    });
});
describe('/POST an exercise valid params with invalid date',()=>{
    it('should allow a introduction of an exercise with invalid date',done=>{
        chai.request(server)
        .post('/api/exercise')
        .send({
            duration:300,
            desc:'banana2',
            userid:1,
            exercisedate:'2018-13-32'
        })
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(201);
            res.body.should.have.property('message').eql('Exercise was created with success');
            done();
        })
    });
});
describe('/POST an exercise valid params with valid date',()=>{
    it('should allow a introduction of an exercise with valid date',done=>{
        chai.request(server)
        .post('/api/exercise')
        .send({
            duration:200,
            desc:'banana',
            userid:1,
            exercisedate:'2018-06-21'

        })
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(201);
            res.body.should.have.property('message').eql('Exercise was created with success');
            done();
        })
    });
});

// #endregion

// #region get method tests
describe('/GET list of exercises without user',()=>{
    it('should return error...no user provided',done=>{
        chai.request(server)
        .get('/api/exercise')
        .query('from=111')
        .query('to=1111')
        .query('limit=10')
        .send()
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(500);
            res.body.should.have.property('message').eql('no user provided');
            done();
        })
    });
});
describe('/GET list of exercises invalid user',()=>{
    it ('should return error...invalid user',done=>{
        chai.request(server)
        .get('/api/exercise')
        .query('user=xpto')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(500);
            res.body.should.have.property('message').eql('provided id is not valid');
            done();
        })
    });
});
describe('/GET list of exercises with limit 10 for user 1 with dates',()=>{
    it ('should return a list of exercises for user 1 with a limit of 10 and dates',done=>{
        chai.request(server)
        .get('/api/exercise')
        .query('user=1')
        .query('from=2018-06-01')
        .query('to=2018-06-31')
        .query('limit=10')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('message').eql('got something');
            res.body.should.have.property('items');
            // res.body.items.length.should.eql(2);
            done();
        })
    });
});
describe('/GET list of exercises with limit 10 for user 2 with dates',()=>{
    it ('should return a list of exercises for user 2 with a limit of 10 and dates provided',done=>{
        chai.request(server)
        .get('/api/exercise')
        .query('user=2')
        .query('from=2018-06-23')
        .query('to=2018-06-25')
        .query('limit=10')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Nothing found');
            res.body.should.have.property('items');
            res.body.items.length.should.eql(0);
            // res.body.should.have.property('message').eql('provided id is not valid');
            done();
        })
    });
});
describe('/GET list of exercises with limit 10 for user 1 without dates',()=>{
    it ('should return a list of exercises with a limit of 10 for user 1 with dates',done=>{
        chai.request(server)
        .get('/api/exercise')
        .query('user=1')
        .query('limit=10')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('message').eql('got something');
            res.body.should.have.property('items');
            res.body.items.length.should.eql(3);
            done();
        })
    });
});
describe('/GET list of exercises without dates and limit',()=>{
    it ('should return list of exercises for user 1 no dates and limits',done=>{
        chai.request(server)
        .get('/api/exercise')
        .query('user=1')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('message').eql('got something');
            res.body.should.have.property('items');
            res.body.items.length.should.eql(3);
            done();
        })
    });
});
describe('/GET list of exercises without dates and limit banana',()=>{
    it ('should return list of exercises for user 1 no dates and limits=banana',done=>{
        chai.request(server)
        .get('/api/exercise')
        .query('user=1')
        .query('limit=banana')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('message').eql('got something');
            res.body.should.have.property('items');
            res.body.items.length.should.eql(3);
            done();
        })
    });
});
// #endregion
after(done=>{
    mongoose.connect('mongodb://localhost:27017/freecodecampapichallenges',
    {
        autoIndex: false, // Don't build indexes
        reconnectTries: 100, // Never stop trying to reconnect
        reconnectInterval: 2000, // Reconnect every 2000ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        bufferCommands:false
    })
    .then(()=>{
        const testexercise = mongoose.model('exercise');
        testexercise.remove({}).then(()=>{
            mongoose.disconnect();
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
});