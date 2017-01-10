import React, {Component} from 'react';
import '../Assets/styleSheets/base.scss';
class fileMetadata extends Component{
    
    render(){
       return( <div>
            <div className="projectTitle">
                SuperCalifragilistic file metadata parser
            </div>
            <div className="textChallenges">
                <h3>File Upload</h3>
                Select a file to upload and parse information:<br />

                <form id="forminputupload" method="post" encType="multipart/form-data" action="/api/files">
                    <input type="file" name="upl"/>
                    <input type="submit" value="Upload" name="submit"/>
                </form>
            </div>

        </div>)
        
    }
};
export default fileMetadata;