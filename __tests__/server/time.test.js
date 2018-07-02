import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.should();
chai.use(chaiHttp);


describe('/POST time test valid numeric',()=>{
    it ('should return a valid object with a parsed time',(done)=>{
        chai.request(server)
        .post('/api/time')
        .send({time:1529446139})
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('NaturalDate');
            res.body.should.have.property('unixTimeStamp');
            res.body.should.have.property('NaturalDate').eql('2018-06-19');
            res.body.should.have.property('unixTimeStamp').eql(1529446139);
            done();
        })
    })
});

describe('/POST time test invalid date',()=>{
    it ('should return a invalid date object with value of Not valid',(done)=>{
        
        chai.request(server)
        .post('/api/time')
        .send({time:'06-31-2018'})
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('NaturalDate');
            res.body.should.have.property('unixTimeStamp');
            res.body.should.have.property('NaturalDate').eql('Not valid');
            res.body.should.have.property('unixTimeStamp').eql('Not valid');
            done();
        })
    })
});
describe('/POST time test valid utc time',()=>{
    it('should return a valid date based on parsed object',(done)=>{
        chai.request(server)
        .post('/api/time')
        .send({time:'19/06/2018'})
        .end((err,res)=>{

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('NaturalDate');
            res.body.should.have.property('unixTimeStamp');
            done();
        })
    })
})

