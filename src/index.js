import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import timeInfo from './components/timeinfo';
import NotFound from './components/notFound';
import fileMetadata from './components/fileMetaData';
import urlShort from './components/urlShort';
import imgComponent from './components/imgComponent';
import {Router,Route,browserHistory} from 'react-router';


render(
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/urlshort" component={urlShort}/>
        <Route path="/imgsearch" component={imgComponent}/>
        <Route path="/fileinfo" component={fileMetadata}/>
        <Route path="/time/(:dataTime)" component={timeInfo}/>
        <Route path="/urlshort" component={urlShort}/>
        <Route path="*" component={NotFound}/> 
    </Router>,
    document.getElementById('root')
);
