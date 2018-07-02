import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import UserModel from '../../src/models/Users.model';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

describe('/POST with no username',()=>{
    it('should not allow empty usernames to be added',done=>{
        chai.request(server)
        .post('/api/exercise/newuser')
        .send()
        .then(res=>{
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('no username provided');
            done();
        })
        .catch(err=>{
            done(err);
        })
    });
});


describe('/POST valid username',()=>{
    it('should allow injection of username',done=>{
        chai.request(server)
        .post('/api/exercise/newuser')
        .send({user:'testuser'})
        .then(res=>{
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('user created');
            done();
        })
        .catch(err=>{
            done(err);
        })
    });
});
describe('/POST username already created',()=>{
    it('should not allow repeat of usernames',done=>{
        chai.request(server)
        .post('/api/exercise/newuser')
        .send({user:'testuser'})
        .then(res=>{
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('username already present');
            done();
        })
        .catch(err=>{
            done(err);
        })
    });
});
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
        const testUSer=mongoose.model('user');
        testUSer.remove({username:'testuser'}).then(() => {
            mongoose.disconnect();
            done();
        })
        .catch(errorremove=>{
            done(errorremove)
        })
    })
    .catch(err=>{
        done(err);
    })
});

