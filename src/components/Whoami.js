import axios from 'axios'
import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import '../Assets/styleSheets/base.scss'

class WhoAmi extends Component {
  state = {
    isError: false,
    clientInfo: {}
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchInfo()
    }, 200)
  }
  fetchInfo = () => {
    axios
      .get(
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:5000/api/whoami'
          : 'https://freecodecampapichallenges.herokuapp.com/api/whoami'
      )
      .then(result => {
        this.setState({clientInfo: result.data})
        this.parseOS(result.data)
      })
      .catch(err => {
        console.log(
          `ERROR GETTING DATA=>${JSON.stringify(err.response, null, 2)}`
        )
        this.setState({isError: true})
      })
  }
  parseOS = value => {
    if (value.clientOsInfo) {
      return `${Object.keys(value.clientOsInfo)}, ${Object.values(
        value.clientOsInfo
      )}`
    }
    return `Not yet`
  }
  render() {
    const {clientInfo, isError} = this.state
    if (isError) {
      return (
        <div key="ErrorView">
          <Header />
          <div>
            Well now that&#39;s awkward looks like something bad happened
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div>
        <Header />
        <div className="containerProjects">
          <div className="titles">
            {' '}
            Supercalifragilistic Header Parser Microservice
          </div>
          <div>
            <div className="HeaderParserChallenge">
              You can see the info about your system heading down to{' '}
              <a
                href={
                  process.env.NODE_ENV !== 'production'
                    ? 'http://localhost:5000/api/whoami'
                    : 'https://freecodecampapichallenges.herokuapp.com/api/whoami'
                }
                target="_noopener"
                rel="nofollow">
                [project_url]/api/whoami
              </a>. The information contained will refer to ip address, OS and
              system language of your device based on the headers User-Agent and
              Accept-Language
            </div>
            <div className="HeaderParserChallenge" key="infoclient">
              An example response can be seen here Running on:{this.parseOS(
                clientInfo
              )}{' '}
              using as a language:{clientInfo.clientLanguage}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default WhoAmi
