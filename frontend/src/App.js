import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'
import Users from './view/components/users'
import UserForm from './view/components/users/form'

const ActiveLink = ({label, to, activeOnlyWhenExact}) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({match}) => (
        <Link className={match ? 'btn btn-default active' : 'btn btn-default'} to={to}>{label}</Link>
    )} />
);

class App extends Component {
  render() {
    return (
      <div className="container">
          <div className="btn-group">
              <ActiveLink to="/users"  activeOnlyWhenExact label="Users" />
              <ActiveLink to="/users/form"  label="Add/Edit user" />
          </div>
          <div className="content">
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/form" component={UserForm} />
            <Route path="/users/form/:id" component={UserForm} />
          </div>
      </div>
    );
  }

}

export default App;
