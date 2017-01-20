import '../Assets/styleSheets/base.scss';
import React,{Component} from 'react';

class imgComponent extends Component{
    render(){
        return (
            <div className="imageComponent">
                <div className="projectTitle">
                    Supercalifragilistic Image Search microservice
                </div>
                <div className="voffset5">
                    Example image search usage:<p/>

                    Example result output:<br />
                </div>
                <div className="voffset2">
                    
                </div>
                <hr/>
                Made by <a href="https://www.freecodecamp.com/jonniebigodes" target="_blank">Jonniebigodes</a>
            </div>
        );
    }
}
export default imgComponent;