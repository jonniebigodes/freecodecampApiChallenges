import React, {Component} from 'react'
import Axios from 'axios'
import Footer from './Footer'
import Header from './Header'
import '../Assets/styleSheets/base.scss'

class Urlist extends Component {
  state = {
    shortUrls: [],
    isError: false
  }
  componentDidMount() {
    setTimeout(() => {
      this.fetchList()
    }, 500)
  }
  fetchList() {
    Axios.get(
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api/short'
        : 'https://freecodecampapichallenges.herokuapp.com/api/short'
    )
      .then(result => {
        this.setState({shortUrls: result.data})
      })
      .catch(err => {
        console.log(
          `ERROR GETTING LIST URLS DATA=>${JSON.stringify(
            err.message,
            null,
            2
          )}`
        )
        this.setState({isError: true})
      })
  }
  render() {
    const {isError, shortUrls} = this.state
    const datalist = shortUrls.map(item => (
      <li key={item.shortid}>
        <a href={item.destination} target="_noopener" rel="nofollow">
          {process.env.NODE_ENV !== 'production'
            ? `http://localhost:5000/api/short/${item.shortid}`
            : `https://freecodecampapichallenges.herokuapp.com/api/short/${
                item.shortid
              }`}
        </a>
      </li>
    ))
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
            Supercalifragilistic API url shortener microservice
          </div>
          <h4>list of urls in system:</h4>
          <ul>{datalist}</ul>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Urlist
