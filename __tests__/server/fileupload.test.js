import chai from 'chai';
import superagent from 'superagent';
import fs from 'fs';


chai.should();

describe('POST upload file',()=>{
    const filepath=`${__dirname}\\Linkdown.jpg`;
    it('should upload a file and return info',done=>{
        fs.stat(filepath,(err,stats)=>{
            if (err){
                done(err)
            }
            if (stats.isFile()){
                superagent.post('http://localhost:5000/api/files')
                .attach('upl',filepath)
                .then(result=>{
                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('fileName');
                    result.body.should.have.property('filetype');
                    result.body.should.have.property('FileSize');
                    done();
                })
                .catch(errorsuper=>{
                    done(errorsuper);
                })
            }
        })
    });
});