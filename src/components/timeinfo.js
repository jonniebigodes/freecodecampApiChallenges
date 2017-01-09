import React, {Component} from 'react';
import Utilities from '../../Challenges/Utils';

class timeInfo extends Component {
    renderWithParams(){
        if (this.props.params.dataTime){
            let itemResult= Utilities.getTimeInformation(this.props.params.dataTime);

            return (
                <h3>Unix time stamp:{itemResult.unixTimeStamp} Natural Date:{itemResult.unixTimeStamp}</h3>
            );
        }
        return(
            <div>
                banana
            </div>
        );
    }
    render() {
        //console.log(this.props.params.dataTime);
        //const { className, ...props } = this.props;
        return ( 
            //<div className={classnames('timeInfo', className)} {...props}>
            <div className="timeInfo">
                <div id = "projectTitle" >
                    Supercalifragilistic API  time information microservice
                </div>
                <div>
                    {this.renderWithParams()}
                </div>
            </div>


        )
    }
};
export default timeInfo;