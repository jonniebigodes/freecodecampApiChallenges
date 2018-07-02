import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './components/App'
import WhoAmi from './components/Whoami'
import TimeParser from './components/TimeParser'
// import NotFound from './components/NotFound'
import FileInformation from './components/FileInformation'
import Shortener from './components/Shortener'
import Urlist from './components/UrlList'
import imgComponent from './components/imgComponent'
import Exercises from './components/Exercises'

render(
  <BrowserRouter>
    <Switch>
      <Route path="/whoami" exact component={WhoAmi} />
      <Route path="/time" exact component={TimeParser} />
      <Route path="/fileupload" exact component={FileInformation} />
      <Route path="/shorter" exact component={Shortener} />
      <Route path="/listshort" exact component={Urlist} />
      <Route path="/imgsearch" exact component={imgComponent} />
      <Route path="/exercises" exact component={Exercises} />
      <Route path="/" exact component={App} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
