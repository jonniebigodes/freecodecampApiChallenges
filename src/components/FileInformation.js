import axios from 'axios'
import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'

import '../Assets/styleSheets/base.scss'

class FileInformation extends Component {
  state = {
    fileName: '',
    filetype: '',
    filesize: 0,
    isError: false
  }

  uploadHandler = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('upl', this.uploadInput.files[0])
    axios
      .post(
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:5000/api/files'
          : 'https://freecodecampapichallenges.herokuapp.com/api/files',
        formData
      )
      .then(result => {
        this.setState({
          fileName: result.data.fileName,
          filetype: result.data.filetype,
          filesize: result.data.FileSize
        })
      })
      .catch(error => {
        console.log('====================================')
        console.log(
          `error info about the file:${JSON.stringify(error.response, null, 2)}`
        )
        console.log('====================================')
        this.setState({isError: true})
      })
  }
  render() {
    const {fileName, filetype, filesize, isError} = this.state
    if (isError) {
      return (
        <div>
          <Header />
          <div className="fileChallenge">
            Looks like something went belly up.<br />
            Try refreshing and submitting again.
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
          <div className="fileChallenge">
            Example File Metadata information usage: Use the provided component
            bellow to select a file and upload it. And you should get some
            information about the file.
          </div>
          <form onSubmit={this.uploadHandler} className="formupload">
            <div className="form-group">
              <input
                className="form-control"
                ref={ref => {
                  this.uploadInput = ref
                }}
                type="file"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-success">Upload</button>
            </div>
          </form>
          <div className="fileChallenge">
            File {fileName} is of type {filetype} and is {filesize} Kb long
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default FileInformation
