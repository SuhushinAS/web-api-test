import history from 'app/browser-history.js';
import AmbientLight from 'modules/ambient-light/components/AmbientLight.jsx';
import BackgroundTasks from 'modules/background-tasks/components/BackgroundTasks.jsx';
import Example from 'modules/example/components/Example.jsx';
import BatteryStatus from 'modules/battery-status/components/BatteryStatus.jsx';
import Vibration from 'modules/vibration/components/Vibration.jsx';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {Link, Router} from 'react-router-dom';
import './style.css';

const routeData = {
  'ambient-light': {
    component: AmbientLight,
    name: 'Ambient Light',
    path: '/ambient-light',
  },
  'background-tasks': {
    component: BackgroundTasks,
    name: 'Background Tasks',
    path: '/background-tasks',
  },
  'battery-status': {
    component: BatteryStatus,
    name: 'Battery Status',
    path: '/battery-status',
  },
  'example': {
    component: Example,
    name: 'Example',
    path: '/example',
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
