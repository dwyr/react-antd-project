import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import * as className from 'classnames';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as reactBootstrap from 'react-bootstrap';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './less/index.less';
import App from './containers/App';
import Bundle from './bundle.js';

import LoginContainer                 from 'bundle-loader?lazy&name=app-[name]!./containers/login/Login' ;

//import NoMatchContainer                 from 'bundle-loader?lazy&name=app-[name]!./components/NoMatch' ;

const Login     = (props) => (<Bundle load={LoginContainer}    {...props}>{ (Page) => <Page {...props} />}</Bundle>)
//const NoMatch             = (props) => (<Bundle load={NoMatchContainer}           {...props}>{ (Page) => <Page {...props} />}</Bundle>)



ReactDom.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      {/*<Route path="*" component={Login}/>*/}
    </Route>
  </Router>,
  document.getElementById('root')
);
