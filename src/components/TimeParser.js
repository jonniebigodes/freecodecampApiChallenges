import axios from 'axios'
import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import '../Assets/styleSheets/base.scss'

class TimeParser extends Component {
  state = {
    timeSend: '',
    converted: {},
    isError: false
  }
  handleChange = e => {
    this.setState({timeSend: e.target.value})
  }

  SendDate = () => {
    if (this.state.timeSend !== '') {
      axios
        .post(
          process.env.NODE_ENV !== 'production'
            ? 'http://localhost:5000/api/time'
            : 'https://freecodecampapichallenges.herokuapp.com/api/time',
          {
            time: this.state.timeSend
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )

        .then(result => {
          this.setState({converted: result.data})
        })
        .catch(errortime => {
          console.log(
            `ERROR GETTING TIME DATA=>${JSON.stringify(
              errortime.message,
              null,
              2
            )}`
          )
          this.setState({isError: true})
        })
    }
  }

  render() {
    const {timeSend, converted, isError} = this.state
    if (isError) {
      return (
        <div>
          <Header />
          <div className="timeChallenge">
            Looks like something went belly up.<br />
            Try refreshing the page and submit once again.
          </div>
        </div>
      )
    }
    return (
      <div>
        <Header />
        <div className="containerProjects">
          <div className="titles">
            Supercalifragilistic Time information microservice
          </div>
          <div className="timeChallenge">
            Example timeparser creation usage: Use the provided component
            bellow. Or with your favourite api dev tool like{' '}
            <a
              href="https://www.getpostman.com/"
              target="_noopener"
              rel="nofollow">
              Postman
            </a>{' '}
            or{' '}
            <a href="https://curl.haxx.se/" target="_noopener" rel="nofollow">
              curl
            </a>{' '}
            for instance. Create a POST request to{' '}
            <a
              href={
                process.env.NODE_ENV !== 'production'
                  ? 'http://localhost:5000/api/time'
                  : 'https://freecodecampapichallenges.herokuapp.com/api/time'
              }
              target="_noopener"
              rel="nofollow">
              [project_url]/api/time{' '}
            </a>with a JSON body property of url with the url
          </div>
          <div className="containerTime">
            <div className="timeSubmission">
              <h5>Enter your date</h5>
              <input
                type="text"
                value={timeSend}
                onChange={this.handleChange}
              />
              <button onClick={this.SendDate}>Submit Date</button>
            </div>
          </div>

          <div className="timeChallenge">
            Accepted formats for dates are, timestamp fomat like 1530291378. Or
            following this format DD/MM/YYYY, Example:19/03/2018
          </div>

          {converted.NaturalDate ? (
            <div className="timeChallenge" key="parsedDate">
              Example response:Natural Date is: {converted.NaturalDate}
              <br />TimeStamp is:{converted.unixTimeStamp}
            </div>
          ) : (
            <div className="timeChallenge" key="parsedDate">
              Nothing yet so far
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}
export default TimeParser
