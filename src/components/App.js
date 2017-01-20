import '../Assets/styleSheets/base.scss';
import React,{Component} from 'react';

class App extends Component {
 
  render() {
    
    return(
      <div className="App">
        <div className="projectTitle">
          FreecodeCamp Api Challenges
        </div>
        <div className="textBase voffset4">
          Bellow is a list of endpoints and how to use them for the challenges implemented
        </div>
        <div className="divTable voffset4" >
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell"><a href="https://freecodecampapichallenges.herokuapp.com/whoami" target="_blank">/whoami</a></div>
              <div className="divTableCell">
                Endpoint that implements the challenge Request Header Parser Microservice located at <a href="https://www.freecodecamp.com/challenges/request-header-parser-microservice" target="_blank">here</a>
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell"><a href="https://freecodecampapichallenges.herokuapp.com/time/" target="_blank">/time</a></div>
              <div className="divTableCell">
                Endpoint that implements the challenge Timestamp Microservice located at <a href="https://www.freecodecamp.com/challenges/timestamp-microservice" target="_blank">here</a>.<br/>
                By clicking the link on the cell on the left you will get a page on how to send the information
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell"><a href="https://freecodecampapichallenges.herokuapp.com/urlshort" target="_blank">/urlshort</a></div>
              <div className="divTableCell">
                Endpoint that implements the challenge Url shortener located at <a href="https://www.freecodecamp.com/challenges/url-shortener-microservice" target="_blank">here</a>.<br/>
                By clicking the link on the cell on the left you will get a page on how to send the information
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <a href="https://freecodecampapichallenges.herokuapp.com/fileinfo" target="_blank">/fileinfo</a>
              </div>
              <div className="divTableCell">
                 Endpoint that implements the challenge for parsing the file information located at <a href="https://www.freecodecamp.com/challenges/file-metadata-microservice" target="_blank">here</a>.<br/>
                 By clicking the link on the cell on the left you will get a page on how to send the information
              </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <a href="https://freecodecampapichallenges.herokuapp.com/imgSearch" target="_blank">/imgSearch</a>
               </div>
              <div className="divTableCell">
                Endpoint that implements the challenge for parsing the file information located at <a href="https://www.freecodecamp.com/challenges/image-search-abstraction-layer" target="_blank">here</a>.<br/>
                By clicking the link on the cell on the left you will get a page on how to send the information
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer voffset6">
           Made by <a href="https://www.freecodecamp.com/jonniebigodes" target="_blank">Jonniebigodes</a>
        </div>
        
      </div>
      
      
      
      
    )
  }
};
export default App;