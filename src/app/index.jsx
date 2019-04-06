import history from 'app/browser-history.js';
import AmbientLight from 'modules/ambient-light/components/AmbientLight.jsx';
import Base from 'modules/common/components/Base.jsx';
import Vibration from 'modules/vibration/components/Vibration.jsx';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {Link, Router} from 'react-router-dom';
import './style.css';

const routeData = {
  'ambient-light': {
    component: AmbientLight,
    name: 'AmbientLight',
    path: '/ambient-light',
  },
  'base': {
    component: Base,
    name: 'Base',
    path: '/base',
  },
  'vibration': {
    component: Vibration,
    name: 'Vibration',
    path: '/vibration',
  },
};

const routeList = Object.keys(routeData);

class App extends React.Component {
  renderLink = (routeId) => <Link className="app__nav-link" key={routeId} to={routeData[routeId].path}>{routeData[routeId].name}</Link>;

  renderRoute = (routeId) => <Route component={routeData[routeId].component} key={routeId} path={routeData[routeId].path}/>;

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <div className="app__nav">
            {routeList.map(this.renderLink)}
          </div>
          <div className="app__content">
            <Switch>
              {routeList.map(this.renderRoute)}
              <Redirect to={routeData[routeList[0]].path}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
