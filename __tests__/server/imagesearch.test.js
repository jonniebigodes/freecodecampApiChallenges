import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import SearchModel  from '../../src/models/Searches.model';
import SearchResultsModel from '../../src/models/Searchresults.model';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

before(done=>{
    mongoose.connect('mongodb://localhost:27017/freecodecampapichallenges',
    {
        autoIndex: false, // Don't build indexes
        reconnectTries: 5, // Never stop trying to reconnect
        reconnectInterval: 2000, // Reconnect every 2000ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        bufferCommands:false
    }).then(()=>{
        const searchestoremove= mongoose.model('search');
        searchestoremove.remove({searchwords:'banana'}).then(()=>{
            const datasearchresults=mongoose.model('searchresult');
            datasearchresults.remove({}).then(()=>{
                done();
                mongoose.disconnect();
            });
        });
        
    })
    .catch(err=>{
        done(err);
    })
    
})

describe('/GET list of latestsearches',()=>{
    it('should return a list of saved searches',done=>{
        chai.request(server)
        .get('/api/imagesearch/latest')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('latestsearches');
            chai.expect(res.body.latestsearches).to.have.length(3);

            done();
        })
    })
});

describe('/GET make search without search query',()=>{
    it ('should return error no query present',done=>{
        chai.request(server)
        .get('/api/imagesearch')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(500);
            res.body.should.have.property('message').eql('cannot search nothing');
            done();
        })
    })
});


describe('/GET make a new search',()=>{
    it ('should return a new search',done=>{
        chai.request(server)
        .get('/api/imagesearch')
        .query('searchquery=banana')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('query').eql('banana');
            res.body.queryresults.length.should.eql(10);
            done();
        })
    });
});
describe('/GET make search already stored',()=>{
    it ('should return a search already stored in system',done=>{
        chai.request(server)
        .get('/api/imagesearch')
        .query('searchquery=banana')
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('query').eql('banana');
            res.body.queryresults.length.should.eql(10);
            done();
        })
    });
});