import React, {Component} from 'react'
import Axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import '../Assets/styleSheets/base.scss'

class Exercises extends Component {
  state = {
    userresult: 0,
    userid: 0,
    erroruserId: false,
    username: '',
    errorusername: false,
    description: '',
    errordescription: false,
    exerciseduration: 0,
    errorduration: false,
    date: '',
    isError: false,
    exerciseOK: false
  }
  // #region create user
  onUserCreate = e => {
    e.preventDefault()
    if (this.state.username === '') {
      this.setState({errorusername: true})
      return
    }
    Axios.post(
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api/exercise/newuser'
        : 'https://freecodecampapichallenges.herokuapp.com/api/exercise/newuser',
      {
        user: this.state.username
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(result => {
        this.setState({userresult: result.data.userid})
      })
      .catch(error => {
        console.log('====================================')
        console.log(`Error creating user:${error.message}`)
        console.log('====================================')
        this.setState({isError: true})
      })
  }
  // #endregion

  // #region create exercise
  onExerciseCreate = e => {
    e.preventDefault()

    const {userid, description, exerciseduration, date} = this.state
    if (userid === 0) {
      this.setState({erroruserId: true})
      return
    }
    if (description === '') {
      this.setState({errordescription: true})
      return
    }
    if (exerciseduration === 0) {
      this.setState({errorduration: true})
      return
    }

    Axios.post(
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api/exercise'
        : 'https://freecodecampapichallenges.herokuapp.com/api/exercise',
      {
        userdata: userid,
        desc: description,
        duration: exerciseduration,
        exercisedate: date
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(() => {
        this.setState({
          exerciseOK: true,
          userresult: 0,
          userid: 0,
          erroruserId: false,
          username: '',
          errorusername: false,
          description: '',
          errordescription: false,
          exerciseduration: 0,
          errorduration: false,
          date: ''
        })
      })
      .catch(error => {
        console.log('====================================')
        console.log(`Error creating user:${error.message}`)
        console.log('====================================')
        this.setState({isError: true})
      })
  }
  // #endregion

  // #region input handlers
  handleChangeUser = e => {
    this.setState({username: e.target.value, errorusername: false})
  }
  handleChangeDescription = e => {
    this.setState({description: e.target.value, errordescription: false})
  }
  handleChangeDuration = e => {
    if (Number.isInteger(parseInt(e.target.value, 10))) {
      this.setState({
        exerciseduration: parseInt(e.target.value, 10),
        errorduration: false
      })
    }
  }
  handleChangeDate = e => {
    this.setState({date: e.target.value})
  }
  handleChangeUserId = e => {
    if (Number.isInteger(parseInt(e.target.value, 10))) {
      this.setState({userid: parseInt(e.target.value, 10), erroruserId: false})
    }
  }
  cancelSub = () => {
    return false
  }
  // #endregion

  render() {
    const {
      exerciseOK,
      username,
      errorusername,
      description,
      errordescription,
      exerciseduration,
      errorduration,
      date,
      userid,
      erroruserId,
      isError,
      userresult
    } = this.state

    if (exerciseOK) {
      return (
        <div key="ExerciseOK">
          <Header />
          <div className="timeChallenge">
            Your exercise was created with success.
          </div>
          <Footer />
        </div>
      )
    }
    if (isError) {
      return (
        <div key="ErrorView">
          <Header />
          <div className="timeChallenge">
            Looks like something went belly up.<br />
            Try refreshing and submitting again according to what is required.
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div>
        <Header />
        <div className="titles">
          Supercalifragilistic Exercise tracker microservice
        </div>
        <div className="containerExercises">
          <div className="itemContainer" key="containeruser">
            <div className="exercisesChallenge">
              Example user creation usage:<p />
              Use the provided component bellow. Or with your favourite api dev
              tool like{' '}
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
                    ? 'http://localhost:5000/api/exercise/newuser'
                    : 'https://freecodecampapichallenges.herokuapp.com/api/exercise/newuser'
                }
                target="_noopener"
                rel="nofollow">
                [project_url]/api/exercise/newuser{' '}
              </a>{' '}
              with a JSON body property of user.
            </div>
            <form className="formexercise" onSubmit={this.cancelSub}>
              <div className="form-group formexercise">
                <input
                  type="text"
                  className={
                    errorusername ? 'exercisesInputError' : 'inputExercise'
                  }
                  onChange={this.handleChangeUser}
                  value={username}
                />
              </div>
              <div className="form-group formexercise">
                <button onClick={this.onUserCreate} className="buttonExercise">
                  Submit
                </button>
              </div>
            </form>
            <div>
              {userresult !== 0 ? (
                <div className="exercisesChallenge">
                  {' '}
                  your user id is {userresult}
                </div>
              ) : (
                <div className="exercisesChallenge">No user yet</div>
              )}
            </div>
          </div>
          <div className="itemContainer" key="containerExercise">
            <div className="exercisesChallenge">
              Example exercise creation usage:<p />
              Use the provided component bellow. Or with your favourite api dev
              tool like{' '}
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
                    ? 'http://localhost:5000/api/exercise'
                    : 'https://freecodecampapichallenges.herokuapp.com/api/exercise'
                }
                target="_noopener"
                rel="nofollow">
                [project_url]/api/exercise{' '}
              </a>{' '}
              with a JSON body object containing userid, desc, duration and
              optional date.
            </div>
            <form className="formexercise" onSubmit={this.cancelSub}>
              <div className="form-group formexercise">
                <input
                  type="text"
                  className={
                    erroruserId ? 'exercisesInputError' : 'inputExercise'
                  }
                  onChange={this.handleChangeUserId}
                  value={userid}
                  placeholder="Enter your user id"
                />
              </div>
              <div className="form-group formexercise">
                <input
                  type="text"
                  className={
                    errordescription ? 'exercisesInputError' : 'inputExercise'
                  }
                  onChange={this.handleChangeDescription}
                  value={description}
                  placeholder="Enter a description"
                />
              </div>
              <div className="form-group formexercise">
                <input
                  type="text"
                  className={
                    errorduration ? 'exercisesInputError' : 'inputExercise'
                  }
                  onChange={this.handleChangeDuration}
                  value={exerciseduration}
                  placeholder="Enter duration"
                />
              </div>
              <div className="form-group formexercise">
                <input
                  type="text"
                  className="inputExercise"
                  onChange={this.handleChangeDate}
                  value={date}
                  placeholder="Valid date in the format of YYYY-MM-DD"
                />
              </div>
              <div className="form-group formexercise">
                <button
                  onClick={this.onExerciseCreate}
                  className="buttonExercise">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="exercisesInfoText">
          <strong>In order to get a list of exercises.</strong>
          <br />
          Fire up a browser tab/window Or with your favourite api dev tool like{' '}
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
          for instance.
        </div>
        <div className="exercisesInfoText">
          And use this endpoint
          [project_url]/api/exercise?user=&from=&to=&limit=
        </div>
        <div className="exercisesInfoText">
          Asides from the field user, the rest is optional
        </div>
        <Footer />
      </div>
    )
  }
}
export default Exercises
