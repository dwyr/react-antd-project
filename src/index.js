import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './less/index.less';
import App from './containers/App';
import Bundle from './bundle.js';


import WelcomeContainer                 from 'bundle-loader?lazy&name=app-[name]!./components/Welcome' ;
//import NoMatchContainer                 from 'bundle-loader?lazy&name=app-[name]!./components/NoMatch' ;


const Welcome             = (props) => (<Bundle load={WelcomeContainer}           {...props}>{ (Page) => <Page {...props} />}</Bundle>)
//const NoMatch             = (props) => (<Bundle load={NoMatchContainer}           {...props}>{ (Page) => <Page {...props} />}</Bundle>)

ReactDom.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
      {/*    <Route path="*" component={NoMatch}/>*/}
    </Route>
  </Router>,
  document.getElementById('root')
);
