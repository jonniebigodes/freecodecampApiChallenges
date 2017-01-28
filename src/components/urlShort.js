import '../Assets/styleSheets/base.scss';
import React,{Component} from 'react';


class urlShort extends Component{
    render(){
        return(

            <div className="urlShort">
                <div className = "projectTitle" >
                    Supercalifragilistic API  url shortener microservice
                </div>
                <div className="voffset5">
                    Example shortener creation usage:<p/>
                    https://freecodecampapichallenges.herokuapp.com/api/newurl/http://www.google.com<p/>
                    Example result output:<br />
                    
                    "original_url":"http://www.google.com, "shortened_url":"https://freecodecampapichallenges.herokuapp.com/api/short/8888" <p/>
                    To get a list of the urls introduced use the following url:<p/>
                    https://freecodecampapichallenges.herokuapp.com/api/listurls
                </div>
                <div className="voffset2">
                    Usage of the microservice:
                     <div>
                        https://freecodecampapichallenges.herokuapp.com/api/short/8888 <p/>
                     </div>
                </div>
                <hr/>
                <div className="footer">
                    Made by <a href="https://www.freecodecamp.com/jonniebigodes" target="_blank">Jonniebigodes</a>
                </div>
            </div>
        );
    }
};
export default urlShort;