import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './components/App'
import WhoAmi from './components/Whoami'
// import TimeInfo from './components/Timeinfo'
// import NotFound from './components/NotFound'
// import FileMetaInfo from './components/FileMetaData'
// import UrlShort from './components/UrlShort'
import Urlist from './components/UrlList'
import imgComponent from './components/imgComponent'
import Exercises from './components/Exercises'

render(
  <BrowserRouter>
    <Switch>
      <Route path="/whoami" exact component={WhoAmi} />
      {/* <Route path="/time" exact component={TimeInfo} /> */}
      {/* <Route path="/fileupload" exact component={FileMetaInfo} /> */}
      {/* <Route path="/shorter" exact component={UrlShort} /> */}
      <Route path="/listshort" exact component={Urlist} />
      <Route path="/imgsearch" exact component={imgComponent} />
      <Route path="/exercises" exact component={Exercises} />
      <Route path="/" exact component={App} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
