import '../Assets/styleSheets/base.scss';
import React,{Component} from 'react';

class imgComponent extends Component{
    getExampleResponse(){
        return JSON.stringify({"status":200,"itemsResultMultiple":[{"status":200,"errorInfo":"","results":[{"title":"There's More Than One Way To Query A Cat | Sub It Club","linkurl":"https://subitclub.files.wordpress.com/2013/04/litagentlolcat.jpg","height":450,"width":500,"filesize":27803},{"title":"SBU Captioned Photo Dataset: Search","linkurl":"http://tlberg.cs.unc.edu/vicente/im2text/0001/979.jpg","height":428,"width":512,"filesize":47946},{"title":"Pardon the Interruption - Duetto","linkurl":"http://www.duettoresearch.com/blog/wp-content/uploads/2013/05/cat_sleep-e1369780996432.jpg","height":350,"width":298,"filesize":25847},{"title":"veterinary medicine, surgery, singapore, toa payoh vets, dogs ...","linkurl":"http://www.kongyuensing.com/laws/20150105nostril_scar_not_cancer_owner_query_cat.jpg","height":513,"width":800,"filesize":141430},{"title":"1000+ images about Funny cats on Pinterest | Funny pets, Funny ...","linkurl":"https://s-media-cache-ak0.pinimg.com/736x/1d/1a/6f/1d1a6fc2a6e38dbda1c4630fdc5aa3ac.jpg","height":559,"width":721,"filesize":92881},{"title":"Uncategorized | Denton Writers' Critique Group","linkurl":"https://dentoncritique.files.wordpress.com/2016/04/cool-cat.jpg","height":373,"width":560,"filesize":47874},{"title":"Query Letter Humor: My Pet Cat Wants to Kill Me | Rin Chupeco","linkurl":"http://www.rinchupeco.com/wp-content/uploads/2012/12/assassincat2.png","height":466,"width":348,"filesize":184647},{"title":"a sql query walks into a bar and sees two tables he says, can i ...","linkurl":"https://cdn.meme.am/cache/instances/folder106/66988106.jpg","height":661,"width":500,"filesize":255323},{"title":"A well, Each day and Pet cats on Pinterest","linkurl":"https://s-media-cache-ak0.pinimg.com/564x/76/13/6f/76136f5d084a900073a60b68bae70b8e.jpg","height":460,"width":492,"filesize":29003},{"title":"Siebel, Service Request, Query Cat Meme - Cat Planet | Cat Planet","linkurl":"http://catplanet.org/wp-content/uploads/2014/09/Siebel-service-request.jpg","height":400,"width":400,"filesize":53216}]},{"status":200,"errorInfo":"","results":[{"title":"There's More Than One Way To Query A Cat | Sub It Club","linkurl":"https://subitclub.files.wordpress.com/2013/04/litagentlolcat.jpg","height":450,"width":500,"filesize":27803},{"title":"SBU Captioned Photo Dataset: Search","linkurl":"http://tlberg.cs.unc.edu/vicente/im2text/0001/979.jpg","height":428,"width":512,"filesize":47946},{"title":"Pardon the Interruption - Duetto","linkurl":"http://www.duettoresearch.com/blog/wp-content/uploads/2013/05/cat_sleep-e1369780996432.jpg","height":350,"width":298,"filesize":25847},{"title":"veterinary medicine, surgery, singapore, toa payoh vets, dogs ...","linkurl":"http://www.kongyuensing.com/laws/20150105nostril_scar_not_cancer_owner_query_cat.jpg","height":513,"width":800,"filesize":141430},{"title":"1000+ images about Funny cats on Pinterest | Funny pets, Funny ...","linkurl":"https://s-media-cache-ak0.pinimg.com/736x/1d/1a/6f/1d1a6fc2a6e38dbda1c4630fdc5aa3ac.jpg","height":559,"width":721,"filesize":92881},{"title":"Uncategorized | Denton Writers' Critique Group","linkurl":"https://dentoncritique.files.wordpress.com/2016/04/cool-cat.jpg","height":373,"width":560,"filesize":47874},{"title":"Query Letter Humor: My Pet Cat Wants to Kill Me | Rin Chupeco","linkurl":"http://www.rinchupeco.com/wp-content/uploads/2012/12/assassincat2.png","height":466,"width":348,"filesize":184647},{"title":"a sql query walks into a bar and sees two tables he says, can i ...","linkurl":"https://cdn.meme.am/cache/instances/folder106/66988106.jpg","height":661,"width":500,"filesize":255323},{"title":"A well, Each day and Pet cats on Pinterest","linkurl":"https://s-media-cache-ak0.pinimg.com/564x/76/13/6f/76136f5d084a900073a60b68bae70b8e.jpg","height":460,"width":492,"filesize":29003},{"title":"Siebel, Service Request, Query Cat Meme - Cat Planet | Cat Planet","linkurl":"http://catplanet.org/wp-content/uploads/2014/09/Siebel-service-request.jpg","height":400,"width":400,"filesize":53216}]}]});
    }
    render(){
        return (
            <div className="imageComponent">
                <div className="projectTitle">
                    Supercalifragilistic Image Search microservice
                </div>
                <div className="voffset5 textChallenges">
                    Example image search usage:<p/>
                    https://freecodecampapichallenges.herokuapp.com/api/imgsearch?engine=google&keywords=cat&offset=20
                    The endpoint above has the following parameters:
                    <ul>
                        <li>engine:<br/>The engine to be used.<br/>As off now only google is allowed. </li>
                        <li>keywords:<br/>The search terms to be used.</li>
                        <li>offset:<br/>This argument is optional.<br/>If not provided only 10 results will be returned.<br/>Otherwise the number provided here.<br/>As of now only values bellow 100 are allowed</li>
                    </ul>
                    <p/>
                   
                    
                </div>
                <div className="voffset5 textChallenges">
                     Example result output:<br />
                     
                </div>
                <hr/>
                <div className="voffset2">
                    {this.getExampleResponse()}
                </div>
                <hr/>
                <div className="footer">
                    Made by <a href="https://www.freecodecamp.com/jonniebigodes" target="_blank">Jonniebigodes</a>
                </div>
            </div>
        );
    }
}
export default imgComponent;