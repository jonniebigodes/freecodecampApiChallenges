import React, {Component} from 'react'
import Axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import ImageItem from './ImageItem'
import '../Assets/styleSheets/base.scss'

class ImageInfo extends Component {
  state = {
    searchquery: '',
    searchResult: [],
    isError: false
  }
  handleQueryChange = e => {
    this.setState({searchquery: e.target.value})
  }
  submitQuery = () => {
    Axios.get(
      process.env.NODE_ENV !== 'production'
        ? `http://localhost:5000/api/imagesearch?searchquery=${
            this.state.searchquery
          }`
        : `https://freecodecampapichallenges.herokuapp.com/api/imagesearch?searchquery=${
            this.state.searchquery
          }`
    )
      .then(result => {
        this.setState({searchResult: result.data.queryresults})
      })
      .catch(errdate => {
        console.log(
          `error getting the date from image search:${errdate.response}`
        )
        this.setState({isError: true})
      })
  }
  fileRandomGenerator = () => {
    return Math.floor(Math.random() * (999999 - 1 + 1) + 1)
  }
  render() {
    const {isError, searchResult, searchquery} = this.state
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
    const imageItems = searchResult.map(item => {
      return (
        <ImageItem
          key={`resultitem_${this.fileRandomGenerator()}`}
          data={item}
        />
      )
    })
    return (
      <div>
        <Header />
        <div className="containerProjects">
          <div className="titles">
            {' '}
            Supercalifragilistic image searcher Microservice
          </div>
          <div className="timeChallenge">
            Example shortener creation usage: Use the provided component bellow.
            Or with your favourite api dev tool like{' '}
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
              <h5>Enter your query</h5>
              <input
                type="text"
                value={searchquery}
                onChange={this.handleQueryChange}
              />
              <button onClick={this.submitQuery}>Submit</button>
            </div>
          </div>
        </div>
        <div className="imagesData">{imageItems}</div>
        <Footer />
      </div>
    )
  }
}
export default ImageInfo
