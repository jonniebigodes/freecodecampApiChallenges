import Axios from 'axios'
import React, {Component} from 'react'
import Footer from './Footer'
import Header from './Header'
import '../Assets/styleSheets/base.scss'

class Shortener extends Component {

  state = {
    url: '',
    shortData: {},
    isError: false
  }
  setUrl = e => {
    this.setState({url: e.target.value})
  }
  handleKeys = e => {
    if (e.key === 'Enter') {
      this.sendUrl()
    }
  }

  sendUrl = () => {
    Axios.post(
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api/short'
        : 'https://freecodecampapichallenges.herokuapp.com/api/short',
      {
        url: this.state.url
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(result => {
        this.setState({shortData: result.data})
      })
      .catch(err => {
        console.log(
          `ERROR GETTING TIME ATA=>${JSON.stringify(err.response, null, 2)}`
        )
        this.setState({isError: true})
      })
  }
  rendershortURl = () => {
    return (
      <div>
        <div className="timeSubmission" key="urlsubmission">
          The url can be visited in {' '}
          <a
            href={this.state.shortData.short_url}
            target="_noopener"
            rel="nofollow">
            here
          </a>
        </div>
      </div>
    )
  }
  render() {
    const {url, shortData, isError} = this.state

    if (isError) {
      return (
        <div>
          <Header />
          <div className="timeChallenge">
            Looks like something went belly up.<br />
            Try refreshing the page and submit once again according the formats
            stated
          </div>
        </div>
      )
    }
    return (
      <div>
        <Header />
        <div className="containerProjects">
          <div className="titles">
            Supercalifragilistic API url shortener microservice
          </div>
          <div>
            <div className="urlShortenerinfo">
              Example shortener creation usage: Use the provided shortener tool
              bellow. Or with your favourite api dev tool like{' '}
              <a
                href="https://www.getpostman.com/"
                target="_noopener"
                rel="nofollow">
                Postman
              </a>{' '}
              or{' '}
              <a href="https://curl.haxx.se/" target="_noopener" rel="nofollow">
                Curl
              </a>{' '}
              for instance. Create a POST request to{' '}
              <a
                href={
                  process.env.NODE_ENV !== 'production'
                    ? 'http://localhost:5000/api/short'
                    : 'https://freecodecampapichallenges.herokuapp.com/api/short'
                }
                target="_noopener"
                rel="nofollow">
                [project_url]/api/short{' '}
              </a>[project_url]/api/short with a JSON body property of url with
              the url you want shortened
            </div>
            <div className="urlShortenerinfo">
              And will recieve a shortened version of the url in the response<br />
              Example :
              &#123;&#34;original_url&#34;&#58;&#34;http://original.url.com&#34;&#44;&#34;shortened_url&#34;&#58;&#34;[project_url]/api/short/1&#34;&#125;<br />
              Or Invalid URL if the url provided is not correct
            </div>
            <div className="containerTime">
              <div className="timeSubmission">
                <div>URL to be shortened</div>
                <input type="text" onChange={this.setUrl} value={url} />
                <button onClick={this.sendUrl}>Send</button>
              </div>
            </div>
            <div className="containerTime">
              {shortData.short_url ? (
                this.rendershortURl()
              ) : (
                <div className="timeSubmission">Nothing yet</div>
              )}
            </div>
          </div>
          <div className="infoshortenertext">
            Usage of the microservice: [project_url]/api/short/349271 <p />
            Will redirect to http://www.bootstrap.com
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Shortener