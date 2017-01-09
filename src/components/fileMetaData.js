import React, {Component} from 'react';

class fileMetadata extends Component{
    
    render(){
       return( <div className="">
            <div className="metadataTitle">
                SuperCalifragilistic file metadata parser
            </div>
            <div>
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