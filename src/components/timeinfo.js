import '../Assets/styleSheets/base.scss';
import Utilities from '../../Challenges/Utils';
import React, {Component} from 'react';


class timeInfo extends Component {
    renderWithParams(){
        if (this.props.params.dataTime){
            let itemResult= Utilities.getTimeInformation(this.props.params.dataTime);

            return (
                <h3>Unix time stamp: {itemResult.unixTimeStamp} Natural Date: {itemResult.NaturalDate}</h3>
            );
        }
        return(
            <div>
                
                <div className="textChallenges">
                    Example usage:<p/>
                    Natural Date:<br/>
                    https://freecodecampapichallenges.herokuapp.com/time/Month%20Day%20Year<p/>
                    Unix Time Stamp:<br />
                    https://freecodecampapichallenges.herokuapp.com/time/10023212312<p/>
                    
                </div>
            </div>
        );
    }
    render() {
        
        return ( 
            
            <div className="timeInfo">
                <div className = "projectTitle" >
                    Supercalifragilistic API  time information microservice
                </div>
                <div className="voffset5">
                    {this.renderWithParams()}
                </div>

                <hr/>
                <div className="footer">
                    Made by <a href="https://www.freecodecamp.com/jonniebigodes" target="_blank">Jonniebigodes</a>
                </div>
            </div>
            

        )
    }
};
export default timeInfo;