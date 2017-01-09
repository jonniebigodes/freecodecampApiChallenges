import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import timeInfo from './components/timeinfo';
import NotFound from './components/notFound';
import fileMetadata from './components/fileMetaData';
import {Router,Route,browserHistory} from 'react-router';


render(
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/fileinfo" component={fileMetadata}/>
        <Route path="/time/(:dataTime)" component={timeInfo}/>
        <Route path="*" component={NotFound}/> 
       
        
    </Router>,
    document.getElementById('root')
);
//render(<App name='World'/>, document.getElementById('root'));