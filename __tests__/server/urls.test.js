import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import UrlModel from '../../src/models/Urls.model';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

describe('/GET list of urls stored in the database',()=>{
    it ('should return a valid object with a list of stored urls',done=>{
        chai.request(server)
        .get('/api/short')
        .then(res=>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
});
describe('/POST url that exists',()=>{
    it('should prevent addition of url already added',done=>{
        chai.request(server)
        .post('/api/short')
        .send({url:'http://www.google.com'})
        .then(res=>{
            res.should.have.status(500);
            res.body.should.have.property('message').eql('url already added');
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
});

describe('/POST invalid url',()=>{
    it('should prevent the injection of invalid url format like 192.168.....',done=>{
        chai.request(server)
        .post('/api/short')
        .send({url:'http://192.168.0.1:5000'})
        .then(res=>{
            res.should.have.status(500);
            res.body.should.have.property('message').eql('Invalid URL');
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
})
  /**/
describe('/POST valid url',()=>{
    it('should allow injection of a valid url',done=>{
        chai.request(server)
        .post('/api/short')
        .send({url:'http://www.instagram.com'})
        .then(res=>{
            res.should.have.status(201);
            res.body.should.have.property('original_url').eql('http://www.instagram.com');
            // res.body.should.have.property('message').eql('Invalid URL');
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
})
describe('/GET redirect short url with string',()=>{
    it('should prevent redirection, no strings allowed',done=>{
        chai.request(server)
        .get(`/api/short/sssss`)
        .then(res=>{
            res.should.have.status(500);
            res.body.should.have.property('message').eql('The value sent is not numeric, or not in conformity with the requested');
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
});

describe('/GET redirect short url with numeric value not present',()=>{
    it('should prevent redirection,not present in system',done=>{
        chai.request(server)
        .get('/api/short/32')
        .then(res=>{
            res.should.have.status(500);
            res.body.should.have.property('message').eql('The submitted item is not present');
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
});
describe('/GET redirect short url with numeric present',()=>{
    it('should allow redirection,present in system',done=>{
        chai.request(server)
        .get('/api/short/536608')
        .redirects(0)
        .send()
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(302);
            done();
        })
    })
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
        }).then(()=>{
            const urlmodel= mongoose.model('url');
            urlmodel.remove({urllink:'http://www.instagram.com'}).then(() => {
                mongoose.disconnect();
                done();
            }).catch(errorremove=>{
                done(errorremove);
            })
        })
        .catch(err=>{
            done(err);
        })
});