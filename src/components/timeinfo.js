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
        //console.log(this.props.params.dataTime);
        //const { className, ...props } = this.props;
        return ( 
            //<div className={classnames('timeInfo', className)} {...props}>
            <div className="timeInfo">
                <div className = "projectTitle" >
                    Supercalifragilistic API  time information microservice
                </div>
                <div className="voffset5">
                    {this.renderWithParams()}
                </div>
            </div>


        )
    }
};
export default timeInfo;