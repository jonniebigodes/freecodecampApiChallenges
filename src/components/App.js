import {Link} from 'react-router-dom'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import '../Assets/styleSheets/base.scss'
/**
 * base component for the app
 */

const App = () => (
  <div>
    <Header />
    <div className="projectTitle">FreecodeCamp Api Challenges</div>
    <div className="textBase">
      Bellow is a list of endpoints and how to use them for the challenges
      implemented
    </div>
    <table>
      <thead>
        <tr>
          <th>Project Endpoint</th>
          <th>Project Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Link to="/whoami">/whoami</Link>
          </td>
          <td>
            <p>
              Endpoint that implements the Api and Microservices project Request
              Header Parser Microservice.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/time">/time</Link>
          </td>
          <td>
            <p>
              Endpoint that implements the Api and Microservices project
              Timestamp Microservice.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/shorter">/shorter</Link>
          </td>
          <td>
            <p>
              Endpoint that implements the Api and Microservices project URL
              Shortener Microservice.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/listshort">/listshort</Link>
          </td>
          <td>
            <p>
              Endpoint that gets a list of the urls stored by Api project URL
              Shortener Microservice.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/fileupload">/fileinfo</Link>
          </td>
          <td>
            <p>
              Endpoint that implements the Api and Microservices project Request
              Header Parser Microservice.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/imgsearch">/imagesearch</Link>
          </td>
          <td>
            <p>
              Endpoint that implements the Api and Microservices project Image
              Search.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/exercises">/exercises</Link>
          </td>
          <td>
            <p>
              Endpoint that implements the Api and Microservices project
              Exercise Tracker.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <Footer />
  </div>
)
export default App
